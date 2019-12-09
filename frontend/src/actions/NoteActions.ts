// добавление new note
const addNewNoteAction = (newNote: {
	header: string,
	text: string,
	remarks: string,
	link: string,
	sectionID: string,
	tagID: string,
}) => {
	return {
		type: "ADD_NEW_NOTE_ACTION",
		newNote,
	}
}

// редактирование note
const editNoteAction = (editedNote: {
	id: string,
	header: string,
	text: string,
	remarks: string,
	link: string,
	sectionID: string,
	tagID: string,
}) => {
	return {
		type: "EDIT_NOTE_ACTION",
		editedNote,
	}
}

export { addNewNoteAction, editNoteAction }