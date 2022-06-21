import React, { useState } from "react"
import { IUserProfile } from "../../types"
import { CONSTANTS } from "../../constants"

interface IAddSectionProps {
	addNewSection: (value: any) => void;
	namePopup: string;
	userProfile: IUserProfile;
}
export const AddNewSectionPopup: React.FC<IAddSectionProps> = props => {
	const { addNewSection, namePopup, userProfile } = props

	const { lang, id } = userProfile

	const initialState = {
		nameSection: "",
		userId: id,
	}

	const [fields, setFields] = useState(initialState)

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
								<label htmlFor="addNameSection">
									{CONSTANTS[lang].NAME_SECTION}
								</label>
								<input
									id="addNameSection"
									name="nameSection"
									type="text"
									className="form-control"
									placeholder="enter Name Section"
									aria-describedby="formAddSection"
									value={fields.nameSection}
									onChange={ev =>
										setFields({ ...fields, [ev.target.name]: ev.target.value })
									}
								/>
								<div className="invalid-feedback">Some text</div>
							</div>
						</div>
						<div className="modal-footer">
							<button
								disabled={fields.nameSection === ""}
								onClick={() => {
									const newSection = {
										nameSection: fields.nameSection,
										userId: id,
									}
									addNewSection(newSection)
									setFields({ ...fields, nameSection: "" })
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
