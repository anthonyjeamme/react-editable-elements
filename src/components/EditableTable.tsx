import React, { useContext } from 'react'
import { TextareaEditor } from './TextareaEditor'
import { editorContext } from '../context/editorContext'

// TODO Add <T> to custom value
export interface EditableTableValue {
	thead?: Array<string>
	tbody: Array<Array<string>>
}

export interface EditableTableREE {
	__ree__: {
		value: EditableTableValue
		setValue: (value: EditableTableValue) => void
	}
}
export interface EditableTableProps
	extends EditableTableREE,
		React.HTMLProps<HTMLTableElement> {}

export const EditableTable = ({
	__ree__,
	...HTMLProps
}: EditableTableProps): JSX.Element => {
	const { thead, tbody } = __ree__.value

	const { editionMode } = useContext(editorContext)

	const replaceValue = (x: number, y: number, value: string) => {
		const tbody = __ree__.value.tbody.map(
			(tr, i) => (i === x ? tr.map((td, j) => (j === y ? value : td)) : tr)
		)

		return {
			...__ree__.value,
			tbody
		}
	}

	return (
		<table {...HTMLProps}>
			{thead &&
				<thead>
					<tr>
						{thead.map((th: string, i) =>
							<th key={i}>
								{th}
							</th>
						)}
					</tr>
				</thead>}
			<tbody>
				{tbody.map((tr, i) =>
					<tr key={i}>
						{tr.map((td, j) =>
							<td key={j}>
								{editionMode
									? <TextareaEditor
											__ree__={{
												value: td,
												setValue: (value: string) => {
													__ree__.setValue(replaceValue(i, j, value))
												}
											}}
											params={{ allowLineBreak: false }}
										/>
									: td}
							</td>
						)}
					</tr>
				)}
			</tbody>
		</table>
	)
}
