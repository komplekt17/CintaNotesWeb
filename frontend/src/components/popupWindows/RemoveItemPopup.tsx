import * as React from "react"
import { CONSTANTS } from "../../constants"
import $ from "jquery"

interface IRemoveItemProps {
	removeItem: (namePopup: string, id: string) => void;
	handlerCurrentValue: (name: string, value: string) => void;
	resetHighlightItem: (elem: any, nameElem: string) => void;
	namePopup: string;
	lang: string;
	removableItemId: string;
}

export const RemoveItemPopup: React.FC<IRemoveItemProps> = props => {
	const {
		removeItem,
		namePopup,
		removableItemId,
		handlerCurrentValue,
		resetHighlightItem,
		lang,
	} = props

	let header = namePopup
	let text = namePopup

	// for ru-localisation
	if (lang === "ru") {
		if (namePopup === "Section") {
			header = "Секции"
			text = "эту Секцию"
		} else if (namePopup === "Tag") {
			header = "Тега"
			text = "этот Тег"
		} else if (namePopup === "Note") {
			header = "Записи"
			text = "эту Запись"
		}
	}

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
						<h5 className="modal-title">
							{CONSTANTS[lang].FEEDBACK_HEADER_REMOVE} {header}
						</h5>
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
						<p>
							{CONSTANTS[lang].FEEDBACK_TEXT_REMOVE} {text}?
						</p>
					</div>
					<div className="modal-footer">
						<button
							onClick={() => {
								removeItem(namePopup, removableItemId)

								if (namePopup === "Section") {
									// сбрасываем подсветку текущей section
									// подсвечиваем section All
									resetHighlightItem($(".section-panel ul"), "clearItems")
									// очищаем поле id в currentDetails.section,
									// action.name === buttonRemoveSection
									handlerCurrentValue("buttonRemoveSection", "")
								} else if (namePopup === "Tag") {
									// сбрасываем подсветку текущего tag
									// подсвечиваем tag All
									resetHighlightItem($(".app-side-tags ul"), "clearItems")
									// очищаем поле id в currentDetails.tag,
									// action.name === buttonRemoveTag
									handlerCurrentValue("buttonRemoveTag", "")
								} else if (namePopup === "Note") {
									// очищаем поле id в currentDetails.note,
									// action.name === buttonRemoveNote
									handlerCurrentValue("buttonRemoveNote", "")
								}
							}}
							type="button"
							className="btn btn-danger btn-block mt-3"
						>
							{CONSTANTS[lang].BUTTON_REMOVE}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
