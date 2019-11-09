import * as React from "react"
import $ from "jquery"

interface IAddSectionProps {
	addNewSection: (value: any) => void;
	handlerCurrentValue: (nameInput: string, value: string) => void;
	namePopup: string;
}
export const AddNewSectionPopup: React.FC<IAddSectionProps> = props => {
	const { addNewSection, handlerCurrentValue, namePopup } = props

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
						onSubmit={ev => ev.preventDefault()}
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
								/>
								<div className="invalid-feedback">Some text</div>
							</div>
						</div>
						<div className="modal-footer">
							<button
								onClick={() => {
									const nameSection = $("#addNameSection").val()
									if (nameSection !== "") {
										addNewSection(nameSection)
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
