const getAllNotesAction = () => {
	return {
		type: "GET_ALL_NOTES_ACTION",
		text: "Hello, cintanotes",
	}
}

const handlerInputsValueAction = (name: string, value: string) => {
	return {
		type: "HANDLER_VALUE_INPUTS_ACTION",
		name,
		value,
	}
}

const handlerHeaderPopupAction = (header: string) => {
	return {
		type: "HANDLER_HEADER_POPUP",
		header,
	}
}

export {
	getAllNotesAction,
	handlerInputsValueAction,
	handlerHeaderPopupAction,
}
