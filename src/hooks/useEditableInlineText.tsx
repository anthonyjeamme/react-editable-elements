import { useState } from 'react'
import { EditableInlineTextREE } from '../components/EditableInlineText'

export const useEditableInlineText = (
	defaultValue: string,
	updateCallback: (data: string) => void
): [EditableInlineTextREE, string, (value: string) => void] => {
	const [value, setValue_] = useState<string>(defaultValue)

	const setValue = (data: string) => {
		setValue_(data)
		updateCallback(data)
	}

	const params = {}

	return [
		{
			__ree__: {
				type: 'editableInlineText',
				value,
				setValue,
				HTMLProps: {},
				params
			}
		},
		value,
		setValue
	]
}
