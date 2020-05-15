// обработка input'ов
const handlerCurrentValueAction = (name: string, value: string) => {
	return {
		type: "HANDLER_VALUE_INPUTS_ACTION",
		name,
		value,
	}
}

// обработка заголовков PopupWindows and alerts in demoMode
const handlerHeaderPopupAction = (
	header: string,
	category?: string,
	message?: string
) => {
	return {
		type: "HANDLER_HEADER_POPUP_ACTION",
		header,
		category,
		message,
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
const handlerThemeAction = (theme: string) => {
	return {
		type: "HANDLER_USER_THEME_ACTION",
		theme,
	}
}

// обработчик значений фильтров
const handlerValueFiltersAction = (filter: string, id: string) => {
	return {
		type: "HANDLER_VALUE_FILTERS_ACTION",
		filter,
		id,
	}
}

export {
	handlerCurrentValueAction,
	handlerHeaderPopupAction,
	handlerLangAction,
	handlerThemeAction,
	handlerValueFiltersAction,
}
