import * as React from "react"
import { CONSTANTS } from "../constants"
import "../styles/SearchPanel.sass"

interface ISearchPanelProps {
	lang: string;
	theme: string;
	handlerCurrentValue: (nameInput: string, value: any) => void;
}

const SearchPanel: React.FC<ISearchPanelProps> = props => {
	const { handlerCurrentValue, lang, theme } = props

	return (
		<div className={`app-search app-search-panel-${theme}`}>
			<div className="d-flex justify-content-between align-items-center pt-3 pb-2 mb-3">
				<input
					className="form-control form-control-sm"
					id="searchText"
					type="text"
					placeholder={CONSTANTS[lang].BUTTON_SEARCH}
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
					<option value="header">{CONSTANTS[lang].SEARCH_HEADER}</option>
					<option value="text">{CONSTANTS[lang].SEARCH_TEXT}</option>
				</select>
			</div>
		</div>
	)
}

export { SearchPanel }
