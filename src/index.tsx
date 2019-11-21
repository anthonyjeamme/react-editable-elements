import { ImageComponent, ImageProps } from './components/ImageComponent'
import { BlockComponent, BlockType } from './components/BlockComponent'
import {
	getHeadingComponents,
	HeadingProps
} from './components/HeadingComponent'

interface FieldTypes {
	h1: (props: HeadingProps) => React.DOMElement<{}, Element>
	h2: (props: HeadingProps) => React.DOMElement<{}, Element>
	h3: (props: HeadingProps) => React.DOMElement<{}, Element>
	h4: (props: HeadingProps) => React.DOMElement<{}, Element>
	h5: (props: HeadingProps) => React.DOMElement<{}, Element>
	h6: (props: HeadingProps) => React.DOMElement<{}, Element>
	p: (props: BlockType) => React.DOMElement<{}, Element>
	img: (props: ImageProps) => React.DOMElement<{}, Element>
}

// Préconfigured tags
export const field: FieldTypes = {
	p: BlockComponent('p'),
	h1: getHeadingComponents(1),
	h2: getHeadingComponents(2),
	h3: getHeadingComponents(3),
	h4: getHeadingComponents(4),
	h5: getHeadingComponents(5),
	h6: getHeadingComponents(6),
	img: ImageComponent
}

// Components export
export * from './components/ImageComponent'
export * from './components/BlockComponent'
export * from './components/HeadingComponent'

// Hooks export
export * from './hooks/useInlineText'
export * from './hooks/useEditableText'
export * from './hooks/useDroppableImage'
export * from './hooks/useDroppableBackground'

// Context helper
export * from './context/editorContext'
