// получение данных с сервера
const getAllNotesAction = () => {
	return {
		type: "GET_ALL_NOTES_ACTION",
		text: "Hello, cintanotes",
	}
}

// обработка input'ов
const handlerInputsValueAction = (name: string, value: string) => {
	return {
		type: "HANDLER_VALUE_INPUTS_ACTION",
		name,
		value,
	}
}

// обработка заголовков PopupWindows
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
