import React, { useRef, useEffect, useContext } from 'react'
import { editorContext } from '../context/editorContext'

// import React, { useState } from 'react'

// const { Editor, EditorState, ContentState } = require('draft-js')

// export interface HeadingProps extends React.HTMLProps<HTMLHeadingElement> {
// 	__field__: any
// }

export interface HeadingValue {}

export interface HeadingProps extends React.HTMLProps<HTMLHeadingElement> {
	value: any
	setValue: any
	HTMLProps: any
}

/**
 * 
 */
export const getHeadingComponents = (heading: number) => (
	props: HeadingProps
) => {
	const { value, setValue, HTMLProps, ...inheritHTMLProps } = props
	const { editionMode } = useContext(editorContext)
	const textareaRef = useRef<any>(null)

	useEffect(
		() => {
			if (editionMode) {
				textareaRef.current.style.height = '1px'
				textareaRef.current.style.height = `${textareaRef.current
					.scrollHeight}px`
			}
		},
		[editionMode]
	)

	useEffect(
		() => {
			// Adjust textarea height automatically
			if (textareaRef.current) {
				textareaRef.current.style.height = '1px'
				textareaRef.current.style.height = `${textareaRef.current
					.scrollHeight}px`
			}
		},
		[value]
	)

	return React.createElement(
		`h${heading}`,
		{
			...HTMLProps,
			...inheritHTMLProps
		},
		editionMode
			? <textarea
					ref={textareaRef}
					style={{
						fontSize: 'inherit',
						fontFamily: 'inherit',
						fontWeight: 'inherit',
						padding: 0,
						margin: -1,
						border: '1px dashed red',
						outline: 'none',
						backgroundColor: 'transparent',
						resize: 'none',
						width: '100%',
						overflow: 'hidden',
						verticalAlign: 'top',
						height: 1
					}}
					value={value}
					onKeyDown={e => {
						if (e.keyCode === 13) e.preventDefault()
					}}
					onChange={e => {
						setValue(e.target.value.replace(/\n/g, ''))
					}}
				/>
			: value.replace(/ /g, '').length > 0
				? value
				: <span style={{ color: '#999' }}>
						Empty h{heading}
					</span>
	)
}
