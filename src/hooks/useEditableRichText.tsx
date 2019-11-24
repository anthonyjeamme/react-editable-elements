import { useState } from 'react'
import {
	EditableRichTextREE,
	EditableRichTextValueContent
} from '../components/EditableRichText'

const {
	ContentState,
	EditorState,
	convertFromRaw,
	convertToRaw
} = require('draft-js')

export const useEditableRichText = (
	defaultValue: any,
	updateCallback: (data: any) => void
): [
	EditableRichTextREE,
	EditableRichTextValueContent,
	(value: EditableRichTextValueContent) => void
] => {
	const [value, setValue_] = useState<EditableRichTextValueContent>(
		typeof defaultValue === 'string'
			? EditorState.createWithContent(ContentState.createFromText(defaultValue))
			: EditorState.createWithContent(convertFromRaw(defaultValue))
	)

	const setValue = (data: any) => {
		setValue_(data)
		updateCallback(convertToRaw(data.getCurrentContent()))
	}

	return [
		{
			__ree__: {
				type: 'editableRichText',
				value,
				setValue
			}
		},
		value,
		setValue
	]
}
