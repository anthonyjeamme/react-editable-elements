// @ts-check
import React, { useState, useContext } from 'react'

import {
	field,
	useInlineText,
	useEditableText,
	useDroppableImage,
	editorContext,
	withEditorContext,
	useDroppableBackground
} from 'react-dynamic-field'

import './index.css'

const App = () => {
	const { editionMode, toggleEditionMode } = useContext(editorContext)

	const background = useDroppableBackground(
		'https://media.giphy.com/media/l2SpPvzFidEyGwq2Y/giphy.gif',
		data => {
			console.log('update background', data)
		}
	)

	const title = useInlineText('Mon titre', data => {
		console.log(data)
	})

	const text = useEditableText('Mon titre', data => {
		console.log(`text changed :`, data)
	})

	const img = useDroppableImage(
		'https://media.giphy.com/media/yoJC2MVaIq8dhbsKqc/giphy.gif',
		data => {
			console.log(`updated image`, data)
		}
	)

	return (
		<div
			style={{
				padding: 30,
				...background.style,
				backgroundSize: 'cover'
			}}
			{...background.handlers}
		>
			<button onClick={toggleEditionMode}>
				{editionMode ? 'edit mode' : 'pas edit mode'}
			</button>
			<hr />

			<field.h1 {...title} />
			<field.p {...text} />
			<field.img {...img} />
		</div>
	)
}
export default withEditorContext(App)
