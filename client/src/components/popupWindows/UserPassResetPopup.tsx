import * as React from "react"
import $ from "jquery"
import { CONSTANTS } from "../../constants"

interface IUserPassResetProps {
	namePopup: string;
	lang: string;
	resetPassword: (userLogin: any) => void;
}

export const UserPassResetPopup: React.FC<IUserPassResetProps> = props => {
	const { namePopup, lang, resetPassword } = props

	return (
		<div
			id="modal-resetPass"
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
							id="resetPass"
							className="form-signin needs-validation"
							noValidate
							onSubmit={ev => ev.preventDefault()}
						>
							<div className="form-label-group">
								<label htmlFor="inputLogin">{CONSTANTS[lang].ENTER_EMAIL}</label>
								<input
									type="text"
									id="inputLogin"
									className="form-control"
									placeholder="your@mail.ru"
									required
									autoFocus
								/>
								<div className="invalid-feedback">
									{CONSTANTS[lang].FEEDBACK_EMAIL}
								</div>
							</div>

							<button
								onClick={() => {
									const userLogin = $("#inputLogin").val()
									if (userLogin !== "") {
										resetPassword(userLogin)
									}
									$("#inputLogin").val("")
								}}
								className="btn btn-info btn-block mt-3"
								type="button"
							>
								{CONSTANTS[lang].BUTTON_RESET}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
