import * as React from "react"
import $ from "jquery"
import { CONSTANTS } from "../constants"
import "../styles/SectionsPanel.sass"

interface ISectionsPanelProps {
	sections: [];
	lang: string;
	theme: string;
	handlerHeaderPopup: (name: string) => void;
	handlerCurrentValue: (nameInput: string, value: string) => void;
	handlerValueFilters: (filter: string, id: string) => void;
	resetHighlightItem: (elem: any, nameElem: string) => void;
}

export const SectionsPanel: React.FC<ISectionsPanelProps> = props => {
	const {
		sections,
		lang,
		theme,
		handlerHeaderPopup,
		handlerCurrentValue,
		handlerValueFilters,
		resetHighlightItem,
	} = props

	let listSections: any = ""

	if (sections && sections.length !== 0) {
		listSections = sections.map((item: any, index: any) => {
			return (
				<li
					key={index}
					className={`nav-item section-tab-${theme}`}
					onClick={ev => {
						let elem = $(ev.target)
						if ($(elem).hasClass("fas")) elem = $(elem).parent()
						resetHighlightItem(elem, "")
						resetHighlightItem($(`.app-side-tags-${theme} ul`), "clearItems")
						handlerValueFilters("filterSection", item.id)
					}}
				>
					<span className="nav-link">
						{item.nameSection}{" "}
						<i
							className="fas fa-edit text-success"
							onClick={() => {
								handlerHeaderPopup(CONSTANTS[lang].HEADER_EDIT_SECTION)
								// сохраняем value input редактируемой section
								handlerCurrentValue("editNameSection", item.nameSection)
								// сохраняем id редактируемой section
								handlerCurrentValue("saveIdEditedSection", item.id)
								$("#modal-editSection").modal("show")
							}}
						/>{" "}
						<i
							className="fas fa-trash-alt text-danger"
							onClick={() => {
								handlerHeaderPopup(CONSTANTS[lang].HEADER_REMOVE_SECTION)
								// сохраняем id удаляемой section
								handlerCurrentValue("saveIdRemovedSection", item.id)
								$("#modal-removeItem").modal("show")
							}}
						/>
					</span>
				</li>
			)
		})
	}

	return (
		<div className="col-12 top-panel">
			<div className="section-panel">
				<ul className="nav nav-tabs">
					<li className={`nav-item section-tab-${theme} item-active-${theme}`}>
						<span
							className="nav-link"
							onClick={ev => {
								resetHighlightItem(ev.target, "")
								resetHighlightItem($(`.app-side-tags-${theme} ul`), "clearItems")
								handlerValueFilters("filterSection", "All")
							}}
						>
							{CONSTANTS[lang].BUTTON_ALL}
						</span>
					</li>
					{listSections}
					<li className={`nav-item section-tab-${theme}`}>
						<span
							className="nav-link"
							onClick={() => {
								handlerHeaderPopup(CONSTANTS[lang].HEADER_ADD_SECTION)
								$("#modal-addSection").modal("show")
							}}
						>
							<i className="fas fa-plus" />
						</span>
					</li>
				</ul>
			</div>
		</div>
	)
}
