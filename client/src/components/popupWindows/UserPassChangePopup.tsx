import * as React from "react"
import { IUserProfile } from "../../types"
import $ from "jquery"
import { CONSTANTS } from "../../constants"

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
	const { lang, token } = userProfile

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
								<label htmlFor="inputOldPass">enter Old Password</label>
								<input
									type="password"
									id="inputOldPass"
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
								<label htmlFor="inputNewPass">enter New Password</label>
								<input
									type="password"
									id="inputNewPass"
									className="form-control"
									placeholder="enter New Password"
									required
								/>
								<div className="invalid-feedback">
									{CONSTANTS[lang].FEEDBACK_PASS}
								</div>
							</div>

							<div className="form-label-group">
								<label htmlFor="repeatNewPass">repeat New Password</label>
								<input
									type="password"
									id="repeatNewPass"
									className="form-control"
									placeholder="repeat New Password"
									required
								/>
								<div className="invalid-feedback">
									{CONSTANTS[lang].FEEDBACK_PASS}
								</div>
							</div>

							<button
								onClick={() => {
									const inputOldPass = $("#inputOldPass").val()
									const inputNewPass = $("#inputNewPass").val()
									const repeat = $("#repeatNewPass").val()
									if (
										inputOldPass !== "" &&
										inputNewPass !== "" &&
										inputNewPass === repeat
									) {
										const objUser = {
											inputOldPass,
											inputNewPass,
											token,
										}
										updateUserPass(objUser)
										$("#inputOldPass").val("")
										$("#inputNewPass").val("")
										$("#repeatNewPass").val("")
									}
								}}
								className="btn btn-info btn-block mt-3"
								type="button"
							>
								{CONSTANTS[lang].BUTTON_SAVE}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
