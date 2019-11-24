import { useState, useContext } from 'react'
import { editorContext } from '../context/editorContext'
import {
	EditableImageValue,
	EditableImageProps
} from '../components/EditableImage'

export const useDroppableImage = (
	defaultValue: EditableImageValue = { src: '' },
	updateCallback: (data: any) => void
): [
	EditableImageProps,
	EditableImageValue,
	(value: EditableImageValue) => void
] => {
	const { editionMode } = useContext(editorContext)
	const [dragOver, setDragOver] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [imageSize, setImageSize] = useState<{
		width: number
		height: number
	} | null>(null)
	const [isOver, setIsOver] = useState(false)
	const [value, setValue] = useState<EditableImageValue>(defaultValue)

	const onDragOver = (event: any) => {
		if (!editionMode) return
		event.preventDefault()
		event.stopPropagation()
	}

	const onDragEnter = () => {
		setDragOver(true)
	}

	const onDragLeave = () => {
		setDragOver(false)

		// TODO remove
		console.log({
			isLoading,
			isOver,
			dragOver,
			imageSize
		})
	}

	const onDrop = (event: any) => {
		if (!editionMode) return
		event.preventDefault()
		event.stopPropagation()

		setImageSize({
			width: event.target.width,
			height: event.target.height
		})

		setDragOver(false)
		setIsLoading(true)

		if (event.dataTransfer.items) {
			updateCallback(event.dataTransfer.items[0])

			const file: File = event.dataTransfer.items[0].getAsFile()
			var reader: FileReader = new FileReader()
			reader.addEventListener('load', () => {
				setValue({
					...value,
					src: `${reader.result}`
				})
				// TODO update
			})
			reader.readAsDataURL(file)
		}
	}

	const onMouseEnter = (event: any) => {
		if (!editionMode) return
		setIsOver(true)
		setImageSize({
			width: event.target.width,
			height: event.target.height
		})
	}

	return [
		{
			__ree__: {
				type: 'droppableImage',
				value,
				setValue,
				handlers: {
					onDrop,
					onDragOver,
					onDragEnter,
					onDragLeave,
					onMouseEnter
				}
			}
		},
		value,
		setValue
	]
}
