import React, { useState } from "react"
import { EditorState, convertToRaw } from "draft-js"
import { IUserProfile } from "../../types"
import { CONSTANTS } from "../../constants"
import { DraftailEditor, BLOCK_TYPE, INLINE_STYLE } from "draftail"
import {
	BR_ICON,
	UNDO_ICON,
	REDO_ICON,
	CustomIcon,
	toHTML,
} from "../notesEditor"

interface IAddNewTagPopup {
	tags: Array<{
		id: string,
		nameTag: string,
		sectionId: string,
		userId: string,
	}>;
	addNewNote: (newNote: {
		header: any,
		text: any,
		remarks: any,
		link: any,
		sectionId: any,
		tagId: any,
		userId: string,
	}) => void;
	namePopup: string;
	userProfile: IUserProfile;
}

export const AddNewNotePopup: React.FC<IAddNewTagPopup> = props => {
	const { tags, addNewNote, namePopup, userProfile } = props

	const { lang, id } = userProfile
	const initialState = {
		header: "",
		text: "",
		remarks: "",
		link: "",
		sectionId: "",
		tagId: "",
		userId: id,
	}

	const [editorState, setEditorState] = useState(EditorState.createEmpty())
	const [fields, setFields] = useState(initialState)

	// получаем SectionId из tags[] по tagId из notes[]
	const getSectionIdtag = (tagId: any): string => {
		let noteTagSectionId = "0"
		for (let i = 0; i < tags.length; i++) {
			if (tags[i].id === tagId) noteTagSectionId = tags[i].sectionId
		}

		return noteTagSectionId
	}

	let tagsList: any = ""

	if (tags && tags.length !== 0) {
		tagsList = tags.map((item: any, index: number) => {
			return (
				<option key={index} className={item.tagId} value={item.id}>
					{item.nameTag}
				</option>
			)
		})
	}

	// react editors examples
	// https://github.com/thibaudcolas/draftail-playground
	// https://draftjs.org/docs/getting-started
	// https://reactjsexample.com/tag/editor/
	// https://www.draftail.org/docs/importing-and-exporting-html

	return (
		<div
			id="modal-addNote"
			className="modal fade"
			tabIndex={-1}
			role="dialog"
			aria-labelledby="exampleModalCenterTitle"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-dialog-centered" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{namePopup}</h5>
						<button
							type="button"
							className="close"
							data-dismiss="modal"
							aria-label="Close"
						>
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<form
						id="formAddNote"
						onSubmit={event => event.preventDefault()}
						className="needs-validation"
						noValidate
					>
						<div className="modal-body">
							<div className="form-label-group">
								<label htmlFor="addHeaderNote">
									{CONSTANTS[lang].NAME_HEADER_NOTE}
								</label>
								<input
									id="addHeaderNote"
									type="text"
									className="form-control"
									placeholder="enter Name Note"
									aria-describedby="formAddNote"
									value={fields.header}
									onChange={e => setFields({ ...fields, header: e.target.value })}
								/>
								<div className="invalid-feedback">Some text</div>
							</div>

							<div className="form-label-group">
								<label htmlFor="addTextNote">{CONSTANTS[lang].TEXT_NOTE}</label>
								<DraftailEditor
									editorState={editorState}
									onChange={setEditorState}
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
										// { type: BLOCK_TYPE.CODE },
									]}
									inlineStyles={[
										{
											type: INLINE_STYLE.BOLD,
											icon: <CustomIcon icon="fa-bold" />,
										},
										{
											type: INLINE_STYLE.ITALIC,
											icon: <CustomIcon icon="fa-italic" />,
										},
										{
											type: INLINE_STYLE.UNDERLINE,
											icon: <CustomIcon icon="fa-underline" />,
										},
										{
											type: INLINE_STYLE.STRIKETHROUGH,
											icon: <CustomIcon icon="fa-strikethrough" />,
										},
										{
											type: INLINE_STYLE.CODE,
											icon: <CustomIcon icon="fa-code" />,
										},
										{
											type: INLINE_STYLE.MARK,
											icon: <CustomIcon icon="fa-highlighter" />,
										},
										{
											type: INLINE_STYLE.SMALL,
											icon: <CustomIcon icon="fa-text-height" />,
											description: "Mono Space",
										},
										{
											type: INLINE_STYLE.SAMPLE,
											icon: <CustomIcon icon="fa-font" />,
										},
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
									enableHorizontalRule={{ description: "Horizontal rule" }}
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
							</div>

							<div className="form-label-group">
								<label htmlFor="addNoteTagId">{CONSTANTS[lang].SELECT_TAG}</label>
								<select
									id="addNoteTagId"
									className="form-control"
									aria-describedby="formAddNote"
									value={fields.tagId}
									onChange={e => setFields({ ...fields, tagId: e.target.value })}
								>
									{tagsList}
									<option value="0">Untagged</option>
								</select>
								<div className="invalid-feedback">Please select a tag Note</div>
							</div>

							<div className="form-label-group">
								<label htmlFor="addRemarksNote">
									{CONSTANTS[lang].REMARK_NOTE}
								</label>
								<input
									id="addRemarksNote"
									type="text"
									className="form-control"
									placeholder="enter any remarks"
									aria-describedby="formAddNote"
									value={fields.remarks}
									onChange={e => setFields({ ...fields, remarks: e.target.value })}
								/>
								<div className="invalid-feedback">Some text</div>
							</div>

							<div className="form-label-group">
								<label htmlFor="addLinkNote">{CONSTANTS[lang].LINK_NOTE}</label>
								<input
									id="addLinkNote"
									type="text"
									className="form-control"
									placeholder="enter any link"
									aria-describedby="formAddNote"
									value={fields.link}
									onChange={e => setFields({ ...fields, link: e.target.value })}
								/>
								<div className="invalid-feedback">Some text</div>
							</div>
						</div>
						<div className="modal-footer">
							<button
								disabled={fields.header === ""}
								onClick={() => {
									const content = convertToRaw(editorState.getCurrentContent())
									const text = toHTML(content)
									if (text !== "<p></p>") {
										const newNote = {
											header: fields.header,
											text,
											remarks: fields.remarks,
											link: fields.link,
											sectionId: getSectionIdtag(fields.tagId),
											tagId: fields.tagId,
											userId: fields.userId,
										}
										addNewNote(newNote)
										setEditorState(EditorState.createEmpty())
										setFields({ ...fields, header: "", remarks: "", link: "" })
									}
								}}
								type="button"
								className="btn btn-info btn-block mt-3"
							>
								{CONSTANTS[lang].BUTTON_CREATE}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
