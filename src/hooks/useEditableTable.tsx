import {
	EditableTableValue,
	EditableTableREE
} from '../components/EditableTable'
import { useState } from 'react'

export const useEditableTable = (
	defaultValue: EditableTableValue
): [
	EditableTableREE,
	{
		setTHeadValue: any
		setTBodyValue: any
		addColumns: any
		removeColumn: any
		addRow: any
		removeRow: any
	},
	EditableTableValue,
	(value: EditableTableValue) => void
] => {
	const [value, setValue] = useState<any>(defaultValue)

	const setTHeadValue = (x: number, v: string) => {
		setValue((value: any) => {
			return {
				...value,
				thead: value.thead
					? value.thead.map((col: any, i: number) => (i === x ? v : col))
					: undefined
			}
		})
	}

	const setTBodyValue = (row: number, col: number, cellValue: string) => {
		setValue((value: any) => ({
			...value,
			tbody: value.tbody.map(
				(tr: any, i: number) =>
					i === row
						? tr.map((td: any, j: number) => (j === col ? cellValue : td))
						: tr
			)
		}))
	}

	const addColumns = (index: number, title: string = '') => {
		setValue((value: any) => ({
			thead: [
				...value.thead.slice(0, index),
				title,
				...value.thead.slice(index)
			],
			tbody: value.tbody.map((tr: any) => [
				...tr.slice(0, index),
				'',
				...tr.slice(index)
			])
		}))
	}

	const removeColumn = (index: number) => {
		setValue((value: any) => ({
			thead: [...value.thead.filter((_: any, i: number) => i !== index)],
			tbody: value.tbody.map((tr: any) =>
				tr.filter((_: any, i: number) => i !== index)
			)
		}))
	}

	const generateRow = (length: number) => {
		const t = []
		for (let i = 0; i < length; i++) t.push('')
		return t
	}

	const addRow = (index: number, values: Array<any> | null = null) => {
		setValue((value: any) => {
			const newRow = !values
				? generateRow(value.thead.length)
				: values.length === value.thead.length
					? values
					: values.length > value.thead.length
						? values.slice(0, value.thead.length)
						: [...values, ...generateRow(value.thead.length - values.length)]

			return {
				...value,
				tbody: [
					...value.tbody.slice(0, index),
					newRow,
					...value.tbody.slice(index)
				]
			}
		})
	}

	const removeRow = (index: number) => {
		setValue((value: any) => ({
			...value,
			tbody: value.tbody.filter((_: any, i: number) => i !== index)
		}))
	}

	return [
		{
			__ree__: {
				setValue,
				value
			}
		},
		{
			setTHeadValue,
			setTBodyValue,
			addColumns,
			removeColumn,
			addRow,
			removeRow
		},
		value,
		setValue
	]
}
