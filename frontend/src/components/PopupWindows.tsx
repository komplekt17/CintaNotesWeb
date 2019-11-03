import * as React from "react"
import $ from "jquery"
import { IAddSectionProps, IRemoveSectionProps } from "../types"

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
								<label htmlFor="nameSection">Name Section</label>
								<input
									id="nameSection"
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
								onClick={ev => {
									if (inputValueSection !== "") {
										addNewSection("buttonAddSection")
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

export const RemoveSectionPopup: React.FC<IRemoveSectionProps> = props => {
	const { removeSection, namePopup, idRemovedSection, handlerInputsValue } = props

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
						<p>Are you sure delete this?</p>
					</div>
					<div className="modal-footer">
						<button
							id="buttonRemoveSection"
							onClick={() => {
								removeSection(idRemovedSection)
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
