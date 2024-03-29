import * as React from 'react';
import $ from 'jquery';
import { IUserProfile } from '../types';
import { CONSTANTS } from '../constants';

import '../styles/UserPanel.sass';

interface IUserPanelProps {
	auth: boolean;
	theme: string;
	userProfile: IUserProfile;
	changeStatusLogin: (token: string) => void;
	getDataByLogin: (user: { login: any; pass: any }) => void;
	handlerHeaderPopup: (name: string) => void;
	resetHighlightItem: (clickedElem: any, elems: any, name: string) => void;
	handlerLang: (lang: string) => void;
	handlerTheme: (lang: string) => void;
}

export const UserPanel: React.FC<IUserPanelProps> = (props) => {
	const {
		auth,
		theme,
		userProfile,
		changeStatusLogin,
		getDataByLogin,
		resetHighlightItem,
		handlerHeaderPopup,
		handlerLang,
		handlerTheme,
	} = props;

	// изменение background-body
	const changeBGbody = (theme: string): void => {
		if (theme === 'light') $('body').css('background-color', '#2B3E50');
		else $('body').css('background-color', '#ccc');
	};

	const { lang, login, token } = userProfile;

	const languageBar = (
		<>
			<li className="nav-item">
				<span
					className="nav-link item-theme"
					onClick={() => {
						$('.item-theme').toggleClass('d-none');
						handlerTheme('light');
						resetHighlightItem(
							'',
							$('#side-tags .nav-item'),
							'clearItems'
						);
						resetHighlightItem(
							'',
							$('.section-panel .nav-item'),
							'clearItems'
						);
						changeBGbody(theme);
					}}
				>
					<i className="fas fa-sun" />
				</span>
				<span
					className="nav-link item-theme d-none"
					onClick={() => {
						$('.item-theme').toggleClass('d-none');
						handlerTheme('night');
						resetHighlightItem(
							'',
							$('#side-tags .nav-item'),
							'clearItems'
						);
						resetHighlightItem(
							'',
							$('.section-panel .nav-item'),
							'clearItems'
						);
						changeBGbody(theme);
					}}
				>
					<i className="far fa-moon" />
				</span>
			</li>
			<li className="nav-item">
				<span
					className="nav-link item-lang d-none"
					onClick={() => {
						$('.item-lang').toggleClass('d-none');
						handlerLang('en');
					}}
				>
					EN
				</span>
				<span
					className="nav-link item-lang"
					onClick={() => {
						$('.item-lang').toggleClass('d-none');
						handlerLang('ru');
					}}
				>
					RU
				</span>
			</li>
		</>
	);

	return (
		<nav className="navbar navbar-expand col-12">
			{auth ? ( // если user авторизован
				<div className="container auth-true">
					<div className="collapse navbar-collapse justify-content-between">
						<ul className="navbar-nav">{languageBar}</ul>
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
								<div
									className="dropdown-menu"
									aria-labelledby="dropdown08"
								>
									<span
										className="dropdown-item"
										onClick={() => {
											$('#modal-changePass').modal('show');
											handlerHeaderPopup(
												CONSTANTS[lang].HEADER_CHANGE_PASS
											);
										}}
									>
										{CONSTANTS[lang].MENU_CHANGE_PASS}
									</span>
									<span
										className="dropdown-item"
										onClick={() => {
											changeStatusLogin(token);
										}}
									>
										{CONSTANTS[lang].MENU_LOGOUT}
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
				<div className="container auth-false">
					<div className="collapse navbar-collapse justify-content-between">
						<ul className="navbar-nav">
							{languageBar}
							<li className="nav-item">
								<span
									className="nav-link"
									onClick={() => {
										$('#modal-createUser').modal('show');
										handlerHeaderPopup(CONSTANTS[lang].HEADER_CREATE_USER);
									}}
								>
									<i
										data-toggle="tooltip"
										data-placement="bottom"
										title="Registration"
										className="fas fa-key"
									/>{' '}
									<span className="nav-link-name">
										{CONSTANTS[lang].MENU_REG}
									</span>
								</span>
							</li>
							<li className="nav-item">
								<span
									className="nav-link"
									onClick={() => {
										$('#modal-resetPass').modal('show');
										handlerHeaderPopup(CONSTANTS[lang].HEADER_RESET_PASS);
									}}
								>
									<i
										data-toggle="tooltip"
										data-placement="bottom"
										title="Forgot password"
										className="fas fa-unlock-alt"
									/>{' '}
									<span className="nav-link-name">
										{CONSTANTS[lang].MENU_RESET_PASS}
									</span>
								</span>
							</li>
						</ul>

						<div id="formHeader" onSubmit={(e) => e.preventDefault()}>
							<div className="login-input">
								<input
									id="userLogin"
									type="text"
									className=""
									placeholder="your@mail.ru"
								/>
							</div>
							<div className="login-input">
								<input
									id="userPass"
									type="password"
									className=""
									placeholder="password"
								/>
							</div>
							<div className="login-btn">
								<button
									className="btn btn-sm btn-success"
									type="button"
									onClick={() => {
										const login = $('#userLogin').val();
										const pass = $('#userPass').val();
										if (login !== '' && pass !== '') {
											const user = { login, pass };
											getDataByLogin(user);
											$('#userLogin').val('');
											$('#userPass').val('');
										}
									}}
								>
									{CONSTANTS[lang].BUTTON_LOGIN}
								</button>
							</div>
						</div>
						<i
							onClick={() => {
								$('#modal-mobileAuth').modal('show');
								handlerHeaderPopup(CONSTANTS[lang].HEADER_AUTH);
							}}
							id="mobileHeader"
							data-toggle="tooltip"
							data-placement="bottom"
							title="Login"
							className="fas fa-sign-in-alt"
						/>
					</div>
				</div>
			)}
		</nav>
	);
};
