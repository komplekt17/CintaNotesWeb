import * as React from "react"
import $ from "jquery"
import { INotes, ITags } from "../types"
import { CONSTANTS } from "../constants"
import "../styles/ItemNotes.css"

interface INoteItemProps {
	tags: ITags[];
	notes: INotes[];
	lang: string;
	handlerHeaderPopup: (name: string) => void;
	handlerCurrentValue: (name: string, value: string) => void;
}

const ItemNotes: React.FC<INoteItemProps> = props => {
	const {
		tags,
		notes,
		lang,
		handlerHeaderPopup,
		handlerCurrentValue,
	} = props

	let NotesList: any = (
		<div className="col-12">{CONSTANTS[lang].ERROR_TEXT}</div>
	)
	// react editors examples
	// https://github.com/thibaudcolas/draftail-playground
	// https://draftjs.org/docs/getting-started
	// https://reactjsexample.com/tag/editor/
	// https://www.draftail.org/docs/importing-and-exporting-html

	// получение nameTag из tags[]
	const getNameTag = (tagIDfromNotes: string): string => {
		let nameTag = "Untagged"
		for (let i = 0; i < tags.length; i++) {
			if (tags[i]._id === tagIDfromNotes) {
				nameTag = tags[i].nameTag
			}
		}

		return nameTag
	}

	if (notes && notes.length !== 0) {
		NotesList = notes.map((item: any, index: number) => {
			return (
				<div key={index} className="col-12 note">
					<div className="note-header d-flex justify-content-between">
						<div className="note-name"> {item.header} </div>
						<div className="note-date">
							<i className="far fa-calendar-alt text-primary" />
							{"   "}
							{item.updatedAt}
							{"   "}|{"   "}
							<i className="fas fa-calendar-alt text-info" />
							{"   "}
							{item.createdAt}
						</div>
					</div>
					<div className="note-tag">
						<span className="text-primary border-primary">
							{getNameTag(item.tagID)}
						</span>
					</div>
					<div className="note-text">{item.text}</div>
					<div className="note-footer">
						<div className="note-date">
							<span
								className="text-success"
								onClick={() => {
									handlerHeaderPopup(CONSTANTS[lang].HEADER_EDIT_NOTE)
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
									handlerHeaderPopup(CONSTANTS[lang].HEADER_REMOVE_NOTE)
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
