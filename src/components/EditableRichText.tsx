import React, { useContext } from 'react'
import { editorContext } from '../context/editorContext'

// const redraft = require('redraft')

const { Editor } = require('draft-js')

export interface EditableRichTextValue {
	content: Draft.RawDraftContentState
}

export interface EditableRichTextValueContent extends Draft.EditorState {}

export interface EditableRichTextREE {
	__ree__: {
		type: string
		value: any
		setValue: (value: any) => void
	}
}

export interface EditableRichTextProps
	extends EditableRichTextREE,
		React.HTMLProps<HTMLDivElement | HTMLDetailsElement> {}

/*
 *
 */
export const EditableRichText = (tag: string) => (
	props: EditableRichTextProps
): any => {
	const { __ree__: { value, setValue }, children, ...HTMLProps } = props

	const { editionMode } = useContext(editorContext)

	return React.createElement(
		tag,
		{
			...HTMLProps
		},
		editionMode
			? <Editor editorState={value} onChange={setValue} />
			: <Editor editorState={value} onChange={setValue} readOnly={true} /> // TODO replace with redraft
	)
}
