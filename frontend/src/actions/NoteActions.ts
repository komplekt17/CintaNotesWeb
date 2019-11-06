// добавление new note
const addNewNoteAction = (name: string) => {
	return {
		type: "ADD_NEW_TAG_ACTION",
		name,
	}
}

// редактирование note
const editNoteAction = (id: string) => {
	return {
		type: "EDIT_TAG_ACTION",
		id,
	}
}

export { addNewNoteAction, editNoteAction }
