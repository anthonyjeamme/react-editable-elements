import React, { useContext } from 'react'
import { RawDraftContentState } from 'draft-js'
import { editorContext } from '../context/editorContext'

const {
	Editor,
	EditorState,
	ContentState,
	convertToRaw,
	convertFromRaw
} = require('draft-js')

export interface BlockValue extends RawDraftContentState {}

export interface BlockType
	extends React.HTMLProps<HTMLDivElement | HTMLDetailsElement> {
	value: any
	setValue: any
	updateCallback: (data: any) => void
}

/*
 *
 */
export const BlockComponent = (tag: string) => (props: BlockType) => {
	const { value, setValue, updateCallback, children, ...HTMLProps } = props
	const [editorState, setEditorState] = React.useState<Draft.EditorState>(
		typeof value === 'string'
			? EditorState.createWithContent(ContentState.createFromText(value))
			: convertFromRaw(value)
	)

	const { editionMode } = useContext(editorContext)

	const handleChange = (state: any) => {
		setValue(convertToRaw(state.getCurrentContent()))
		updateCallback(convertToRaw(state.getCurrentContent()))
		setEditorState(state)
	}

	return React.createElement(
		tag,
		HTMLProps,
		<div
			style={
				editionMode
					? {
							border: '1px dashed #f00',
							margin: -1
						}
					: {}
			}
		>
			<Editor
				editorState={editorState}
				onChange={handleChange}
				readOnly={!editionMode}
			/>
		</div>
	)
}
