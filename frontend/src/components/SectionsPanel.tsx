import * as React from "react"
import { ERROR_TEXT } from "../constants"
import "../styles/SectionsPanel.css"

interface ISectionsPanelProps {
	sections: any;
}

let listSections = <h3>{ERROR_TEXT}</h3>

const SectionsPanel: React.FC<ISectionsPanelProps> = ({ sections }) => {
	if (sections && sections.length !== 0) {
		listSections = sections.map((item: any, index: any) => {
			return (
				<li key={index} className="nav-item section-tab">
					<span className="nav-link">{item.nameSection}</span>
				</li>
			)
		})
	}

	return (
		<div className="col-12 section-panel">
			<ul className="nav nav-tabs">
				{listSections}
				<li className="nav-item section-tab">
					<span className="nav-link">
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
