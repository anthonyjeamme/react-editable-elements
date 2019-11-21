import React, { createContext, useState, useEffect } from 'react'

export interface EditorContextConsumer {
	toggleEditionMode: () => void
	editionMode: boolean
}

export const editorContext = createContext<EditorContextConsumer>({
	editionMode: false,
	toggleEditionMode: () => {}
})

export const EditorProvider = ({ children }: { children: React.ReactNode }) => {
	const [editionMode, setEditionMode] = useState<boolean>(false)
	const { Provider } = editorContext

	useEffect(() => {
		const handleKeydown = (ev: KeyboardEvent) => {
			if (ev.ctrlKey && ev.keyCode === 32) toggleEditionMode()
		}

		document.addEventListener('keydown', handleKeydown)
		return () => {
			document.removeEventListener('keydown', handleKeydown)
		}
	}, [])

	const toggleEditionMode = () => {
		setEditionMode(editionMode => !editionMode)
	}

	return (
		<Provider
			value={{
				editionMode,
				toggleEditionMode
			}}
		>
			{children}
		</Provider>
	)
}

//
export const withEditorContext = (Component: any) => {
	return () =>
		<EditorProvider>
			<Component />
		</EditorProvider>
	// return () =>
}
