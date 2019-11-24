import React from 'react'

export interface EditableImageValue {
	src: string
}

export interface EditableImageREE {
	__ree__: {
		type: string
		value: EditableImageValue
		setValue: (value: EditableImageValue) => void
		handlers: {
			onDrop: (e: any) => void
			onDragOver: (e: any) => void
			onDragEnter: (e: any) => void
			onDragLeave: (e: any) => void
			onMouseEnter: (e: any) => void
		}
	}
}

export interface EditableImageProps
	extends EditableImageREE,
		React.HTMLProps<HTMLImageElement> {}

/*
 *
 */
export const EditableImage = (props: EditableImageProps): JSX.Element => {
	const { __ree__, ...HTMLProps } = props

	return React.createElement(
		'img',
		{
			...HTMLProps,
			...__ree__.handlers,
			src: __ree__.value.src
		},
		null
	)
}
