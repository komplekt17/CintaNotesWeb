import * as React from "react"
import { CONSTANTS } from "../../constants"

interface IEditSectionProps {
	editSection: (editedSection: {
		id: string,
		nameSection: string,
		userId: string,
	}) => void;
	handlerCurrentValue: (nameInput: string, value: string) => void;
	currentEditedSection: {
		id: string,
		nameSection: string,
	};
	namePopup: string;
	lang: string;
	currentUserId: string;
}
export const EditSectionPopup: React.FC<IEditSectionProps> = props => {
	const {
		editSection,
		handlerCurrentValue,
		currentEditedSection,
		namePopup,
		lang,
		currentUserId,
	} = props

	const { id, nameSection } = currentEditedSection
	return (
		<div
			id="modal-editSection"
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
									value={nameSection}
									className="form-control"
									placeholder="enter Name Section"
									aria-describedby="formEditSection"
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
									if (nameSection !== "") {
										const editedSection = {
											id,
											nameSection,
											userId: currentUserId,
										}
										editSection(editedSection)
										// очищаем поля currentDetails.section,
										// action.name === buttonEditSection
										handlerCurrentValue("buttonEditSection", "")
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
