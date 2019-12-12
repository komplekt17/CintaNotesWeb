import * as React from "react"
import { CONSTANTS } from "../../constants"
import { EditNoteTextEditor } from "../notesEditor"

interface IEditNoteProps {
	sections: [];
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
}
export const EditNotePopup: React.FC<IEditNoteProps> = props => {
	const {
		editNote,
		handlerCurrentValue,
		currentEditedNote,
		namePopup,
    // sections,
		tags,
		lang
	} = props

	const {
    id, 
    header,
    text,
    remarks,
    link, 
    // sectionId, 
		tagId, 
		userId } = currentEditedNote
		
		// получаем SectionId из tags[] по tagId из notes[] 
		const getSectionIdtag = (tagId:string): string =>{
			let noteTagSectionId = "0"
			for(let i=0;i<tags.length;i++){
				if(tags[i].id === tagId ) noteTagSectionId = tags[i].sectionId
			}
			
			return noteTagSectionId
		}

	// let sectionsList: any = ""

	// if (sections && sections.length !== 0) {
	// 	sectionsList = sections.map((item: any, index: number) => {
	// 		return (
	// 			<option key={index} className={item.sectionId} value={item.id}>
	// 				{item.nameSection}
	// 			</option>
	// 		)
	// 	})
	// }

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
								<EditNoteTextEditor
									handlerCurrentValue={handlerCurrentValue}
									textEditedNote={text}
								/>
							</div>
							{/*
							<div className="form-label-group">
								<label htmlFor="editTextNote">Text Note</label>
								<textarea
									id="editTextNote"
									value={text}
									className="form-control"
									aria-describedby="formEditNote"
									onChange={ev => {
										handlerCurrentValue(ev.target.id, ev.target.value)
									}}
								></textarea>
								<div className="invalid-feedback">Some text</div>
							</div>

						 <div className="form-label-group">
								<label htmlFor="editNoteSectionId">Select Section</label>
								<select
									value={sectionId == null ? "" : sectionId}
									onChange={ev => {
										handlerCurrentValue(ev.target.id, ev.target.value)
									}}
									id="editNoteSectionId"
									className="form-control"
									aria-describedby="formEditNote"
								>
									{sectionsList}
									<option value="0">All</option>
								</select>
								<div className="invalid-feedback">
									Please select a tag Note
								</div>
							</div> */}

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
						<div className="modal-footer"> 
							<button
								onClick={() => {
									if (header !== "") {
										const editedNote = {
                      id, 
											header, text, remarks, link, 
											sectionId: getSectionIdtag(tagId), 
											tagId, userId 
										}
										editNote(editedNote)
										// очищаем поля currentDetails.note,
										// action.name === buttonEditNote
										handlerCurrentValue("buttonEditNote", "")
									}
								}}
								type="button"
								className="btn btn-success btn-block mt-3"
							>
								{CONSTANTS[lang].BUTTON_SAVE}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
