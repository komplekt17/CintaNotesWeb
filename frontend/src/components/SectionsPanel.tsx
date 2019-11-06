import * as React from "react"
import $ from "jquery"
import {
	ERROR_TEXT,
	HEADER_ADD_SECTION,
	HEADER_EDIT_SECTION,
	HEADER_REMOVE_SECTION,
} from "../constants"
import "../styles/SectionsPanel.css"

interface ISectionsPanelProps {
	sections: [];
	handlerHeaderPopup: (name: string) => void;
	handlerCurrentValue: (nameInput: string, value: string) => void;
}

let listSections: any = <h3>{ERROR_TEXT}</h3>

export const SectionsPanel: React.FC<ISectionsPanelProps> = props => {
	const { sections, handlerHeaderPopup, handlerCurrentValue } = props

	if (sections && sections.length !== 0) {
		listSections = sections.map((item: any, index: any) => {
			return (
				<li key={index} className="nav-item section-tab">
					<span className="nav-link">
						{item.nameSection}{" "}
						<i
							className="fas fa-edit text-success"
							onClick={() => {
								handlerHeaderPopup(HEADER_EDIT_SECTION)
								// сохраняем value input редактируемой section
								handlerCurrentValue("editNameSection", item.nameSection)
								// сохраняем _id редактируемой section
								handlerCurrentValue("saveIdEditedSection", item._id)
								$("#modal-editSection").modal("show")
							}}
						/>{" "}
						<i
							className="fas fa-trash-alt text-danger"
							onClick={() => {
								handlerHeaderPopup(HEADER_REMOVE_SECTION)
								// сохраняем _id удаляемой section
								handlerCurrentValue("saveIdRemovedSection", item._id)
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
					{listSections}
					<li className="nav-item section-tab">
						<span
							className="nav-link"
							onClick={() => {
								handlerHeaderPopup(HEADER_ADD_SECTION)
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
