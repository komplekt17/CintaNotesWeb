import React, { useState, useEffect } from "react"
import { CONSTANTS } from "../../constants"

interface IEditSectionProps {
	editSection: (editedSection: {
		id: string,
		nameSection: string,
		userId: string,
	}) => void;
	currentEditedSection: {
		id: string,
		nameSection: string,
		userId: string,
	};
	namePopup: string;
	lang: string;
}
export const EditSectionPopup: React.FC<IEditSectionProps> = props => {
	const { editSection, currentEditedSection, namePopup, lang } = props

	const [fields, setFields] = useState(currentEditedSection)

	// обновляем стейт после обновления props
	useEffect(() => {
		setFields(currentEditedSection)
	}, [setFields, currentEditedSection])

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
								<label htmlFor="editNameSection">
									{CONSTANTS[lang].NAME_SECTION}
								</label>
								<input
									id="editNameSection"
									name="nameSection"
									type="text"
									className="form-control"
									placeholder="enter Name Section"
									aria-describedby="formEditSection"
									value={fields.nameSection}
									onChange={e =>
										setFields({ ...fields, [e.target.name]: e.target.value })
									}
								/>
								<div className="invalid-feedback">Some text</div>
							</div>
						</div>
						<div className="modal-footer">
							<button
								disabled={fields.nameSection === ""}
								onClick={() => {
									const editedSection = {
										id: fields.id,
										nameSection: fields.nameSection,
										userId: fields.userId,
									}
									editSection(editedSection)
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
