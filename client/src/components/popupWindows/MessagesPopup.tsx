import * as React from "react"
import "../../styles/MessagesPopup.sass"

interface IMessagesPopupProps {
	category: string;
	message: string;
}
// https://reactjsexample.com/a-basic-template-for-react-fiddling/

export const MessagesPopup: React.FC<IMessagesPopupProps> = props => {
	return (
		<div
			id="modal-alert"
			className="modal fade"
			tabIndex={-1}
			role="dialog"
			aria-labelledby="exampleModalCenterTitle"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-dialog-centered" role="document">
				<div className={`Toast Toast--${props.category}`}>
					<main className="Toast__message">
						<header className="Toast__message-category">{props.category}</header>
						<p className="Toast__message-text">{props.message}</p>
					</main>
				</div>
				<button
					type="button"
					className="close popupClose"
					data-dismiss="modal"
					aria-label="Close"
				>
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
		</div>
	)
}
