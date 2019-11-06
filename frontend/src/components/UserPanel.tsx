import * as React from "react"
import $ from "jquery"

import "../styles/UserPanel.css"

interface IUserPanelProps {
	auth: boolean;
	login: string;
	getStatusLogin: (token: string) => void;
	getDataByLogin: (user: { login: any, pass: any }) => void;
}

export const UserPanel: React.FC<IUserPanelProps> = props => {
	const { auth, login, getStatusLogin, getDataByLogin } = props

	return (
		<nav className="navbar navbar-expand col-12">
			{auth ? ( // если user авторизован
				<div className="container-fluid auth-true">
					<div className="collapse navbar-collapse justify-content-between">
						<ul className="navbar-nav">
							<li className="nav-item">
								<span
									className="nav-link item-menu d-none"
									onClick={() => {
										$(".item-menu").toggleClass("d-none")
									}}
								>
									<i className="fas fa-home" /> Home
								</span>
							</li>
							<li className="nav-item">
								<span
									className="nav-link item-menu"
									onClick={() => $(".item-menu").toggleClass("d-none")}
								>
									<i className="fas fa-cogs" /> Settings
								</span>
							</li>
							<li
								className="nav-item"
								onClick={() => {
									$("#modal-createpage").modal("show")
								}}
							>
								<span className="nav-link">
									<i className="fas fa-plus-square" /> Create Page
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
											$("#modal-edituser").modal("show")
										}}
									>
										Change pass
									</span>
									<span
										className="dropdown-item"
										onClick={() => getStatusLogin("token")}
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
									onClick={() => $("#modal-createUser").modal("show")}
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
									onClick={() => $("#modal-resetPass").modal("show")}
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
