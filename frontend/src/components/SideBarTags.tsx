import * as React from "react"
import { CONSTANTS } from "../constants"
import $ from "jquery"

import "../styles/SideBarTag.css"

interface ISideBarTagsProps {
	tags: Array<{
		_id: string,
		nameTag: string,
		sectionID: string,
		userID: string,
	}>;
	lang: string;
	filters: { sections: string, tags: string };
	handlerHeaderPopup: (name: string) => void;
	handlerCurrentValue: (name: string, value: string) => void;
	handlerValueFilters: (filter: string, id: string) => void;
	resetHighlightItem: (elem: any, nameElem: string) => void;
	countQualityItems: (nameArray: string, nameFilter: string) => number;
}

export const SideBarTags: React.FC<ISideBarTagsProps> = props => {
	const {
		tags,
		lang,
		filters,
		handlerHeaderPopup,
		handlerCurrentValue,
		resetHighlightItem,
		handlerValueFilters,
		countQualityItems,
	} = props

	let listTags: any = (
		<li className="nav-item d-flex">
			<span className="nav-link">{CONSTANTS[lang].ERROR_TEXT}</span>
		</li>
	)

	if (tags && tags.length !== 0) {
		listTags = tags.map((item: any, index: number) => {
			return (
				<li
					key={index}
					className="nav-item d-flex tags-item justify-content-between"
				>
					<span
						className="nav-link name_tag"
						onClick={ev => {
							resetHighlightItem(ev.target, "")
							handlerValueFilters("filterTag", item._id)
						}}
					>
						{item.nameTag}
					</span>
					<span className="nav-link">
						<span className="name_tag-qwt">
							{countQualityItems("tagBarNotes", item._id)}
						</span>
						<span className="name_tag-btns">
							<i
								className="fas fa-edit text-success"
								onClick={() => {
									handlerHeaderPopup(CONSTANTS[lang].HEADER_EDIT_TAG)
									// сохраняем _id удаляемой Tag
									handlerCurrentValue("saveIdEditedTag", item._id)
									$("#modal-editTag").modal("show")
								}}
							/>{" "}
							<i
								className="fas fa-trash-alt text-danger"
								onClick={() => {
									handlerHeaderPopup(CONSTANTS[lang].HEADER_REMOVE_TAG)
									// сохраняем _id удаляемой Tag
									handlerCurrentValue("saveIdRemovedTag", item._id)
									$("#modal-removeItem").modal("show")
								}}
							/>
						</span>
					</span>
				</li>
			)
		})
	}
	return (
		<ul className="nav flex-column">
			<li className="nav-item d-flex justify-content-between">
				<span className="nav-link">
					<button
						onClick={() => {
							handlerHeaderPopup(CONSTANTS[lang].HEADER_ADD_TAG)
							$("#modal-addTag").modal("show")
						}}
						className="btn btn-outline-success btn-sm"
					>
						{CONSTANTS[lang].BUTTON_ADD_TAG}
					</button>
					<button
						onClick={() => {
							handlerHeaderPopup(CONSTANTS[lang].HEADER_ADD_NOTE)
							$("#modal-addNote").modal("show")
						}}
						className="btn btn-outline-info btn-sm rounded"
					>
						{CONSTANTS[lang].BUTTON_ADD_NOTE}
					</button>
				</span>
			</li>
			<li className="nav-item d-flex tags-item justify-content-between item-active">
				<span
					className="nav-link"
					onClick={ev => {
						resetHighlightItem(ev.target, "")
						handlerValueFilters("filterTag", "All")
					}}
				>
					{CONSTANTS[lang].ITEMS_ALL}
				</span>
				<span className="nav-link">
					{countQualityItems("tagBarNotes", "All")}
				</span>
			</li>
			{filters.sections === "All" ? (
				<li className="nav-item d-flex tags-item justify-content-between">
					<span
						className="nav-link"
						onClick={ev => {
							resetHighlightItem(ev.target, "")
							handlerValueFilters("filterTag", "Untagged")
						}}
					>
						{CONSTANTS[lang].ITEMS_NOTAG}
					</span>
					<span className="nav-link">
						{countQualityItems("tagBarNotes", "Untagged")}
					</span>
				</li>
			) : (
				""
			)}
			{listTags}
		</ul>
	)
}
