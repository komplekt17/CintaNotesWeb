import * as React from "react"
import $ from "jquery"
import {
	HEADER_CREATE_USER,
	HEADER_CHANGE_PASS,
	HEADER_RESET_PASS,
} from "../constants"

import "../styles/UserPanel.css"

interface IUserPanelProps {
	auth: boolean;
	login: string;
	getStatusLogin: (token: string) => void;
	getDataByLogin: (user: { login: any, pass: any }) => void;
	handlerHeaderPopup: (name: string) => void;
}

export const UserPanel: React.FC<IUserPanelProps> = props => {
	const {
		auth,
		login,
		getStatusLogin,
		getDataByLogin,
		handlerHeaderPopup,
	} = props

	return (
		<nav className="navbar navbar-expand col-12">
			{auth ? ( // если user авторизован
				<div className="container-fluid auth-true">
					<div className="collapse navbar-collapse justify-content-between">
						<ul className="navbar-nav">
							<li className="nav-item">
								<span
									className="nav-link item-theme d-none"
									onClick={() => $(".item-theme").toggleClass("d-none")}
								>
									<i className="fas fa-sun" />
								</span>
								<span
									className="nav-link item-theme"
									onClick={() => $(".item-theme").toggleClass("d-none")}
								>
									<i className="far fa-moon" />
								</span>
							</li>
							<li className="nav-item">
								<span
									className="nav-link item-lang d-none"
									onClick={() => {
										$(".item-lang").toggleClass("d-none")
									}}
								>
									RU
								</span>
								<span
									className="nav-link item-lang"
									onClick={() => {
										$(".item-lang").toggleClass("d-none")
									}}
								>
									EN
								</span>
							</li>
						</ul>
						<ul className="navbar-nav">
							<li className="nav-item dropdown">
								<span
									className="nav-link dropdown-toggle"
									id="dropdown08"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									{login}
								</span>
								<div className="dropdown-menu" aria-labelledby="dropdown08">
									<span
										className="dropdown-item"
										onClick={() => {
											$("#modal-changePass").modal("show")
											handlerHeaderPopup(HEADER_CHANGE_PASS)
										}}
									>
										Change pass
									</span>
									<span
										className="dropdown-item"
										onClick={() => {
											getStatusLogin("token")
										}}
									>
										LogOut
									</span>
								</div>
							</li>
							<li className="nav-item active">
								<span className="nav-link">
									<span className="sr-only">(current)</span>
								</span>
							</li>
						</ul>
					</div>
				</div>
			) : (
				// если user не авторизован
				<div className="container-fluid auth-false">
					<div className="collapse navbar-collapse justify-content-between">
						<ul className="navbar-nav">
							<li className="nav-item">
								<span
									className="nav-link"
									onClick={() => {
										$("#modal-createUser").modal("show")
										handlerHeaderPopup(HEADER_CREATE_USER)
									}}
								>
									<i
										data-toggle="tooltip"
										data-placement="bottom"
										title="Registration"
										className="fas fa-key"
									/>{" "}
									<span className="nav-link-name">Registration</span>
								</span>
							</li>
							<li className="nav-item">
								<span
									className="nav-link"
									onClick={() => {
										$("#modal-resetPass").modal("show")
										handlerHeaderPopup(HEADER_RESET_PASS)
									}}
								>
									<i
										data-toggle="tooltip"
										data-placement="bottom"
										title="Forgot password"
										className="fas fa-unlock-alt"
									/>{" "}
									<span className="nav-link-name">Forgot password</span>
								</span>
							</li>
						</ul>

						<form id="formHeader" onSubmit={e => e.preventDefault()}>
							<div className="row">
								<div className="col">
									<input
										id="userLogin"
										type="text"
										className="form-control-sm"
										placeholder="enter your@mail.ru"
									/>
								</div>
								<div className="col">
									<input
										id="userPass"
										type="password"
										className="form-control-sm"
										placeholder="password"
									/>
								</div>
								<div className="col">
									<button
										className="btn btn-sm btn-success"
										type="button"
										onClick={() => {
											const login = $("#userLogin").val()
											const pass = $("#userPass").val()
											if (login !== "" && pass !== "") {
												const user = { login, pass }
												getDataByLogin(user)
												$("#userLogin").val("")
												$("#userPass").val("")
											}
										}}
									>
										LogIn
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			)}
		</nav>
	)
}
