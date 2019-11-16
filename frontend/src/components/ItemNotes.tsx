import * as React from "react"
import $ from "jquery"
import { INotes } from "../types"
import {
	ERROR_TEXT,
	HEADER_EDIT_NOTE,
	HEADER_REMOVE_NOTE,
} from "../constants"
import "../styles/ItemNotes.css"

interface INoteItemProps {
	notes: INotes[];
	handlerHeaderPopup: (name: string) => void;
	handlerCurrentValue: (name: string, value: string) => void;
}

let NotesList: any = <h3>{ERROR_TEXT}</h3>

const ItemNotes: React.FC<INoteItemProps> = props => {
	const { notes, handlerHeaderPopup, handlerCurrentValue } = props

	if (notes && notes.length !== 0) {
		NotesList = notes.map((item: any, index: number) => {
			return (
				<div key={index} className="col-12 note">
					<div className="note-header d-flex justify-content-between">
						<div className="note-name"> {item.header} </div>
						<div className="note-date">
							<i className="far fa-calendar-alt text-primary" />
							{"   "}
							{item.dateModified}
							{"   "}|{"   "}
							<i className="fas fa-calendar-alt text-info" />
							{"   "}
							{item.dateCreated}
						</div>
					</div>
					<div className="note-tag">
						<span className="text-primary border-primary">{item.tagID}</span>
					</div>
					<div className="note-text">{item.text}</div>
					<div className="note-footer">
						<div className="note-date">
							<span
								className="text-success"
								onClick={() => {
									handlerHeaderPopup(HEADER_EDIT_NOTE)
									// сохраняем _id удаляемой Note
									handlerCurrentValue("saveIdEditedNote", item._id)
									$("#modal-editNote").modal("show")
								}}
							>
								<i className="fas fa-edit" />
							</span>
							{"  "}
							<span
								className="text-danger"
								onClick={() => {
									handlerHeaderPopup(HEADER_REMOVE_NOTE)
									// сохраняем _id удаляемой Note
									handlerCurrentValue("saveIdRemovedNote", item._id)
									$("#modal-removeItem").modal("show")
								}}
							>
								<i className="fas fa-trash-alt" />
							</span>
						</div>
					</div>
				</div>
			)
		})
	}
	return <>{NotesList}</>
}

export { ItemNotes }
