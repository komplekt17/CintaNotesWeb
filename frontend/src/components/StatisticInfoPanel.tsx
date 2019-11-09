import * as React from "react"

interface IStatisticInfoPanelProps {
	sections: [];
	tags: [];
	notes: [];
	filters: { sections: string, tags: string };
}

// получение количества тегов или записей активной секции
const countQualityItems = (
	arr: Array<{
		sectionID: string,
	}>,
	filterSection: string
): number => {
	let count = 0
	if (filterSection === "All") {
		count = arr.length
	} else {
		// filterSection !== "All"
		for (let i = 0; i < arr.length; i++) {
			for (const key in arr[i]) {
				if (key === "sectionID" && arr[i][key] === filterSection) {
					count += 1
				}
			}
		}
	}
	return count
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
	const { sections, tags, notes, filters } = props
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
						tags: {countQualityItems(tags, filters.sections)}
					</span>
				</li>
				<li className="nav-item">
					<span className="nav-link">
						notes: {countQualityItems(notes, filters.sections)}
					</span>
				</li>
			</ul>
		</div>
	)
}

export { StatisticInfoPanel }
