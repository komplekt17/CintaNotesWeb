import * as React from "react"
import $ from "jquery"
import { CONSTANTS } from "../../constants"

interface IUserMobileAuthProps {
	namePopup: string;
	lang: string;
	getDataByLogin: (user: { login: any, pass: any }) => void;
}

export const UserMobileAuthPopup: React.FC<IUserMobileAuthProps> = props => {
	const { namePopup, lang, getDataByLogin } = props

	return (
		<div
			id="modal-mobileAuth"
			className="modal fade"
			tabIndex={-1}
			role="dialog"
			aria-labelledby="modal-mobileAuth"
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
							className="form-signin needs-validation"
							noValidate
							onSubmit={ev => ev.preventDefault()}
						>
							<div className="form-label-group">
								<label htmlFor="mobileUserLogin">
									{CONSTANTS[lang].ENTER_EMAIL}
								</label>
								<input
									type="text"
									id="mobileUserLogin"
									className="form-control"
									placeholder="your@mail.ru"
									required
								/>
								<div className="invalid-feedback">
									{CONSTANTS[lang].FEEDBACK_EMAIL}
								</div>
							</div>

							<div className="form-label-group">
								<label htmlFor="mobileUserPass">
									{CONSTANTS[lang].ENTER_PASS}
								</label>
								<input
									type="password"
									id="mobileUserPass"
									className="form-control"
									placeholder="enter Password"
									required
								/>
								<div className="invalid-feedback">
									{CONSTANTS[lang].FEEDBACK_PASS}
								</div>
							</div>

							<button
								className="btn btn-success btn-block mt-3"
								type="button"
								onClick={() => {
									const login = $("#mobileUserLogin").val()
									const pass = $("#mobileUserPass").val()
									if (login !== "" && pass !== "") {
										const user = { login, pass }
										getDataByLogin(user)
										$("#mobileUserLogin").val("")
										$("#mobileUserPass").val("")
									}
								}}
							>
								{CONSTANTS[lang].BUTTON_LOGIN}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
