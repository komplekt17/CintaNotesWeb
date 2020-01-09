import * as React from "react"
import "../styles/SearchPanel.css"

interface ISearchPanelProps {
	lang: string;
	handlerCurrentValue: (nameInput: string, value: any) => void;
}

const SearchPanel: React.FC<ISearchPanelProps> = props => {
	const { handlerCurrentValue } = props

	return (
		<div className="app-search-panel">
			<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
				<input
					className="form-control form-control-sm"
					id="searchText"
					type="text"
					placeholder="Search"
					aria-label="Search"
					onChange={ev => {
						handlerCurrentValue("searchText", ev.target.value)
					}}
				/>
				<select
					className="form-control-sm"
					id="SearchSort"
					onChange={ev => {
						handlerCurrentValue("searchSort", ev.target.value)
					}}
				>
					<option value="header">search by header</option>
					<option value="text">search by text</option>
				</select>
			</div>
		</div>
	)
}

export { SearchPanel }
