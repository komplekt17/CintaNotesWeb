import * as React from "react"
import { CONSTANTS } from "../constants"

interface IStatisticInfoPanelProps {
	sections: [];
	filters: { sections: string, tags: string };
	countQualityItems: (nameArray: string, nameFilter: string) => number;
	lang: string;
}

const StatisticInfoPanel: React.FC<IStatisticInfoPanelProps> = props => {
	const { sections, filters, countQualityItems, lang } = props

	// получение названия активной секции
	const getNameActiveSection = (
		sections: Array<{ id: string, nameSection: string }>,
		filters: { sections: string, tags: string }
	): string => {
		let nameCurrentSection
		if (filters.sections === "All") {
			nameCurrentSection = CONSTANTS[lang].BUTTON_ALL
		} else {
			const index = sections.findIndex(
				param => param.id === filters.sections
			)
			nameCurrentSection = sections[index].nameSection
		}
		return nameCurrentSection
	}

	return (
		<div className="modul-data">
			<ul className="nav">
				<li className="nav-item">
					<span className="nav-link">
						{CONSTANTS[lang].ITEMS_ACTIVE_SECTION}:{" "}
						{getNameActiveSection(sections, filters)}
					</span>
				</li>
				<li className="nav-item">
					<span className="nav-link">
						{CONSTANTS[lang].ITEMS_TAGS}:{" "}
						{countQualityItems("statTags", filters.sections)}
					</span>
				</li>
				<li className="nav-item">
					<span className="nav-link">
						{CONSTANTS[lang].ITEMS_NOTES}:{" "}
						{countQualityItems("statNotes", filters.sections)}
					</span>
				</li>
			</ul>
		</div>
	)
}

export { StatisticInfoPanel }
