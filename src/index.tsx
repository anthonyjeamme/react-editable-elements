import { EditableImage, EditableImageProps } from './components/EditableImage'
import {
	EditableRichText,
	EditableRichTextProps
} from './components/EditableRichText'
import {
	EditableInlineText,
	EditableInlineTextProps
} from './components/EditableInlineText'
import { EditableTable, EditableTableProps } from './components/EditableTable'

interface FieldTypes {
	h1: (props: EditableInlineTextProps) => JSX.Element
	h2: (props: EditableInlineTextProps) => JSX.Element
	h3: (props: EditableInlineTextProps) => JSX.Element
	h4: (props: EditableInlineTextProps) => JSX.Element
	h5: (props: EditableInlineTextProps) => JSX.Element
	h6: (props: EditableInlineTextProps) => JSX.Element
	p: (props: EditableRichTextProps) => JSX.Element
	img: (props: EditableImageProps) => JSX.Element
	table: (props: EditableTableProps) => JSX.Element
}

// Preconfigured tags
export const field: FieldTypes = {
	p: EditableRichText('p'),
	h1: EditableInlineText('h1'),
	h2: EditableInlineText('h2'),
	h3: EditableInlineText('h3'),
	h4: EditableInlineText('h4'),
	h5: EditableInlineText('h5'),
	h6: EditableInlineText('h6'),
	img: EditableImage,
	table: EditableTable
}

// Components export
export * from './components/EditableImage'
export * from './components/EditableRichText'
export * from './components/EditableInlineText'

// Hooks export
export * from './hooks/useEditableRichText'
export * from './hooks/useEditableInlineText'
export * from './hooks/useEditableTable'
export * from './hooks/useDroppableImage'
export * from './hooks/useDroppableBackground'
export * from './hooks/useFieldGroup'

// Context helper
export * from './context/editorContext'
