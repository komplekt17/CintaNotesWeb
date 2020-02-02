import * as React from "react"
import $ from "jquery"
import { CONSTANTS } from "../constants"
import { SectionSlider } from "./SectionSlider"
import "../styles/SectionsPanel.sass"

interface ISectionsPanelProps {
	sections: [];
	lang: string;
	theme: string;
	handlerHeaderPopup: (name: string) => void;
	handlerCurrentValue: (nameInput: string, value: string) => void;
	handlerValueFilters: (filter: string, id: string) => void;
	resetHighlightItem: (elem: any, nameElem: string) => void;
}

export const SectionsPanel: React.FC<ISectionsPanelProps> = props => {
	const {
		sections,
		lang,
		theme,
		handlerHeaderPopup,
		handlerCurrentValue,
		handlerValueFilters,
		resetHighlightItem,
	} = props

	let listSections: any = ""
	let isSliderShow: boolean = false
	let infinite: boolean = true
	let slidesToShow: number = 1
	let slidesToScroll: number = 1
	const widthDisplay: number = document.documentElement.clientWidth

	if (widthDisplay > 768 && sections.length > 4) {
		slidesToShow = 3
		slidesToScroll = 3
		isSliderShow = true
	} else if (
		widthDisplay < 768 &&
		widthDisplay > 510 &&
		sections.length > 2
	) {
		slidesToShow = 2
		slidesToScroll = 2
		isSliderShow = true
	} else if (widthDisplay < 510 && sections.length > 1) {
		slidesToShow = 1
		slidesToScroll = 1
		isSliderShow = true
		infinite = false
	}

	if (sections && sections.length !== 0) {
		listSections = sections.map((item: any, index: any) => {
			return (
				<div
					key={index}
					className={`nav-item section-tab-${theme}`}
					onClick={ev => {
						let elem = $(ev.target)
						if ($(elem).hasClass("fas")) elem = $(elem).parent()
						resetHighlightItem(elem, "")
						resetHighlightItem($(`.app-side-tags ul`), "clearItems")
						handlerValueFilters("filterSection", item.id)
					}}
				>
					<span className="nav-link">
						{item.nameSection}{" "}
						<i
							className="fas fa-edit text-success"
							onClick={() => {
								handlerHeaderPopup(CONSTANTS[lang].HEADER_EDIT_SECTION)
								// сохраняем value input редактируемой section
								handlerCurrentValue("editNameSection", item.nameSection)
								// сохраняем id редактируемой section
								handlerCurrentValue("saveIdEditedSection", item.id)
								$("#modal-editSection").modal("show")
							}}
						/>{" "}
						<i
							className="fas fa-trash-alt text-danger"
							onClick={() => {
								handlerHeaderPopup(CONSTANTS[lang].HEADER_REMOVE_SECTION)
								// сохраняем id удаляемой section
								handlerCurrentValue("saveIdRemovedSection", item.id)
								$("#modal-removeItem").modal("show")
							}}
						/>
					</span>
				</div>
			)
		})
	}

	return (
		<div className="col-12 top-panel">
			{!isSliderShow ? (
				<div className="section-panel">
					<div className="nav nav-tabs">
						<div
							className={`nav-item section-tab-${theme} item-active-${theme}`}
						>
							<span
								className="nav-link"
								onClick={ev => {
									resetHighlightItem(ev.target, "")
									resetHighlightItem($(`.app-side-tags ul`), "clearItems")
									handlerValueFilters("filterSection", "All")
								}}
							>
								{CONSTANTS[lang].BUTTON_ALL}
							</span>
						</div>
						{listSections}
						<div className={`nav-item section-tab-${theme}`}>
							<span
								className="nav-link"
								onClick={() => {
									handlerHeaderPopup(CONSTANTS[lang].HEADER_ADD_SECTION)
									$("#modal-addSection").modal("show")
								}}
							>
								<i className="fas fa-plus" />
							</span>
						</div>
					</div>
				</div>
			) : (
				<div className="section-panel-carousel">
					<div className="nav nav-tabs">
						<div
							className={`nav-item section-tab-${theme} item-active-${theme}`}
						>
							<span
								className="nav-link"
								onClick={ev => {
									console.log(ev.target)
									resetHighlightItem(ev.target, "")
									resetHighlightItem($(`.app-side-tags ul`), "clearItems")
									handlerValueFilters("filterSection", "All")
								}}
							>
								{CONSTANTS[lang].BUTTON_ALL}
							</span>
						</div>
						<div className={`nav-item section-tab-${theme}`}>
							<span
								className="nav-link"
								onClick={() => {
									console.log("ev.target")
									handlerHeaderPopup(CONSTANTS[lang].HEADER_ADD_SECTION)
									$("#modal-addSection").modal("show")
								}}
							>
								<i className="fas fa-plus" />
							</span>
						</div>
					</div>
					<SectionSlider
						infinite={infinite}
						slidesToShow={slidesToShow}
						slidesToScroll={slidesToScroll}
						listSections={listSections}
					/>
				</div>
			)}
		</div>
	)
}
