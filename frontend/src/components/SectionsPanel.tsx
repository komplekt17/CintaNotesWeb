import * as React from "react"
import $ from "jquery"
import { ISectionsPanelProps } from "../types"
import {
	ERROR_TEXT,
	HEADER_ADD_SECTION,
	HEADER_REMOVE_SECTION,
} from "../constants"
import "../styles/SectionsPanel.css"

let listSections: any = <h3>{ERROR_TEXT}</h3>

const SectionsPanel: React.FC<ISectionsPanelProps> = props => {
	const { sections, handlerHeaderPopup, handlerInputsValue } = props

	if (sections && sections.length !== 0) {
		listSections = sections.map((item: any, index: any) => {
			return (
				<li key={index} className="nav-item section-tab">
					<span className="nav-link">
						{item.nameSection}{" "}
						<i
							className="fas fa-edit text-success"
							onClick={() => {
								alert(`in progress - ${item.nameSection}`)
							}}
						/>{" "}
						<i
							className="fas fa-minus-circle text-danger"
							onClick={() => {
								handlerHeaderPopup(HEADER_REMOVE_SECTION)
								handlerInputsValue("saveIdRemovedSection", item._id)
								$("#modal-removeSection").modal("show")
							}}
						/>
					</span>
				</li>
			)
		})
	}

	return (
		<div className="col-12 section-panel">
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
			<div className="">
				<p>User</p>
			</div>
		</div>
	)
}

export { SectionsPanel }
