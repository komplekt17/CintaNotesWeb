const addNewNoteAction = (name: string) => {
	return {
		type: "ADD_NEW_TAG_ACTION",
		name,
	}
}

const editNoteAction = (idx: string) => {
	return {
		type: "EDIT_TAG_ACTION",
		idx,
	}
}

const removeNoteAction = (idx: string) => {
	return {
		type: "REMOVE_TAG_ACTION",
		idx,
	}
}

export { addNewNoteAction, editNoteAction, removeNoteAction }
