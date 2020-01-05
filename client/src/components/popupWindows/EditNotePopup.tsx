import * as React from "react"
import { AuthFalseButton } from "../popupWindows"
import $ from "jquery"
import { EditorState, ContentState, convertToRaw, convertFromHTML, } from "draft-js"
import { CONSTANTS } from "../../constants"
import { DraftailEditor, BLOCK_TYPE, INLINE_STYLE } from "draftail"
import {
	BR_ICON,
	UNDO_ICON,
	REDO_ICON,
	CustomIcon,
	toHTML,
} from "../notesEditor"

interface IEditNoteProps {
	tags: Array<{
		id: string,
		nameTag: string,
		sectionId: string,
		userId: string
	}>;
	editNote: (editedNote: {
    id: string,
    header: string,
    text: string,
    remarks: string,
    link: string,
    sectionId: string,
    tagId: string,
		userId: string,
	}) => void;
	handlerCurrentValue: (name: string, value: string) => void;
	currentEditedNote:	{
		id: string;
    header: string;
    text: string;
    remarks: string;
    link: string;
		sectionId: string;
    tagId: string;
		userId: string,
	}
	namePopup: string;
	lang: string;
	auth: boolean;
}

export const EditNotePopup: React.FC<IEditNoteProps> = props => {
	const {
		editNote,
		handlerCurrentValue,
		currentEditedNote,
		namePopup,
		tags,
		lang,
		auth,
	} = props

	const {
    id, 
    header,
    text,
    remarks,
    link,
		tagId, 
		userId } = currentEditedNote;

	const [editorState, setEditorState] = 
  React.useState(EditorState.createEmpty())

  const getContentFromHTML = (stringHTML:string): any => {
    const blocksFromHTML = convertFromHTML(stringHTML);
    const content = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks
    );
    return content
  }

 React.useEffect (() => {
  	if(text !==""){
			setEditorState(
      	EditorState.createWithContent(
      		getContentFromHTML(text)
    		)
      );
	  }
	}, [text]);

		// получаем SectionId из tags[] по tagId из notes[] 
		const getSectionIdtag = (tagId:string): string =>{
			let noteTagSectionId = "0"
			for(let i=0;i<tags.length;i++){
				if(tags[i].id === tagId ) noteTagSectionId = tags[i].sectionId
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
			id="modal-editNote"
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
						id="formEditNote"
						onSubmit={ev => ev.preventDefault()}
						className="needs-validation"
						noValidate
					>
						<div className="modal-body">

							<div className="form-label-group">
								<label htmlFor="editHeaderNote">Header Note</label>
								<input
									id="editHeaderNote"
									type="text"
									value={header}
									className="form-control"
									placeholder="enter Name Note"
									aria-describedby="formEditNote"
									onChange={ev => {
										handlerCurrentValue(ev.target.id, ev.target.value)
									}}
								/>
								<div className="invalid-feedback">Some text</div>
							</div>

							<div className="form-label-group">
								<label htmlFor="editTextNote">Text Note</label>
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
										{ type: BLOCK_TYPE.CODE },
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
								<label htmlFor="editNoteTagId">Select Tag</label>
								<select
									value={tagId == null ? "" : tagId}
									onChange={ev => {
										handlerCurrentValue(ev.target.id, ev.target.value)
									}}
									id="editNoteTagId"
									className="form-control"
									aria-describedby="formEditNote"
								>
									{tagsList}
									<option value="0">Untagged</option>
								</select>
								<div className="invalid-feedback">
									Please select a tag Note
								</div>
							</div>

						<div className="form-label-group">
							<label htmlFor="editRemarksNote">Remarks Note</label>
							<input
								id="editRemarksNote"
								type="text"
								value={remarks}
								className="form-control"
								placeholder="enter Name Note"
								aria-describedby="formEditNote"
								onChange={ev => {
									handlerCurrentValue(ev.target.id, ev.target.value)
								}}
							/>
							<div className="invalid-feedback">Some text</div>
						</div>

						<div className="form-label-group">
							<label htmlFor="editLinkNote">Link Note</label>
							<input
								id="editLinkNote"
								type="text"
								value={link}
								className="form-control"
								placeholder="enter Name Note"
								aria-describedby="formEditNote"
								onChange={ev => {
									handlerCurrentValue(ev.target.id, ev.target.value)
								}}
							/>
							<div className="invalid-feedback">Some text</div>
						</div>

						</div>
					{auth ? (
						<div className="modal-footer"> 
							<button
								onClick={() => {
									if (header !== "" && text !== "<p></p>") {
										$("#modal-editNote").modal("hide")
										const editedNote = {
                      id, 
											header, 
											text: toHTML(convertToRaw(editorState.getCurrentContent())), 
											remarks, 
											link, 
											sectionId: getSectionIdtag(tagId), 
											tagId, userId 
										}
                    // отправляем editedNote в store
										editNote(editedNote)
										// очищаем поля currentDetails.note,
										// action.name === buttonEditNote
										handlerCurrentValue("buttonEditNote", "")
                    // очищаем поле редактора
                    setEditorState(EditorState.createEmpty());
									}
								}}
								type="button"
								className="btn btn-success btn-block mt-3"
							>
								{CONSTANTS[lang].BUTTON_SAVE}
							</button>
						</div>
					) : (
						<AuthFalseButton
							colorButton="success"
							nameButton={CONSTANTS[lang].BUTTON_SAVE}
							lang={lang}
						/>
					)}
					</form>
				</div>
			</div>
		</div>
	)
}
