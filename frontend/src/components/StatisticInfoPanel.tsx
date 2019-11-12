import * as React from "react"

interface IStatisticInfoPanelProps {
	sections: [];
	filters: { sections: string, tags: string };
	countQualityItems: (nameArray: string, nameFilter: string) => number;
}

// получение названия активной секции
const getNameActiveSection = (
	sections: Array<{ _id: string, nameSection: string }>,
	filters: { sections: string, tags: string }
): string => {
	let nameCurrentSection
	if (filters.sections === "All") {
		nameCurrentSection = "All"
	} else {
		const index = sections.findIndex(param => param._id === filters.sections)
		nameCurrentSection = sections[index].nameSection
	}
	return nameCurrentSection
}

const StatisticInfoPanel: React.FC<IStatisticInfoPanelProps> = props => {
	const { sections, filters, countQualityItems } = props

	return (
		<div className="modul-data">
			<ul className="nav">
				<li className="nav-item">
					<span className="nav-link">
						Active Section: {getNameActiveSection(sections, filters)}
					</span>
				</li>
				<li className="nav-item">
					<span className="nav-link">
						tags: {countQualityItems("statTags", filters.sections)}
					</span>
				</li>
				<li className="nav-item">
					<span className="nav-link">
						notes: {countQualityItems("statNotes", filters.sections)}
					</span>
				</li>
			</ul>
		</div>
	)
}

export { StatisticInfoPanel }
