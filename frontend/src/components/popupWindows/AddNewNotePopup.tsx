import * as React from "react"
import { CONSTANTS } from "../../constants"
import { AddNoteTextEditor } from "../notesEditor"
import $ from "jquery"

interface IAddNewTagPopup {
	sections: [];
	tags: Array<{
		id: string,
		nameTag: string,
		sectionID: string,
		userID: string,
	}>;
	handlerCurrentValue: (name: string, value: string) => void;
	currentEditedNote: {
		text: string,
	};
	addNewNote: (newNote: {
		header: any,
		text: any,
		remarks: any,
		link: any,
		sectionID: any,
		tagID: any,
	}) => void;
	namePopup: string;
	lang: string;
}

export const AddNewNotePopup: React.FC<IAddNewTagPopup> = props => {
	const {
		tags,
		addNewNote,
		namePopup,
		lang,
		currentEditedNote,
		handlerCurrentValue,
	} = props

	// let sectionsList: any = ""

	// if (sections && sections.length !== 0) {
	// 	sectionsList = sections.map((item: any, index: number) => {
	// 		return (
	// 			<option key={index} className={item.sectionID} value={item.id}>
	// 				{item.nameSection}
	// 			</option>
	// 		)
	// 	})
	// }

	// получаем SectionID из tags[] по tagID из notes[]
	const getSectionIDtag = (tagID: any): string => {
		let noteTagSectionID = "0"
		for (let i = 0; i < tags.length; i++) {
			if (tags[i].id === tagID) noteTagSectionID = tags[i].sectionID
		}

		return noteTagSectionID
	}

	let tagsList: any = ""

	if (tags && tags.length !== 0) {
		tagsList = tags.map((item: any, index: number) => {
			return (
				<option key={index} className={item.tagID} value={item.id}>
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
								<AddNoteTextEditor handlerCurrentValue={handlerCurrentValue} />
							</div>
							{/*
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
									<option value="0">All</option>
								</select>
								<div className="invalid-feedback">Please select a section</div>
							</div> 
							*/}

							<div className="form-label-group">
								<label htmlFor="addNoteTagID">Select Tag</label>
								<select
									id="addNoteTagID"
									className="form-control"
									aria-describedby="formAddNote"
								>
									{tagsList}
									<option value="0">Untagged</option>
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
									// const text = $("#addTextNote").val()
									// const sectionID = $("#addNoteSectionID").val()
									const tagID = $("#addNoteTagID").val()
									const remarks = $("#addRemarksNote").val()
									const link = $("#addLinkNote").val()
									if (header !== "") {
										const newNote = {
											header,
											text: currentEditedNote.text,
											tagID,
											sectionID: getSectionIDtag(tagID),
											remarks,
											link,
										}
										addNewNote(newNote)
										$("#addHeaderNote").val("")
										// $("#addTextNote").val("")
										$("#addRemarksNote").val("")
										$("#addLinkNote").val("")
										handlerCurrentValue("buttonEditNote", "")
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
