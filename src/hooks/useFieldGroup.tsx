import { useState } from 'react'

export const useFieldGroup = () => {
	const [data, setData] = useState()

	return {
		data,
		setData
	}
}
