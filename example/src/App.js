// @ts-check
import React, { useState, useContext } from 'react'

import {
	field,
	useInlineText,
	useEditableText,
	useDroppableImage,
	editorContext,
	withEditorContext
} from 'react-dynamic-field'

import './index.css'

const App = () => {
	const { editionMode, toggleEditionMode } = useContext(editorContext)

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
				padding: 30
			}}
		>
			<button onClick={toggleEditionMode}>
				{editionMode ? 'edit mode' : 'pas edit mode'}
			</button>
			<hr />

			<field.h1 {...title} />
			<field.p {...text} />
			<field.img {...img} style={{ border: '5px solid red', maxHeight: 200 }} />
		</div>
	)
}
export default withEditorContext(App)
