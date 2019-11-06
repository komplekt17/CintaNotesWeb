import * as React from "react"
import $ from "jquery"

interface IAddSectionProps {
	addNewSection: (value: string) => void;
	handlerCurrentValue: (nameInput: string, value: string) => void;
	inputValueSection: string;
	namePopup: string;
}
export const AddNewSectionPopup: React.FC<IAddSectionProps> = props => {
	const {
		addNewSection,
		handlerCurrentValue,
		inputValueSection,
		namePopup,
	} = props

	return (
		<div
			id="modal-addSection"
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
										handlerCurrentValue(ev.target.id, ev.target.value)
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
										// очищаем поле addNameSection,
										// action.name === buttonAddSection
										handlerCurrentValue("buttonAddSection", "")
										$("#addNameSection").val("")
									}
								}}
								type="button"
								className="btn btn-info"
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
