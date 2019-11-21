import * as React from "react"
import { CONSTANTS } from "../constants"
import "../styles/SearchPanel.css"

interface ISearchPanelProps {
	lang: string;
}

const SearchPanel: React.FC<ISearchPanelProps> = props => {
	const { lang } = props

	return (
		<div className="app-search-panel">
			<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
				<input
					className="form-control form-control-sm w-100"
					type="text"
					placeholder="Search"
					aria-label="Search"
				/>
				<div className="btn-toolbar mb-2 mb-md-0">
					<div className="btn-group mr-2">
						<button type="button" className="btn btn-sm btn-info">
							{CONSTANTS[lang].BUTTON_SEARCH}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export { SearchPanel }
