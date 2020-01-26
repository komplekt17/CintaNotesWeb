import * as React from "react"
import { CONSTANTS } from "../constants"
import "../styles/StatisticInfoPanel.sass"

interface IStatisticInfoPanelProps {
	sections: [];
	filters: { sections: string, tags: string };
	countQualityItems: (nameArray: string, nameFilter: string) => number;
	lang: string;
	theme: string;
}

const StatisticInfoPanel: React.FC<IStatisticInfoPanelProps> = props => {
	const { sections, filters, countQualityItems, lang, theme } = props

	// получение названия активной секции
	const getNameActiveSection = (
		sections: Array<{ id: string, nameSection: string }>,
		filters: { sections: string, tags: string }
	): string => {
		let nameCurrentSection
		if (filters.sections === "All") {
			nameCurrentSection = CONSTANTS[lang].BUTTON_ALL
		} else {
			const index = sections.findIndex(param => param.id === filters.sections)
			nameCurrentSection = sections[index].nameSection
		}
		return nameCurrentSection
	}

	return (
		<div className={`modul-data-${theme}`}>
			<div className="stat-info">
				<ul className="nav stat-info">
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
			<div className="stat-info-mobile">
				<ul className="nav">
					<li className="nav-item">
						<span className="nav-link">
							S: {getNameActiveSection(sections, filters)}
						</span>
					</li>
					<li className="nav-item">
						<span className="nav-link">
							T: {countQualityItems("statTags", filters.sections)}
						</span>
					</li>
					<li className="nav-item">
						<span className="nav-link">
							N: {countQualityItems("statNotes", filters.sections)}
						</span>
					</li>
				</ul>
			</div>
		</div>
	)
}

export { StatisticInfoPanel }
