import { useState } from 'react'

export const useDroppableBackground = (defaultValue: string) => {
	const [backgroundSrc, setBackgroundSrc] = useState<string>(defaultValue)

	const onDrop = () => {}
	const onDragOver = () => {}
	const onDragEnter = () => {}
	const onDragLeave = () => {}
	const onMouseEnter = () => {}

	return {
		style: {
			src: backgroundSrc
		},
		handlers: {
			onDrop,
			onDragOver,
			onDragEnter,
			onDragLeave,
			onMouseEnter
		},
		setBackgroundSrc
	}
}
