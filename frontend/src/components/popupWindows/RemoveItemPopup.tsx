import * as React from "react"

interface IRemoveItemProps {
	removeItem: (namePopup: string, id: string) => void;
	handlerCurrentValue: (name: string, value: string) => void;
	namePopup: string;
	removableItemID: string;
}

export const RemoveItemPopup: React.FC<IRemoveItemProps> = props => {
	const {
		removeItem,
		namePopup,
		removableItemID,
		handlerCurrentValue,
	} = props

	return (
		<div
			id="modal-removeItem"
			className="modal fade"
			tabIndex={-1}
			role="dialog"
			aria-labelledby="exampleModalCenterTitle"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-dialog-centered" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Removing {namePopup}</h5>
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
						<p>Are you sure to delete this {namePopup}?</p>
					</div>
					<div className="modal-footer">
						<button
							onClick={() => {
								removeItem(namePopup, removableItemID)
								if (namePopup === "Section") {
									// очищаем поле _id в currentDetails.section,
									// action.name === buttonRemoveSection
									handlerCurrentValue("buttonRemoveSection", "")
								} else if (namePopup === "Tag") {
									// очищаем поле _id в currentDetails.tag,
									// action.name === buttonRemoveTag
									handlerCurrentValue("buttonRemoveTag", "")
								} else if (namePopup === "Note") {
									// очищаем поле _id в currentDetails.note,
									// action.name === buttonRemoveNote
									handlerCurrentValue("buttonRemoveNote", "")
								}
							}}
							type="button"
							className="btn btn-danger"
						>
							Remove {namePopup}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
