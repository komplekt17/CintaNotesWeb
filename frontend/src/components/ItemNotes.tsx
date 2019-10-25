import * as React from "react"
import { ERROR_TEXT } from "../constants"
import "../styles/ItemNotes.css"

interface INoteItemProps {
	notes: any;
}

let NotesList = <h3>{ERROR_TEXT}</h3>

const ItemNotes: React.FC<INoteItemProps> = ({ notes }) => {
	if (notes && notes.length !== 0) {
		NotesList = notes.map((item: any, index: number) => {
			return (
				<div key={index} className="col-12 note">
					<div className="note-header d-flex justify-content-between">
						<div className="note-name"> {item.header} </div>
						<div className="note-date"> {item.dateCreated} </div>
					</div>
					<div className="note-text">{item.text}</div>
					<div className="note-footer">
						<div className="note-date">
							<span onClick={() => {}}> Edit </span>
						</div>
					</div>
				</div>
			)
		})
	}
	return <>{NotesList}</>
}

export { ItemNotes }
