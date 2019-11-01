import * as React from "react"
import { ERROR_TEXT } from "../constants"

interface ISideTagsProps {
	getAllNotes: any;
	tags: any;
}

let listTags = <h3>{ERROR_TEXT}</h3>

const SideTags: React.FC<ISideTagsProps> = ({ tags }) => {
	if (tags && tags.length) {
		listTags = tags.map((item: any, index: number) => {
			return (
				<li key={index} className="nav-item d-flex justify-content-between">
					<span className="nav-link" onClick={() => {}}>
						{item.nameTag}
					</span>
					<span className="nav-link">{index}</span>
				</li>
			)
		})
	}
	return (
		<ul className="nav flex-column">
			<li className="nav-item d-flex justify-content-between">
				<span className="nav-link" onClick={() => {}}>
					All
				</span>
				<span className="nav-link">8</span>
			</li>
			<li className="nav-item d-flex justify-content-between">
				<span className="nav-link" onClick={() => {}}>
					Untagged
				</span>
				<span className="nav-link">7</span>
			</li>
			{listTags}
		</ul>
	)
}

export { SideTags }
