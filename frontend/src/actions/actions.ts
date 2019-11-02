const getAllNotesAction = () => {
	return {
		type: "GET_ALL_NOTES_ACTION",
		text: "Hello, cintanotes",
	}
}

const handlerInputsValueAction = (name: string, value: string) => {
	return {
		type: "HANDLER_INPUTS_VALUE_ACTION",
		name,
		value,
	}
}

const addNewSectionAction = (name: string) => {
	return {
		type: "ADD_NEW_SECTION_ACTION",
		name,
	}
}

export { getAllNotesAction, addNewSectionAction, handlerInputsValueAction }
