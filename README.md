# field

> 

[![NPM](https://img.shields.io/npm/v/field.svg)](https://www.npmjs.com/package/react-editable-elements)

Components and hooks to build a WYSIWYG editor. In edition mode (through ```editorContext```), each element can be edited.

## Install

```bash
npm install --save react-editable-elements
```

## Usage

```jsx
import * as React from 'react'

import { field, useEditableText, editorContext, withEditorContext } from 'react-editable-elements'

const Example = () => {

	const { toggleEditionMode } = useContext(editorContext)
	const exampleText = useEditableText(initValue, updateExempleText)

	function updateExempleText(data){
		// Here you can update your database (or anything you want)
		console.log(data)
	}

	return (
		<div>
			<field.p {...exampleText}>
		</div>
	)
}

export default withEditorContext(Example)
```

## Docs

Note : react-editable-elements is currently under development

available elements :

	field.h1
	field.h2
	field.h3
	field.h4
	field.h5
	field.h6
	field.p
	field.img

incoming elements :

	field.table

``hX`` have to be used with `useInlineText(defaultValue, updateCallback)`

``p`` has to be used with `useEditableText(defaultValue, updateCallback)`

``img`` have to be used with `useDroppableImage(defaultValue, updateCallback)`

## License

MIT © [anthonyjeamme](https://github.com/anthonyjeamme)
