import * as React from "react"
import "../styles/HelloPage.sass"
import { DEMO_LOGIN, DEMO_PASS } from "../constants"

interface IHelloPageProps {
	lang: any;
}

export const HelloPage: React.FC<IHelloPageProps> = ({ lang }) => {
	return (
		<>
			{lang === "en" ? (
				<div className="hello-page">
					<h3>Welcome to CintaNotes Web</h3>
					<p>Access to Demo mode:</p>
					<ul>
						<li>Login: {DEMO_LOGIN}</li>
						<li>Password: {DEMO_PASS}</li>
					</ul>
				</div>
			) : (
				<div className="hello-page">
					<h3>Приветствуем на CintaNotes Web</h3>
					<p>Доступ в демонстрационный режим:</p>
					<ul>
						<li>Логин: {DEMO_LOGIN}</li>
						<li>Пароль: {DEMO_PASS}</li>
					</ul>
				</div>
			)}
		</>
	)
}
