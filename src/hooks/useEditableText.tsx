import { useState } from 'react'

export const useEditableText = (
	defaultValue: string,
	updateCallback: (data: any) => void
) => {
	const [value, setValue] = useState(defaultValue)

	return {
		value,
		setValue,
		updateCallback
	}
}
