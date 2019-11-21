import { useState } from 'react'

export const useInlineText = (
	defaultValue: string,
	updateCallback: (data: string) => void
) => {
	const [value, setValue_] = useState<string>(defaultValue)

	const setValue = (data: string) => {
		setValue_(data)
		updateCallback(data)
	}

	return {
		value,
		setValue,
		HTMLProps: {}
	}
}
