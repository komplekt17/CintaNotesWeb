import * as React from "react"
import { CONSTANTS } from "../../constants"

interface IAuthFalseButtonProps {
	colorButton: string;
	nameButton: string;
	lang: string;
}

export const AuthFalseButton: React.FC<IAuthFalseButtonProps> = props => {
	const { colorButton, nameButton, lang } = props
	return (
		<div className="modal-footer">
			<button
				type="button"
				disabled
				className={`btn btn-${colorButton} btn-block mt-3`}
			>
				{nameButton}
			</button>
			<span className="text-warning">{CONSTANTS[lang].AUTH_BUTTON_TEXT}</span>
		</div>
	)
}
