import React, { useRef, useContext, useState, useEffect } from 'react'
import { editorContext } from '../context/editorContext'
import { TextareaEditor } from './TextareaEditor'

export interface EditableInlineTextREE {
	__ree__: {
		type: 'editableInlineText'
		value: string
		setValue: (value: string) => void
		HTMLProps: any
		params: any
	}
}

export interface EditableInlineTextValue {}

export interface EditableInlineTextProps
	extends React.HTMLProps<HTMLHeadingElement> {
	__ree__: any
}

/**
 * The value can only be simple string, without HTML.
 * Then we use a textarea as editor, that fit
 */
export const EditableInlineText = (tag: string) => (
	props: EditableInlineTextProps
) => {
	const { editionMode } = useContext(editorContext)
	const [staticHeight, setStaticHeight] = useState(1)

	const rootRef = useRef<HTMLElement>(null)
	const { __ree__, ...inheritHTMLProps } = props

	// TODO it is the good place to check it ?
	if (__ree__.type !== 'editableInlineText') {
		throw `'${__ree__.type}' type not allowed in EditableInlineText`
	}

	// Helps to handle textarea height correctly.
	useEffect(
		() => {
			/*
			 * In static mode, we save the element height.
			 * Then when the user turn the edition mode on,
			 * the textarea is correctly sized (without tricks
			 * like height=1px -> height=scrollHeight, that produces blink)
			 */
			// if (editionMode && textareaRef.current)
			// 	textareaRef.current.style.height = `${staticHeight}px`

			if (!editionMode && rootRef.current)
				setStaticHeight(rootRef.current.clientHeight)
		},
		[editionMode]
	)

	return React.createElement(
		tag,
		{
			...__ree__.HTMLProps,
			...inheritHTMLProps,
			ref: rootRef
		},
		editionMode
			? <TextareaEditor
					__ree__={__ree__}
					params={{
						maxHistoryItems: 100,
						allowLineBreak: false,
						maxLength: 20,
						initHeight: staticHeight
					}}
				/>
			: __ree__.value.replace(/ /g, '').length > 0
				? __ree__.value
				: <span style={{ color: '#999' }}>
						Empty {tag}
					</span>
	)
}
