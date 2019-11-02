import * as React from "react"
import $ from "jquery"

interface IAddSectionProps {
	addNewSection: (nameButton: string) => void;
	handlerInputsValue: (nameInput: string, value: string) => void;
	inputValueSection: string;
}

export const AddNewSectionPopup: React.FC<IAddSectionProps> = ({
	addNewSection,
	handlerInputsValue,
	inputValueSection,
}) => {
	return (
		<div
			className="modal fade"
			id="modal-addsection"
			tabIndex={-1}
			role="dialog"
			aria-labelledby="exampleModalCenterTitle"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-dialog-centered" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Add section</h5>
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
						id="addSection"
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
									aria-describedby="addSection"
									onChange={ev => {
										handlerInputsValue(ev.target.id, ev.target.value)
									}}
								/>
								<div className="invalid-feedback">Some text</div>
							</div>
						</div>
						<div className="modal-footer">
							<button
								id="buttonAddSection"
								onClick={() => {
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

export const AddNewTagPopup: React.FC = () => {
	return <h2 hidden>This is addNewTag Window</h2>
}

export const AddNewNotePopup: React.FC = () => {
	return <h2 hidden>This is addNewNote Window</h2>
}
