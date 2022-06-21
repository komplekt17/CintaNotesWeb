import React, { useState } from "react"
import { IUserProfile } from "../../types"
import { AuthFalseButton } from "./AuthFalseButton"
import { CONSTANTS, DEMO_LOGIN } from "../../constants"

interface IUserPassChangeProps {
	namePopup: string;
	userProfile: IUserProfile;
	updateUserPass: (objUser: {
		inputOldPass: any,
		inputNewPass: any,
		token: string,
	}) => void;
}

export const UserPassChangePopup: React.FC<IUserPassChangeProps> = props => {
	const { namePopup, userProfile, updateUserPass } = props
	const { login, lang, token } = userProfile

	const initialForm: any = {
		inputOldPass: "",
		inputNewPass: "",
		repeatNewPass: "",
	}
	const [fields, setFields] = useState(initialForm)
	const { inputOldPass, inputNewPass, repeatNewPass } = fields

	const handlerFields = (event: any): void => {
		setFields({ ...fields, [event.target.id]: event.target.value })
	}

	return (
		<div
			id="modal-changePass"
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
					<div className="modal-body">
						<form
							id="editUser"
							className="form-signin needs-validation"
							noValidate
							onSubmit={ev => ev.preventDefault()}
						>
							<div className="form-label-group">
								<label htmlFor="inputOldPass">
									{CONSTANTS[lang].ENTER_OLD_PASS}
								</label>
								<input
									type="password"
									id="inputOldPass"
									value={inputOldPass}
									onChange={event => handlerFields(event)}
									className="form-control"
									placeholder="enter Old Password"
									required
									autoFocus
								/>
								<div className="invalid-feedback">
									{CONSTANTS[lang].FEEDBACK_PASS}
								</div>
							</div>

							<div className="form-label-group">
								<label htmlFor="inputNewPass">
									{CONSTANTS[lang].ENTER_NEW_PASS}
								</label>
								<input
									type="password"
									id="inputNewPass"
									value={inputNewPass}
									onChange={event => handlerFields(event)}
									className="form-control"
									placeholder="enter New Password"
									required
								/>
								<div className="invalid-feedback">
									{CONSTANTS[lang].FEEDBACK_PASS}
								</div>
							</div>

							<div className="form-label-group">
								<label htmlFor="repeatNewPass">
									{CONSTANTS[lang].REPEAT_NEW_PASS}
								</label>
								<input
									type="password"
									id="repeatNewPass"
									value={repeatNewPass}
									onChange={event => handlerFields(event)}
									className="form-control"
									placeholder="repeat New Password"
									required
								/>
								<div className="invalid-feedback">
									{CONSTANTS[lang].FEEDBACK_PASS}
								</div>
							</div>

							{login !== DEMO_LOGIN ? (
								<button
									disabled={
										inputOldPass === "" ||
										inputNewPass === "" ||
										inputNewPass !== repeatNewPass
									}
									onClick={() => {
										const objUser = {
											inputOldPass,
											inputNewPass,
											token,
										}
										updateUserPass(objUser)
										setFields({
											...fields,
											inputOldPass: "",
											inputNewPass: "",
											repeatNewPass: "",
										})
									}}
									className="btn btn-info btn-block mt-3"
									type="button"
								>
									{CONSTANTS[lang].BUTTON_SAVE}
								</button>
							) : (
								<AuthFalseButton
									colorButton="success"
									nameButton={CONSTANTS[lang].BUTTON_SAVE}
									lang={lang}
								/>
							)}
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
