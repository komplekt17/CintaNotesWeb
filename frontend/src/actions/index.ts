const getAllNotesAction = () => {
	return {
		type: "GET_ALL_NOTES_ACTION",
		text: "Hello, cintanotes",
	}
}

const addNewSectionAction = (text: string) => {
	return {
		type: "ADD_NEW_SECTION_ACTION",
		text,
	}
}

export { getAllNotesAction, addNewSectionAction }
