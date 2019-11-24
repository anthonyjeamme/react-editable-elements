import { useState, useContext } from 'react'
import { editorContext } from '../context/editorContext'

export const useDroppableBackground = (
	defaultValue: string,
	updateCallback: (data: File) => void
) => {
	const { editionMode } = useContext(editorContext)
	const [background, setBackground] = useState<string>(defaultValue)

	const onDrop = (event: any) => {
		if (!editionMode) return
		event.preventDefault()
		event.stopPropagation()

		if (event.dataTransfer.items) {
			updateCallback(event.dataTransfer.items[0])

			const file: File = event.dataTransfer.items[0].getAsFile()
			var reader: FileReader = new FileReader()
			reader.addEventListener('load', () => {
				if (typeof reader.result === 'string') setBackground(reader.result)
				else {
					// TODO handle
				}
			})
			reader.readAsDataURL(file)
			updateCallback(file)
		}
	}
	const onDragOver = (event: any) => {
		if (!editionMode) return
		event.preventDefault()
		event.stopPropagation()
	}

	return {
		style: {
			backgroundImage: `url('${background}')`
		},
		handlers: {
			onDrop,
			onDragOver
		},
		setBackground
	}
}
