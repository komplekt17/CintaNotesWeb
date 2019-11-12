import * as React from "react"
import { ERROR_TEXT } from "../../constants"
import $ from "jquery"

interface IAddNewTagPopup {
	sections: [];
	tags: Array<{
		_id: string,
		nameTag: string,
		sectionID: string,
		userID: string,
	}>;
	addNewNote: (newNote: {
		header: any,
		text: any,
		remarks: any,
		link: any,
		sectionID: any,
		tagID: any,
	}) => void;
	namePopup: string;
}

export const AddNewNotePopup: React.FC<IAddNewTagPopup> = props => {
	const { sections, tags, addNewNote, namePopup } = props

	let sectionsList: any = <h3>{ERROR_TEXT}</h3>

	if (sections && sections.length !== 0) {
		sectionsList = sections.map((item: any, index: number) => {
			return (
				<option key={index} className={item.sectionID} value={item._id}>
					{item.nameSection}
				</option>
			)
		})
	}

	let tagsList: any = <h3>{ERROR_TEXT}</h3>

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
								<label htmlFor="addHeaderNote">Header Note</label>
								<input
									id="addHeaderNote"
									type="text"
									className="form-control"
									placeholder="enter Name Note"
									aria-describedby="formAddNote"
								/>
								<div className="invalid-feedback">Some text</div>
							</div>

							<div className="form-label-group">
								<label htmlFor="addTextNote">Text Note</label>
								<textarea
									id="addTextNote"
									className="form-control"
									aria-describedby="formAddNote"
								/>
								<div className="invalid-feedback">Some text</div>
							</div>

							<div className="form-label-group">
								<label htmlFor="addNoteSectionID">Select Section</label>
								<select
									id="addNoteSectionID"
									className="form-control"
									aria-describedby="formAddNote"
								>
									{sectionsList}
								</select>
								<div className="invalid-feedback">Please select a section</div>
							</div>

							<div className="form-label-group">
								<label htmlFor="addNoteTagID">Select Tag</label>
								<select
									id="addNoteTagID"
									className="form-control"
									aria-describedby="formAddNote"
								>
									{tagsList}
								</select>
								<div className="invalid-feedback">Please select a tag Note</div>
							</div>

							<div className="form-label-group">
								<label htmlFor="addRemarksNote">Remarks Note</label>
								<input
									id="addRemarksNote"
									type="text"
									className="form-control"
									placeholder="enter any remarks"
									aria-describedby="formAddNote"
								/>
								<div className="invalid-feedback">Some text</div>
							</div>

							<div className="form-label-group">
								<label htmlFor="addLinkNote">Link Note</label>
								<input
									id="addLinkNote"
									type="text"
									className="form-control"
									placeholder="enter any link"
									aria-describedby="formaddNote"
								/>
								<div className="invalid-feedback">Some text</div>
							</div>
						</div>
						<div className="modal-footer">
							<button
								onClick={() => {
									const header = $("#addHeaderNote").val()
									const text = $("#addHeaderNote").val()
									const sectionID = $("#addNoteSectionID").val()
									const tagID = $("#addNoteTagID").val()
									const remarks = $("#addRemarksNote").val()
									const link = $("#addLinkNote").val()
									if (header !== "") {
										const newNote = {
											header,
											text,
											tagID,
											sectionID,
											remarks,
											link,
										}
										addNewNote(newNote)
										$("#addNameNote").val("")
										$("#addHeaderNote").val("")
										$("#addRemarksNote").val("")
										$("#addLinkNote").val("")
									}
								}}
								type="button"
								className="btn btn-info"
							>
								Add Tag
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
