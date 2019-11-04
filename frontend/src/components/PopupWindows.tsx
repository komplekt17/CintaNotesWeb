import * as React from "react"
import $ from "jquery"
import {
	IAddSectionProps,
	IRemoveSectionProps,
	IEditSectionProps,
} from "../types"

export const AddNewSectionPopup: React.FC<IAddSectionProps> = props => {
	const {
		addNewSection,
		handlerInputsValue,
		inputValueSection,
		namePopup,
	} = props

	return (
		<div
			className="modal fade"
			id="modal-addSection"
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
						id="formAddSection"
						onSubmit={event => event.preventDefault()}
						className="needs-validation"
						noValidate
					>
						<div className="modal-body">
							<div className="form-label-group">
								<label htmlFor="addNameSection">Name Section</label>
								<input
									id="addNameSection"
									type="text"
									className="form-control"
									placeholder="enter Name Section"
									aria-describedby="formAddSection"
									onChange={ev => {
										handlerInputsValue(ev.target.id, ev.target.value)
									}}
								/>
								<div className="invalid-feedback">Some text</div>
							</div>
						</div>
						<div className="modal-footer">
							<button
								onClick={() => {
									if (inputValueSection !== "") {
										addNewSection(inputValueSection)
										// очищаем поле nameSection,
										// action.name === buttonAddSection
										handlerInputsValue("buttonAddSection", "")
										$("#nameSection").val("")
									}
								}}
								type="button"
								className="btn btn-success"
							>
								Add Section
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export const EditSectionPopup: React.FC<IEditSectionProps> = props => {
	const {
		editSection,
		handlerInputsValue,
		idEditedSection,
		inputValueSection,
		namePopup,
	} = props

	return (
		<div
			className="modal fade"
			id="modal-editSection"
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
						id="formEditSection"
						onSubmit={event => event.preventDefault()}
						className="needs-validation"
						noValidate
					>
						<div className="modal-body">
							<div className="form-label-group">
								<label htmlFor="editNameSection">Name Section</label>
								<input
									id="editNameSection"
									type="text"
									value={inputValueSection}
									className="form-control"
									placeholder="enter Name Section"
									aria-describedby="formEditSection"
									onChange={ev => {
										handlerInputsValue(ev.target.id, ev.target.value)
									}}
								/>
								<div className="invalid-feedback">Some text</div>
							</div>
						</div>
						<div className="modal-footer">
							<button
								onClick={ev => {
									console.log(ev.target)
									if (inputValueSection !== "") {
										editSection(idEditedSection, inputValueSection)
										// очищаем поле nameSection,
										// action.name === buttonEditSection
										handlerInputsValue("buttonEditSection", "")
										// очищаем поле _id,
										// action.name === buttonEditIdSection
										handlerInputsValue("buttonEditIdSection", "")
									}
								}}
								type="button"
								className="btn btn-success"
							>
								Save Section
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export const RemoveSectionPopup: React.FC<IRemoveSectionProps> = props => {
	const {
		removeSection,
		namePopup,
		idRemovedSection,
		handlerInputsValue,
	} = props

	return (
		<div
			className="modal fade"
			id="modal-removeSection"
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
					<div className="modal-body">
						<p>Are you sure to delete this section?</p>
					</div>
					<div className="modal-footer">
						<button
							id="buttonRemoveSection"
							onClick={() => {
								removeSection(idRemovedSection)
								// очищаем поле _id,
								// action.name === buttonRemoveSection
								handlerInputsValue("buttonRemoveSection", "")
							}}
							type="button"
							className="btn btn-danger"
						>
							Remove Section
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export const AddNewTagPopup: React.FC = () => {
	return <h2 hidden>This is addNewTag Window</h2>
}

export const AddNewNotePopup: React.FC = () => {
	return <h2 hidden>This is addNewNote Window</h2>
}
