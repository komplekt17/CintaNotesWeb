import * as React from "react"
import {
	ERROR_TEXT,
	HEADER_ADD_TAG,
	HEADER_EDIT_TAG,
	HEADER_REMOVE_TAG,
	HEADER_ADD_NOTE,
} from "../constants"
import $ from "jquery"

import "../styles/SideBarTag.css"

interface ISideBarTagsProps {
	tags: Array<{
		_id: string,
		nameTag: string,
		sectionID: string,
		userID: string,
	}>;
	notes: Array<{
		_id: string,
		header: string,
		text: string,
		remarks: string,
		link: string,
		sectionID: string,
		tagID: string,
		userID: string,
	}>;
	handlerHeaderPopup: (name: string) => void;
	handlerCurrentValue: (name: string, value: string) => void;
	handlerValueFilters: (filter: string, id: string) => void;
	resetHighlightItem: (elem: any, nameElem: string) => void;
	countQualityItems: (nameArray: string, nameFilter: string) => number;
}

let listTags: any = <h3>{ERROR_TEXT}</h3>

export const SideBarTags: React.FC<ISideBarTagsProps> = props => {
	const {
		tags,
		handlerHeaderPopup,
		handlerCurrentValue,
		resetHighlightItem,
		handlerValueFilters,
		countQualityItems,
	} = props
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
									handlerHeaderPopup(HEADER_EDIT_TAG)
									// сохраняем _id удаляемой Tag
									handlerCurrentValue("saveIdEditedTag", item._id)
									$("#modal-editTag").modal("show")
								}}
							/>{" "}
							<i
								className="fas fa-trash-alt text-danger"
								onClick={() => {
									handlerHeaderPopup(HEADER_REMOVE_TAG)
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
							handlerHeaderPopup(HEADER_ADD_TAG)
							$("#modal-addTag").modal("show")
						}}
						className="btn btn-outline-success btn-sm"
					>
						Add Tag
					</button>
					<button
						onClick={() => {
							handlerHeaderPopup(HEADER_ADD_NOTE)
							$("#modal-addNote").modal("show")
						}}
						className="btn btn-outline-info btn-sm rounded"
					>
						Add Note
					</button>
				</span>
			</li>
			<li className="nav-item d-flex justify-content-between item-active">
				<span
					className="nav-link"
					onClick={ev => {
						resetHighlightItem(ev.target, "")
						handlerValueFilters("filterTag", "All")
					}}
				>
					All
				</span>
				<span className="nav-link">
					{countQualityItems("tagBarNotes", "All")}
				</span>
			</li>
			<li className="nav-item d-flex justify-content-between">
				<span
					className="nav-link"
					onClick={ev => {
						resetHighlightItem(ev.target, "")
						handlerValueFilters("filterTag", "Untagged")
					}}
				>
					Untagged
				</span>
				<span className="nav-link">
					{countQualityItems("tagBarNotes", "Untagged")}
				</span>
			</li>
			{listTags}
		</ul>
	)
}
