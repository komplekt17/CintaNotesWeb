import * as React from "react"
// import { ERROR_TEXT } from "../../constants"

interface IEditNoteProps {
	sections: [];
	tags: Array<{
		_id: string,
		nameTag: string,
		sectionID: string,
		userID: string
	}>;
	editNote: (editedNote: {
    id: string,
    header: string,
    text: string,
    remarks: string,
    link: string,
    sectionID: string,
    tagID: string,
	}) => void;
	handlerCurrentValue: (name: string, value: string) => void;
	currentEditedNote:	{
		_id: string;
    header: string;
    text: string;
    remarks: string;
    link: string;
		sectionID: string;
    tagID: string;
	}
	namePopup: string;
}
export const EditNotePopup: React.FC<IEditNoteProps> = props => {
	const {
		editNote,
		handlerCurrentValue,
		currentEditedNote,
		namePopup,
    sections,
    tags
	} = props

	const {
    _id, 
    header,
    text,
    remarks,
    link, 
    sectionID, 
    tagID } = currentEditedNote

	let sectionsList: any = ""

	if (sections && sections.length !== 0) {
		sectionsList = sections.map((item: any, index: number) => {
			return (
				<option key={index} className={item.sectionID} value={item._id}>
					{item.nameSection}
				</option>
			)
		})
	}

	let tagsList: any = ""

	if (tags && tags.length !== 0) {
		tagsList = tags.map((item: any, index: number) => {
			return (
				<option key={index} className={item.tagID} value={item._id}>
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
								<label htmlFor="editNoteSectionID">Select Section</label>
								<select
									value={sectionID == null ? "" : sectionID}
									onChange={ev => {
										handlerCurrentValue(ev.target.id, ev.target.value)
									}}
									id="editNoteSectionID"
									className="form-control"
									aria-describedby="formEditNote"
								>
									{sectionsList}
									<option value="All">All</option>
								</select>
								<div className="invalid-feedback">
									Please select a tag Note
								</div>
							</div>

							<div className="form-label-group">
								<label htmlFor="editNoteTagID">Select Tag</label>
								<select
									value={tagID == null ? "" : tagID}
									onChange={ev => {
										handlerCurrentValue(ev.target.id, ev.target.value)
									}}
									id="editNoteTagID"
									className="form-control"
									aria-describedby="formEditNote"
								>
									{tagsList}
									<option value="Untagged">Untagged</option>
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
                      id: _id, 
                      header, text, remarks, link, sectionID, tagID }
										editNote(editedNote)
										// очищаем поля currentDetails.note,
										// action.name === buttonEditNote
										handlerCurrentValue("buttonEditNote", "")
									}
								}}
								type="button"
								className="btn btn-success"
							>
								Save Note
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
