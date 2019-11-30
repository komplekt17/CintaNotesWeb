import * as React from "react"
import { exporterConfig, importerConfig } from "./ImportExportHTML"
import { convertToRaw, convertFromRaw } from "draft-js"
import { convertFromHTML, convertToHTML } from "draft-convert"
import { DraftailEditor, BLOCK_TYPE, INLINE_STYLE } from "draftail"
import { BR_ICON, UNDO_ICON, REDO_ICON, CustomIcon } from "./CastomIcons"

import "draft-js/dist/Draft.css"
import "draftail/dist/draftail.css"

// const initial = JSON.parse(sessionStorage.getItem("draftail:content"))

interface INoteEditorProps {
	typeEditor: string;
	handlerCurrentValue: (name: string, value: string) => void;
	textEditedNote?: string;
}

// const onSave = (content: any): void => {
// 	console.log("saving", content)
// 	sessionStorage.setItem("draftail:content", JSON.stringify(content))
// }

export const NoteTextEditor: React.FC<INoteEditorProps> = props => {
	const { typeEditor, handlerCurrentValue, textEditedNote } = props

	// for export text note toHTML
	const toHTML = (content: any) =>
		content ? convertToHTML(exporterConfig)(convertFromRaw(content)) : ""

	// for import text note fromHTML
	const fromHTML = (html: any) => {
		convertToRaw(convertFromHTML(importerConfig)(html))
	}

	// const textContent = ""

	// 	let editor = <></>

	// 	if (typeEditor === "addNoteText") {
	// 		console.log(textEditedNote)
	// 		editor = (
	// 			<DraftailEditor
	// 				rawContentState={null}
	// 				onSave={(content: any) => {
	// 					handlerCurrentValue("editTextNote", toHTML(content))
	// 				}}
	// 				blockTypes={[
	// 					{ type: BLOCK_TYPE.UNSTYLED },
	// 					{ type: BLOCK_TYPE.HEADER_ONE },
	// 					{ type: BLOCK_TYPE.HEADER_TWO },
	// 					{ type: BLOCK_TYPE.HEADER_THREE },
	// 					{ type: BLOCK_TYPE.HEADER_FOUR },
	// 					{ type: BLOCK_TYPE.HEADER_FIVE },
	// 					{ type: BLOCK_TYPE.HEADER_SIX },
	// 					{
	// 						type: BLOCK_TYPE.UNORDERED_LIST_ITEM,
	// 						icon: <CustomIcon icon="fa-list-ul" />,
	// 					},
	// 					{
	// 						type: BLOCK_TYPE.ORDERED_LIST_ITEM,
	// 						icon: <CustomIcon icon="fa-list-ol" />,
	// 					},
	// 					{ type: BLOCK_TYPE.CODE },
	// 				]}
	// 				inlineStyles={[
	// 					{ type: INLINE_STYLE.BOLD, icon: <CustomIcon icon="fa-bold" /> },
	// 					{ type: INLINE_STYLE.ITALIC, icon: <CustomIcon icon="fa-italic" /> },
	// 					{
	// 						type: INLINE_STYLE.UNDERLINE,
	// 						icon: <CustomIcon icon="fa-underline" />,
	// 					},
	// 					{
	// 						type: INLINE_STYLE.STRIKETHROUGH,
	// 						icon: <CustomIcon icon="fa-strikethrough" />,
	// 					},
	// 					{ type: INLINE_STYLE.CODE, icon: <CustomIcon icon="fa-code" /> },
	// 					{
	// 						type: INLINE_STYLE.MARK,
	// 						icon: <CustomIcon icon="fa-highlighter" />,
	// 					},
	// 					{
	// 						type: INLINE_STYLE.SMALL,
	// 						icon: <CustomIcon icon="fa-text-height" />,
	// 						description: "Mono Space",
	// 					},
	// 					{ type: INLINE_STYLE.SAMPLE, icon: <CustomIcon icon="fa-font" /> },
	// 					{ type: INLINE_STYLE.KEYBOARD },
	// 					{
	// 						type: INLINE_STYLE.SUPERSCRIPT,
	// 						icon: <CustomIcon icon="fa-superscript" />,
	// 					},
	// 					{
	// 						type: INLINE_STYLE.SUBSCRIPT,
	// 						icon: <CustomIcon icon="fa-subscript" />,
	// 					},
	// 				]}
	// 				enableHorizontalRule={{
	// 					description: "Horizontal rule",
	// 				}}
	// 				enableLineBreak={{
	// 					description: "Soft line break",
	// 					icon: BR_ICON,
	// 				}}
	// 				showUndoControl={{
	// 					description: "Undo last change",
	// 					icon: UNDO_ICON,
	// 				}}
	// 				showRedoControl={{
	// 					description: "Redo last change",
	// 					icon: REDO_ICON,
	// 				}}
	// 			/>
	// 		)
	// 	} else if (typeEditor === "editNoteText") {
	// 		console.log(fromHTML(textEditedNote))
	// 		const textNote = `
	// <p>This editor demonstrates <strong>HTML import and export</strong>.</p>
	// <hr />
	// <blockquote>Built with </blockquote>
	//     <p>image2.jpg</p>
	// `
	// 		editor = (
	// 			<DraftailEditor
	// 				rawContentState={null || fromHTML(textNote)}
	// 				onSave={(content: any) => {
	// 					handlerCurrentValue("editTextNote", toHTML(content))
	// 				}}
	// 				blockTypes={[
	// 					{ type: BLOCK_TYPE.UNSTYLED },
	// 					{ type: BLOCK_TYPE.HEADER_ONE },
	// 					{ type: BLOCK_TYPE.HEADER_TWO },
	// 					{ type: BLOCK_TYPE.HEADER_THREE },
	// 					{ type: BLOCK_TYPE.HEADER_FOUR },
	// 					{ type: BLOCK_TYPE.HEADER_FIVE },
	// 					{ type: BLOCK_TYPE.HEADER_SIX },
	// 					{
	// 						type: BLOCK_TYPE.UNORDERED_LIST_ITEM,
	// 						icon: <CustomIcon icon="fa-list-ul" />,
	// 					},
	// 					{
	// 						type: BLOCK_TYPE.ORDERED_LIST_ITEM,
	// 						icon: <CustomIcon icon="fa-list-ol" />,
	// 					},
	// 					{ type: BLOCK_TYPE.CODE },
	// 				]}
	// 				inlineStyles={[
	// 					{ type: INLINE_STYLE.BOLD, icon: <CustomIcon icon="fa-bold" /> },
	// 					{ type: INLINE_STYLE.ITALIC, icon: <CustomIcon icon="fa-italic" /> },
	// 					{
	// 						type: INLINE_STYLE.UNDERLINE,
	// 						icon: <CustomIcon icon="fa-underline" />,
	// 					},
	// 					{
	// 						type: INLINE_STYLE.STRIKETHROUGH,
	// 						icon: <CustomIcon icon="fa-strikethrough" />,
	// 					},
	// 					{ type: INLINE_STYLE.CODE, icon: <CustomIcon icon="fa-code" /> },
	// 					{
	// 						type: INLINE_STYLE.MARK,
	// 						icon: <CustomIcon icon="fa-highlighter" />,
	// 					},
	// 					{
	// 						type: INLINE_STYLE.SMALL,
	// 						icon: <CustomIcon icon="fa-text-height" />,
	// 						description: "Mono Space",
	// 					},
	// 					{ type: INLINE_STYLE.SAMPLE, icon: <CustomIcon icon="fa-font" /> },
	// 					{ type: INLINE_STYLE.KEYBOARD },
	// 					{
	// 						type: INLINE_STYLE.SUPERSCRIPT,
	// 						icon: <CustomIcon icon="fa-superscript" />,
	// 					},
	// 					{
	// 						type: INLINE_STYLE.SUBSCRIPT,
	// 						icon: <CustomIcon icon="fa-subscript" />,
	// 					},
	// 				]}
	// 				enableHorizontalRule={{
	// 					description: "Horizontal rule",
	// 				}}
	// 				enableLineBreak={{
	// 					description: "Soft line break",
	// 					icon: BR_ICON,
	// 				}}
	// 				showUndoControl={{
	// 					description: "Undo last change",
	// 					icon: UNDO_ICON,
	// 				}}
	// 				showRedoControl={{
	// 					description: "Redo last change",
	// 					icon: REDO_ICON,
	// 				}}
	// 			/>
	// 		)
	// 	}
	const textNote = `
<p>This editor demonstrates <strong>HTML import and export</strong>.</p>
<hr />
<blockquote>Built with </blockquote>
    <p>image2.jpg</p>
`

	return (
		<DraftailEditor
			rawContentState={null || fromHTML(textNote)}
			onSave={(content: any) => {
				handlerCurrentValue("editTextNote", toHTML(content))
				console.log(toHTML(content))
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
