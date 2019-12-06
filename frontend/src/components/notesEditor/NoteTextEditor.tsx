import React, { useState } from "react"
// import { createEditorStateFromRaw, serialiseEditorStateToRaw } from 'draftjs-conductor'
import { EditorState } from "draft-js"
import { exporterConfig, importerConfig } from "./ImportExportHTML"
import { convertToRaw, convertFromRaw } from "draft-js"
import { convertFromHTML, convertToHTML } from "draft-convert"
import { DraftailEditor, BLOCK_TYPE, INLINE_STYLE } from "draftail"
import { BR_ICON, UNDO_ICON, REDO_ICON, CustomIcon } from "./CastomIcons"

import "draft-js/dist/Draft.css"
import "draftail/dist/draftail.css"

// const initial = JSON.parse(sessionStorage.getItem("draftail:content"))

interface INoteEditorProps {
	handlerCurrentValue: (name: string, value: string) => void;
	textEditedNote?: string;
}

const onSave = (content: any): void => {
	console.log("saving", content)
	sessionStorage.setItem("draftail:content", JSON.stringify(content))
}

// for export text note toHTML
const toHTML = (raw: any): any =>
	raw ? convertToHTML(exporterConfig)(convertFromRaw(raw)) : ""

const AddNoteTextEditor: React.FC<INoteEditorProps> = props => {
	const { handlerCurrentValue } = props

	return (
		<DraftailEditor
			rawContentState={null}
			onSave={(raw: any) => {
				handlerCurrentValue("editTextNote", toHTML(raw))
				// console.log(toHTML(raw))
			}}
			blockTypes={[
				{ type: BLOCK_TYPE.UNSTYLED },
				{ type: BLOCK_TYPE.HEADER_ONE },
				{ type: BLOCK_TYPE.HEADER_TWO },
				{ type: BLOCK_TYPE.HEADER_THREE },
				{ type: BLOCK_TYPE.HEADER_FOUR },
				{ type: BLOCK_TYPE.HEADER_FIVE },
				{ type: BLOCK_TYPE.HEADER_SIX },
				{
					type: BLOCK_TYPE.UNORDERED_LIST_ITEM,
					icon: <CustomIcon icon="fa-list-ul" />,
				},
				{
					type: BLOCK_TYPE.ORDERED_LIST_ITEM,
					icon: <CustomIcon icon="fa-list-ol" />,
				},
				{ type: BLOCK_TYPE.CODE },
			]}
			inlineStyles={[
				{ type: INLINE_STYLE.BOLD, icon: <CustomIcon icon="fa-bold" /> },
				{ type: INLINE_STYLE.ITALIC, icon: <CustomIcon icon="fa-italic" /> },
				{
					type: INLINE_STYLE.UNDERLINE,
					icon: <CustomIcon icon="fa-underline" />,
				},
				{
					type: INLINE_STYLE.STRIKETHROUGH,
					icon: <CustomIcon icon="fa-strikethrough" />,
				},
				{ type: INLINE_STYLE.CODE, icon: <CustomIcon icon="fa-code" /> },
				{
					type: INLINE_STYLE.MARK,
					icon: <CustomIcon icon="fa-highlighter" />,
				},
				{
					type: INLINE_STYLE.SMALL,
					icon: <CustomIcon icon="fa-text-height" />,
					description: "Mono Space",
				},
				{ type: INLINE_STYLE.SAMPLE, icon: <CustomIcon icon="fa-font" /> },
				{ type: INLINE_STYLE.KEYBOARD },
				{
					type: INLINE_STYLE.SUPERSCRIPT,
					icon: <CustomIcon icon="fa-superscript" />,
				},
				{
					type: INLINE_STYLE.SUBSCRIPT,
					icon: <CustomIcon icon="fa-subscript" />,
				},
			]}
			enableHorizontalRule={{
				description: "Horizontal rule",
			}}
			enableLineBreak={{
				description: "Soft line break",
				icon: BR_ICON,
			}}
			showUndoControl={{
				description: "Undo last change",
				icon: UNDO_ICON,
			}}
			showRedoControl={{
				description: "Redo last change",
				icon: REDO_ICON,
			}}
		/>
	)
}
// for import text note fromHTML
const fromHTML = (html: any): any => {
	return convertToRaw(convertFromHTML(importerConfig)(html))
}

const EditNoteTextEditor: React.FC<INoteEditorProps> = props => {
	const { handlerCurrentValue, textEditedNote } = props
	// console.log(textEditedNote)
	
	const [editorState, setEditorState] = useState(EditorState.createEmpty())
	const contentState = editorState.getCurrentContent()

	// console.log(editorState, setEditorState)
	return (
		<DraftailEditor
			editorState={editorState}
			onChange={setEditorState}
			onBlur={() => console.log(contentState)}
			blockTypes={[
				{ type: BLOCK_TYPE.UNSTYLED },
				{ type: BLOCK_TYPE.HEADER_ONE },
				{ type: BLOCK_TYPE.HEADER_TWO },
				{ type: BLOCK_TYPE.HEADER_THREE },
				{ type: BLOCK_TYPE.HEADER_FOUR },
				{ type: BLOCK_TYPE.HEADER_FIVE },
				{ type: BLOCK_TYPE.HEADER_SIX },
				{
					type: BLOCK_TYPE.UNORDERED_LIST_ITEM,
					icon: <CustomIcon icon="fa-list-ul" />,
				},
				{
					type: BLOCK_TYPE.ORDERED_LIST_ITEM,
					icon: <CustomIcon icon="fa-list-ol" />,
				},
				{ type: BLOCK_TYPE.CODE },
			]}
			inlineStyles={[
				{ type: INLINE_STYLE.BOLD, icon: <CustomIcon icon="fa-bold" /> },
				{ type: INLINE_STYLE.ITALIC, icon: <CustomIcon icon="fa-italic" /> },
				{
					type: INLINE_STYLE.UNDERLINE,
					icon: <CustomIcon icon="fa-underline" />,
				},
				{
					type: INLINE_STYLE.STRIKETHROUGH,
					icon: <CustomIcon icon="fa-strikethrough" />,
				},
				{ type: INLINE_STYLE.CODE, icon: <CustomIcon icon="fa-code" /> },
				{
					type: INLINE_STYLE.MARK,
					icon: <CustomIcon icon="fa-highlighter" />,
				},
				{
					type: INLINE_STYLE.SMALL,
					icon: <CustomIcon icon="fa-text-height" />,
					description: "Mono Space",
				},
				{ type: INLINE_STYLE.SAMPLE, icon: <CustomIcon icon="fa-font" /> },
				{ type: INLINE_STYLE.KEYBOARD },
				{
					type: INLINE_STYLE.SUPERSCRIPT,
					icon: <CustomIcon icon="fa-superscript" />,
				},
				{
					type: INLINE_STYLE.SUBSCRIPT,
					icon: <CustomIcon icon="fa-subscript" />,
				},
			]}
			enableHorizontalRule={{
				description: "Horizontal rule",
			}}
			enableLineBreak={{
				description: "Soft line break",
				icon: BR_ICON,
			}}
			showUndoControl={{
				description: "Undo last change",
				icon: UNDO_ICON,
			}}
			showRedoControl={{
				description: "Redo last change",
				icon: REDO_ICON,
			}}
		/>
	)
}

export { AddNoteTextEditor, EditNoteTextEditor }
