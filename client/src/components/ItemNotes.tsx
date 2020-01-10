import * as React from "react"
import $ from "jquery"
import { INotes, ITags } from "../types"
import { CONSTANTS } from "../constants"
import "../styles/ItemNotes.sass"

interface INoteItemProps {
	tags: ITags[];
	notes: INotes[];
	lang: string;
	theme: string;
	handlerHeaderPopup: (name: string) => void;
	handlerCurrentValue: (name: string, value: string) => void;
}

const ItemNotes: React.FC<INoteItemProps> = props => {
	const {
		tags,
		notes,
		lang,
		theme,
		handlerHeaderPopup,
		handlerCurrentValue,
	} = props

	// получение отформатированной даты создания/редактирования
	const getDateNormed = (date: string): string => {
		// отрезаем перед . 2019-12-15T08:46:08.000Z
		const arrD = date.split(".")
		// отрезаем перед T 2019-12-15T08:46:08.000Z
		const arrT = arrD[0].split("T")
		// преобразуем дату к виду DD.MM.YYYY
		const arrR = arrT[0].split("-")
		const result = `${arrR[2]}.${arrR[1]}.${arrR[0]}, ${arrT[1]}`
		return result
	}

	let NotesList: any = (
		<div className="col-12">{CONSTANTS[lang].ERROR_TEXT}</div>
	)

	// получение nameTag из tags[]
	const getNameTag = (tagIdfromNotes: string): string => {
		let nameTag = "Untagged"
		for (let i = 0; i < tags.length; i++) {
			if (tags[i].id === tagIdfromNotes) {
				nameTag = tags[i].nameTag
			}
		}
		return nameTag
	}

	if (notes && notes.length !== 0) {
		NotesList = notes.map((item: any, index: number) => {
			return (
				<div key={index} className="col-12 note" id={item.id}>
					<div className={`note-header-${theme}`}>{item.header}</div>
					<div className="d-flex justify-content-between">
						<div className="note-tag d-flex justify-content-between">
							<div
								className="text-primary pr-2"
								onClick={() => {
									$(`#${item.id} .arrow-switch`).toggleClass("d-none", 2000)
									$(`#${item.id} .note-text`).toggleClass("note-text-short", 2000)
								}}
							>
								<i className="arrow-switch d-none fas fa-angle-double-down" />
								<i className="arrow-switch fas fa-angle-double-up" />
							</div>
							<div className="text-primary border-primary name-tag pl-2">
								{getNameTag(item.tagId)}
							</div>
						</div>
						<div className="note-date">
							{item.updatedAt === item.createdAt ? (
								""
							) : (
								<span>
									<i className="far fa-calendar-alt text-primary" title="updated" />
									{"   " + getDateNormed(item.updatedAt) + "   |   "}
								</span>
							)}
							<i className="fas fa-calendar-alt text-info" title="created" />
							{"   " + getDateNormed(item.createdAt)}
						</div>
					</div>
					<div
						className="note-text note-text-short p-2"
						dangerouslySetInnerHTML={{ __html: item.text }}
					/>
					<div className="note-footer">
						<div className="note-date">
							<span
								className="text-success"
								onClick={() => {
									handlerHeaderPopup(CONSTANTS[lang].HEADER_EDIT_NOTE)
									// сохраняем id удаляемой Note
									handlerCurrentValue("saveIdEditedNote", item.id)
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
									// сохраняем id удаляемой Note
									handlerCurrentValue("saveIdRemovedNote", item.id)
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
