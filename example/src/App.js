// @ts-check
import React, { useState, useContext, useEffect } from 'react'

import {
	field,
	useEditableInlineText,
	useEditableRichText,
	useDroppableImage,
	editorContext,
	withEditorContext,
	useDroppableBackground,
	useEditableTable
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

	const [titleField] = useEditableInlineText('Mon titre', data => {
		// console.log(data)
	})

	const [text] = useEditableRichText('hihi', data => {
		// console.log(`text changed :`, data)
	})

	const [testImage] = useDroppableImage(
		{
			src: 'https://media.giphy.com/media/yoJC2MVaIq8dhbsKqc/giphy.gif'
		},
		data => {
			console.log(`updated image`, data)
		}
	)

	const [table, tableModifiers, tableValue] = useEditableTable({
		thead: ['nom', 'prénom', 'age', 'ville', 'sexe', 'ethnie'],
		tbody: [['arthur', 'clampin', '28', 'lyon', 'M', 'fr']]
	})

	useEffect(() => {
		// tableModifiers.addColumns(1, 'title')
		// tableModifiers.addColumns(0, 'XXXXX')
		// tableModifiers.addColumns(99, 'title')
		tableModifiers.addRow(0, ['A', 'B', 'C', 'B', 'X', 'B', 'Y'])
		tableModifiers.addRow(2, ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'])
		tableModifiers.addRow(2, ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'])
		tableModifiers.addRow(2, ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'])
		tableModifiers.addRow(2)
		tableModifiers.addRow(2, ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'])
		tableModifiers.removeRow(1)

		tableModifiers.setTBodyValue(3, 3, 'OHHHH')
		tableModifiers.setTBodyValue(3, 2, 'OHHHH')
		tableModifiers.setTBodyValue(2, 3, 'OHHHH')
	}, [])

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

			<field.h1 {...titleField} />

			<field.img {...testImage} style={{ maxHeight: 200 }} />

			<field.p {...text} />

			<field.table {...table} style={{ width: '100%', textAlign: 'center' }} />

			<div style={{ textAlign: 'center' }}>
				{/* <field.h1 {...title} style={{ fontSize: 74, color: 'red' }} /> */}
			</div>
		</div>
	)
}
export default withEditorContext(App)
