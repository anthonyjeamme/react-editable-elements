import React, { useState, useEffect, useRef } from 'react'

interface EditableInlineTextHistoryItem {
	value: string
	selectionStart: number
	selectionEnd: number
}

interface EditableInlineTextHistory
	extends Array<EditableInlineTextHistoryItem> {}

export interface TextareaEditorProps {
	__ree__: any
	params?: {
		maxHistoryItems?: number
		allowLineBreak?: boolean
		maxLength?: number | undefined
		initHeight?: number
	}
}

/*
 * A styleless editor based on textarea.
 * <textarea> has been choosed over <input> because <input> can't whitespace break.
 * This is perfect for heading. We can prohibe \n\r but allow whitespace break.
 */
export const TextareaEditor = ({
	__ree__,
	params: {
		maxHistoryItems = 200,
		allowLineBreak = true,
		maxLength = undefined,
		initHeight = 1
	} = {
		maxHistoryItems: 200,
		allowLineBreak: true,
		maxLength: undefined,
		initHeight: 1
	}
}: TextareaEditorProps) => {
	const [history, setHistory] = useState<EditableInlineTextHistory>([])
	const [cursorPosition, setCursorPosition] = useState<number | null>(0)
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	useEffect(() => {
		// First history element is the current state.
		// So to be able to history back to the first state,
		// we push it at the initialization.
		pushHistory(__ree__.value, 0, 0)

		if (textareaRef.current)
			textareaRef.current.style.height = `${initHeight}px`
	}, [])

	useEffect(
		// Adapts the textarea's height when typing (handle new line/removed line)
		() => {
			if (textareaRef.current) {
				textareaRef.current.style.height = '1px'
				textareaRef.current.style.height = `${textareaRef.current
					.scrollHeight}px`
			}
		},
		[__ree__.value]
	)

	useEffect(
		() => {
			if (cursorPosition && textareaRef.current) {
				textareaRef.current.selectionStart = cursorPosition
				textareaRef.current.selectionEnd = cursorPosition

				// When user edit two times at the same selection location,
				// the [cursorPostion] state is not updated. Thus this useEffect
				// is not called and the cursor position is not correct.
				// Setting cursorPosition at null avoid this bug.
				setCursorPosition(null)
			}
		},
		[cursorPosition]
	)

	const cleanText = (string: string) => {
		return string
			.replace(allowLineBreak ? /[\t]*/g : /[\n\t\r]*/g, '')
			.replace(/ +/g, ' ')
	}

	const pushHistory = (
		value: string,
		selectionStart: number,
		selectionEnd: number
	) => {
		setHistory([
			{
				value,
				selectionStart,
				selectionEnd
			},
			...history.slice(0, maxHistoryItems)
		])
	}

	// History is handled with React because onPaste event break the native handling.
	const historyBack = () => {
		if (history.length <= 1) return

		// The first history value contains the current value
		const { value, selectionStart } = history[1]

		setHistory(history.slice(1))
		__ree__.setValue(value)
		setCursorPosition(selectionStart)
	}

	// Make the textarea 'invisible' to user.
	const textareaStyle: React.CSSProperties = {
		all: 'inherit',
		outline: 'none',
		backgroundColor: 'transparent',
		resize: 'none',
		width: '100%',
		overflow: 'hidden',
		verticalAlign: 'top',
		padding: 0,
		height: initHeight
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (!allowLineBreak && e.keyCode === 13) e.preventDefault()
		if (e.keyCode === 90 && e.ctrlKey) {
			e.preventDefault()
			historyBack()
		}
	}

	const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
		e.preventDefault()
		const pastedText = e.clipboardData.getData('Text')

		if (pastedText) {
			const cleanedPastedText = cleanText(pastedText)
			const { selectionStart, selectionEnd } = e.currentTarget

			const result = (__ree__.value.substr(0, selectionStart) +
				cleanedPastedText +
				__ree__.value.substr(selectionEnd)).substr(0, maxLength)

			pushHistory(
				result,
				selectionStart + cleanedPastedText.length,
				selectionStart + cleanedPastedText.length
			)
			__ree__.setValue(result)
			setCursorPosition(selectionStart + cleanedPastedText.length)
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { selectionStart, selectionEnd } = e.target

		if (maxLength && e.target.value.length > maxLength) return

		if (e.target.value.includes('  ')) {
			pushHistory(e.target.value, selectionStart, selectionEnd)
			__ree__.setValue(e.target.value.replace(/ +/g, ' '))
			setCursorPosition(selectionStart - 1)
		} else {
			pushHistory(e.target.value, selectionStart, selectionEnd)
			__ree__.setValue(e.target.value)
		}
	}

	return (
		<textarea
			ref={textareaRef}
			style={textareaStyle}
			value={__ree__.value}
			onKeyDown={handleKeyDown}
			onPaste={handlePaste}
			onChange={handleChange}
		/>
	)
}
