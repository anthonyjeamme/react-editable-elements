import React from 'react'

export interface ImageValue {
	src: string
}

export interface ImageProps extends React.HTMLProps<HTMLImageElement> {
	__field__: {
		value: ImageValue
		setValue: (value: ImageValue) => undefined
	}
	misc: any
	editionMode: boolean
	HTMLProps: React.HTMLProps<HTMLImageElement>
}

/*
 *
 */
export const ImageComponent = (props: ImageProps) => {
	const { editionMode, misc, HTMLProps, ...inheritHTMLProps } = props

	return React.createElement(
		'img',
		{
			...HTMLProps,
			...inheritHTMLProps
		},
		null
	)
}
