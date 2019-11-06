// обработка input'ов
const handlerCurrentValueAction = (name: string, value: string) => {
	return {
		type: "HANDLER_VALUE_INPUTS_ACTION",
		name,
		value,
	}
}

// обработка заголовков PopupWindows
const handlerHeaderPopupAction = (header: string) => {
	return {
		type: "HANDLER_HEADER_POPUP_ACTION",
		header,
	}
}

// обработчик языковой локализации
const handlerLangAction = (lang: string) => {
	return {
		type: "HANDLER_LANG_LOCAL_ACTION",
		lang,
	}
}

// обработчик темы день/ночь
const handlerThemaAction = (theme: string) => {
	return {
		type: "HANDLER_USER_THEME_ACTION",
		theme,
	}
}

export {
	handlerCurrentValueAction,
	handlerHeaderPopupAction,
	handlerLangAction,
	handlerThemaAction,
}
