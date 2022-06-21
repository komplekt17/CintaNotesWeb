import * as React from "react"
import { IUserProfile } from "../../types"
import { CONSTANTS } from "../../constants"
import $ from "jquery"

interface IAddUserProps {
	createNewUser: (objUser: {
		login: any,
		pass: any,
		status: string,
		lang: string,
		theme: string,
	}) => void;
	namePopup: string;
	userProfile: IUserProfile;
}
export const AddNewUserPopup: React.FC<IAddUserProps> = props => {
	const { createNewUser, namePopup, userProfile } = props

	const { status, lang, theme } = userProfile

	return (
		<div
			id="modal-createUser"
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
							id="formCreateUser"
							className="form-signin needs-validation"
							noValidate
							onSubmit={ev => ev.preventDefault()}
						>
							<div className="form-label-group">
								<label htmlFor="inputEmail">{CONSTANTS[lang].ENTER_EMAIL}</label>
								<input
									type="email"
									id="inputEmail"
									className="form-control"
									placeholder="Email address"
									required
									autoFocus
								/>
								<div className="invalid-feedback">
									{CONSTANTS[lang].FEEDBACK_EMAIL}
								</div>
							</div>

							<div className="form-label-group">
								<label htmlFor="inputPassword">{CONSTANTS[lang].ENTER_PASS}</label>
								<input
									type="password"
									id="inputPassword"
									className="form-control"
									placeholder="enter Password"
									required
								/>
								<div className="invalid-feedback">
									{CONSTANTS[lang].FEEDBACK_PASS}
								</div>
							</div>

							<div className="form-label-group">
								<label htmlFor="repeatPassword">
									{CONSTANTS[lang].REPEAT_PASS}
								</label>
								<input
									type="password"
									id="repeatPassword"
									className="form-control"
									placeholder="repeat Password"
									required
								/>
								<div className="invalid-feedback">
									{CONSTANTS[lang].FEEDBACK_PASS}
								</div>
							</div>

							<button
								onClick={() => {
									const login = $("#inputEmail").val()
									const pass = $("#inputPassword").val()
									const repeat = $("#repeatPassword").val()
									if (login !== "" && pass !== "" && pass === repeat) {
										const objUser = {
											login,
											pass,
											status,
											lang,
											theme,
										}
										createNewUser(objUser)
										$("#inputEmail").val("")
										$("#inputPassword").val("")
										$("#repeatPassword").val("")
									}
								}}
								className="btn btn-info btn-block mt-3"
								type="button"
							>
								{CONSTANTS[lang].BUTTON_CREATE}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
