import { useState, useContext } from 'react'
import { editorContext } from '../context/editorContext'

export const useDroppableImage = (
	defaultValue: string = '',
	updateCallback: (data: any) => void
) => {
	const { editionMode } = useContext(editorContext)
	const [dragOver, setDragOver] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [imageSize, setImageSize] = useState<{
		width: number
		height: number
	} | null>(null)
	const [isOver, setIsOver] = useState(false)
	const [src, setSrc] = useState<string | ArrayBuffer | null>(defaultValue)

	const onDragOver = (e: any) => {
		if (!editionMode) return
		e.preventDefault()
	}

	const onDragEnter = () => {
		setDragOver(true)
	}

	const onDragLeave = () => {
		setDragOver(false)
	}

	const onDrop = (e: any) => {
		if (!editionMode) return

		setImageSize({
			width: e.target.width,
			height: e.target.height
		})

		e.preventDefault()
		setDragOver(false)
		setIsLoading(true)

		if (e.dataTransfer.items) {
			updateCallback(e.dataTransfer.items[0])

			const file: File = e.dataTransfer.items[0].getAsFile()
			var reader: FileReader = new FileReader()
			reader.addEventListener('load', () => {
				setSrc(reader.result)
				// TODO update
			})
			reader.readAsDataURL(file)
		}
	}

	const onMouseEnter = (e: any) => {
		if (!editionMode) return
		setIsOver(true)
		setImageSize({
			width: e.target.width,
			height: e.target.height
		})
	}

	// const onInputChange = (e: any) => {
	// 	if (!editionMode) return
	// 	setImageSize({
	// 		width: e.target.width,
	// 		height: e.target.height
	// 	})

	// 	setIsLoading(true)

	// 	e.preventDefault()

	// 	if (e.target.files) {
	// 		var file = e.target.files[0]
	// 		updateCallback(file)

	// 		// updateImageToStorage(file).then(url => {
	// 		// 	updateFunc(url).then(() => {
	// 		// 		setIsLoading(false)
	// 		// 	})
	// 		// })
	// 	}
	// }

	// const handleMouseLeaveOver = () => {
	// 	setIsOver(false)
	// }

	return {
		// inputHandlers: {
		// 	onChange: onInputChange
		// },
		// mouseOverHandlers: {
		// 	onMouseLeave: handleMouseLeaveOver
		// },
		// isLoading,
		// imageSize,
		// isOver,

		misc: {
			isLoading,
			isOver,
			dragOver,
			imageSize
		},

		editionMode,
		HTMLProps: {
			src,
			onDrop,
			onDragOver,
			onDragEnter,
			onDragLeave,
			onMouseEnter
		}
	}
}
