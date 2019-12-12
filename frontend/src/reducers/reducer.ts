import $ from "jquery"
import {
	ICurrentDetails,
	IState,
	ISections,
	ITags,
	INotes,
} from "../types"

export const initialState = {
	auth: false,
	namePopup: "",
	textMessage: "",
	loading: false,
	loaded: false,
	error: null,
	filters: { sections: "All", tags: "All" },
	currentDetails: {
		section: { id: "", nameSection: "", userId: "" },
		tag: { id: "", nameTag: "", sectionId: "", userId: "" },
		note: {
			id: "",
			header: "",
			text: "",
			remarks: "",
			link: "",
			sectionId: "",
			tagId: "",
			userId: "",
			createdAt: "",
			updatedAt: "",
		},
		userProfile: {
			id: "1",
			login: "",
			pass: "",
			status: "user",
			lang: "en",
			theme: "night", // or light
		},
	},
	sections: [
		{ id: "1", nameSection: "Tab-1", userId: "1" },
		{ id: "2", nameSection: "Tab-2", userId: "1" },
		{ id: "3", nameSection: "Tab-3", userId: "1" },
	],
	tags: [
		{ id: "1", nameTag: "audiobooks", userId: "1", sectionId: "1" },
		{ id: "2", nameTag: "webgames", userId: "1", sectionId: "2" },
		{ id: "3", nameTag: "programs", userId: "1", sectionId: "3" },
	],
	notes: [
		{
			id: "1",
			header: "aud-1",
			text:
				"<h3>txt-aud-1.</h3> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nostrum at, itaque error perferendis necessitatibus. At ut dolorum velit, officiis rerum vel impedit repellendus consequatur doloribus rem beatae! Illo, delectus!</p>",
			remarks: "",
			link: "",
			sectionId: "1",
			tagId: "1",
			userId: "1",
			createdAt: "20.10.2019, 11:34",
			updatedAt: "21.10.2019, 12:31",
		},
		{
			id: "2",
			header: "aud-2",
			text:
				"<h3>txt-aud-2.</h3> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nostrum at, itaque error perferendis necessitatibus. At ut dolorum velit, officiis rerum vel impedit repellendus consequatur doloribus rem beatae! Illo, delectus!</p>",
			remarks: "",
			link: "",
			sectionId: "1",
			tagId: "1",
			userId: "1",
			createdAt: "21.10.2019, 11:31",
			updatedAt: "22.10.2019, 13:31",
		},
		{
			id: "3",
			header: "web-1",
			text:
				"<h3>txt-web-1.</h3> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nostrum at, itaque error perferendis necessitatibus. At ut dolorum velit, officiis rerum vel impedit repellendus consequatur doloribus rem beatae! Illo, delectus!</p>",
			remarks: "",
			link: "",
			sectionId: "2",
			tagId: "2",
			userId: "1",
			createdAt: "23.10.2019, 10:34",
			updatedAt: "24.10.2019, 12:11",
		},
		{
			id: "4",
			header: "web-2",
			text:
				"<h3>txt-web-2.</h3> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nostrum at, itaque error perferendis necessitatibus. At ut dolorum velit, officiis rerum vel impedit repellendus consequatur doloribus rem beatae! Illo, delectus!</p>",
			remarks: "",
			link: "",
			sectionId: "2",
			tagId: "2",
			userId: "1",
			createdAt: "22.10.2019, 10:34",
			updatedAt: "23.10.2019, 10:36",
		},
		{
			id: "5",
			header: "pro-1",
			text:
				"<h3>txt-pro-1.</h3> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nostrum at, itaque error perferendis necessitatibus. At ut dolorum velit, officiis rerum vel impedit repellendus consequatur doloribus rem beatae! Illo, delectus!</p>",
			remarks: "",
			link: "",
			sectionId: "3",
			tagId: "3",
			userId: "1",
			createdAt: "20.10.2019, 11:34",
			updatedAt: "21.10.2019, 12:31",
		},
		{
			id: "6",
			header: "pro-2",
			text:
				"<h3>txt-pro-2.</h3> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nostrum at, itaque error perferendis necessitatibus. At ut dolorum velit, officiis rerum vel impedit repellendus consequatur doloribus rem beatae! Illo, delectus!</p>",
			remarks: "",
			link: "",
			sectionId: "3",
			tagId: "3",
			userId: "1",
			createdAt: "23.10.2019, 10:31",
			updatedAt: "25.10.2019, 15:33",
		},
		{
			id: "7",
			header: "Untagged-2",
			text:
				"<h4>Untagged-2.</h4> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nostrum at, itaque error perferendis necessitatibus. At ut dolorum velit, officiis rerum vel impedit repellendus consequatur doloribus rem beatae! Illo, delectus!</p>",
			remarks: "",
			link: "",
			sectionId: "0",
			tagId: "0",
			userId: "1",
			createdAt: "23.10.2019, 10:31",
			updatedAt: "25.10.2019, 15:33",
		},
		{
			id: "8",
			header: "Untagged-3",
			text:
				"<h4>Untagged-3.</h4> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nostrum at, itaque error perferendis necessitatibus. At ut dolorum velit, officiis rerum vel impedit repellendus consequatur doloribus rem beatae! Illo, delectus!</p>",
			remarks: "",
			link: "",
			sectionId: "0",
			tagId: "0",
			userId: "1",
			createdAt: "23.10.2019, 10:31",
			updatedAt: "25.10.2019, 15:33",
		},
	],
}

// генератор случайного Id
const idRand = (): string => {
	const id = Math.random()
	return id.toString()
}

// обработчик значений фильтров
const handlerFiltersValue = (
	state: IState,
	filter: string,
	id: string
): {
	sections: string,
	tags: string,
} => {
	const obj = state.filters
	if (filter === "filterSection") {
		for (const key in obj) {
			if (key === "sections") obj[key] = id
			else if (key === "tags") obj[key] = "All"
		}
	} else if (filter === "filterTag") {
		for (const key in obj) {
			if (key === "tags") {
				obj[key] = id
			}
		}
	}
	return obj
}

// универсальный обработчик разных значений input'ов для currentDetails
const handlerCurrentDetails = (
	state: IState,
	name: string,
	value?: any
): ICurrentDetails => {
	// console.log(name, value)
	let obj = state.currentDetails

	// ------- ОБРАБОТЧИКИ СВОЙСТВ currentDetails.section -------

	// сохраняем value input добавляемой или редактируемой section
	if (name === "addNameSection" || name === "editNameSection") {
		obj = getNewObjDetails(obj, "section", "nameSection", value)
	}
	// сохраняем id удаляемой или редактируемой section
	else if (
		name === "saveIdRemovedSection" ||
		name === "saveIdEditedSection"
	) {
		obj = getNewObjDetails(obj, "section", "id", value)
	}
	// очищаем поля section'а в currentDitails.section,
	// если Section added, edited or removed
	else if (
		name === "buttonAddSection" ||
		name === "buttonEditSection" ||
		name === "buttonRemoveSection"
	) {
		obj = getNewObjDetails(obj, "section", "id", (value = ""))
		obj = getNewObjDetails(obj, "section", "nameSection", (value = ""))
	}

	// ------- ОБРАБОТЧИКИ СВОЙСТВ currentDetails.tag -------

	// сохраняем данные редактируемого tag'а в currentDitails.tag
	else if (name === "saveIdEditedTag") {
		// сохраняем id редактируемого tag'а
		obj = getNewObjDetails(obj, "tag", "id", value)
		// находим по id данные редактируемого tag'а
		const arr = state.tags.slice()
		// получаем index элемента массива tags с id === value
		const index = arr.findIndex(param => param.id === value)
		// получаем значения свойства найденного tag'а
		const nameTag = arr[index].nameTag
		const sectionId = arr[index].sectionId
		const userId = arr[index].userId
		// сохраняем значения полей найденного tag'а в currentDitails.tag
		obj = getNewObjDetails(obj, "tag", "nameTag", nameTag)
		obj = getNewObjDetails(obj, "tag", "sectionId", sectionId)
		obj = getNewObjDetails(obj, "tag", "userId", userId)
	}

	// сохраняем value input'a редактируемого поля nameTage
	else if (name === "editNameTag") {
		obj = getNewObjDetails(obj, "tag", "nameTag", value)
	}

	// сохраняем value select'a редактируемого поля sectionId
	else if (name === "editTagSectionId") {
		obj = getNewObjDetails(obj, "tag", "sectionId", value)
	}

	// сохраняем id удаляемого tag
	else if (name === "saveIdRemovedTag") {
		obj = getNewObjDetails(obj, "tag", "id", value)
	}

	// очищаем поля tag'а в currentDitails.tag,
	// когда tag removed или edited
	else if (name === "buttonEditTag" || name === "buttonRemoveTag") {
		obj = getNewObjDetails(obj, "tag", "id", (value = ""))
		obj = getNewObjDetails(obj, "tag", "nameTag", (value = ""))
		obj = getNewObjDetails(obj, "tag", "sectionId", (value = ""))
		// obj = getNewObjDetails(obj, "tag", "userId", (value = ""))
	}

	// ------- ОБРАБОТЧИКИ СВОЙСТВ currentDetails.note -------

	// сохраняем данные редактируемого note'а в currentDitails.note
	else if (name === "saveIdEditedNote") {
		// сохраняем id редактируемой note'а
		obj = getNewObjDetails(obj, "note", "id", value)
		// находим по id данные редактируемой note'а
		const arr = state.notes.slice()
		// получаем index элемента массива notes с id === value
		const index = arr.findIndex(param => param.id === value)
		// получаем значения свойства найденного note'а
		const header = arr[index].header
		const text = arr[index].text
		const remarks = arr[index].remarks
		const link = arr[index].link
		const sectionId = arr[index].sectionId
		const tagId = arr[index].tagId
		const userId = arr[index].userId
		// сохраняем значения полей найденного note'а в currentDitails.note
		obj = getNewObjDetails(obj, "note", "header", header)
		obj = getNewObjDetails(obj, "note", "text", text)
		obj = getNewObjDetails(obj, "note", "remarks", remarks)
		obj = getNewObjDetails(obj, "note", "link", link)
		obj = getNewObjDetails(obj, "note", "sectionId", sectionId)
		obj = getNewObjDetails(obj, "note", "tagId", tagId)
		obj = getNewObjDetails(obj, "note", "userId", userId)
	}

	// сохраняем value input'a редактируемого поля header
	else if (name === "editHeaderNote") {
		obj = getNewObjDetails(obj, "note", "header", value)
	}

	// сохраняем value textarea редактируемого поля text
	else if (name === "editTextNote") {
		obj = getNewObjDetails(obj, "note", "text", value)
	}

	// сохраняем value input'a редактируемого поля remarks
	else if (name === "editRemarksNote") {
		obj = getNewObjDetails(obj, "note", "remarks", value)
	}

	// сохраняем value input'a редактируемого поля link
	else if (name === "editLinkNote") {
		obj = getNewObjDetails(obj, "note", "link", value)
	}

	// сохраняем value select'a редактируемого поля sectionId
	else if (name === "editNoteSectionId") {
		obj = getNewObjDetails(obj, "note", "sectionId", value)
	}

	// сохраняем value select'a редактируемого поля tagId
	else if (name === "editNoteTagId") {
		obj = getNewObjDetails(obj, "note", "tagId", value)
	}

	// сохраняем id удаляемоой note
	else if (name === "saveIdRemovedNote") {
		obj = getNewObjDetails(obj, "note", "id", value)
	}

	// очищаем поля note'а в currentDitails.note,
	// когда note removed или edited
	else if (name === "buttonEditNote" || name === "buttonRemoveNote") {
		obj = getNewObjDetails(obj, "note", "id", (value = ""))
		obj = getNewObjDetails(obj, "note", "header", (value = ""))
		obj = getNewObjDetails(obj, "note", "text", (value = ""))
		obj = getNewObjDetails(obj, "note", "remarks", (value = ""))
		obj = getNewObjDetails(obj, "note", "link", (value = ""))
		obj = getNewObjDetails(obj, "note", "sectionId", (value = ""))
		obj = getNewObjDetails(obj, "note", "tagId", (value = ""))
		obj = getNewObjDetails(obj, "note", "userId", (value = ""))
	}

	// ------- ОБРАБОТЧИКИ СВОЙСТВ currentDetails.user -------

	// сохраняем данные User'а при входе/регистрации в профиль
	else if (name === "userData") {
		// деструктурируем value, т.к. в данном случае
		// value = user{login, pass}
		const { id, login, pass, status, lang, theme } = value
		// обновляем значения полей
		obj = getNewObjDetails(obj, "userProfile", "id", id)
		obj = getNewObjDetails(obj, "userProfile", "login", login)
		obj = getNewObjDetails(obj, "userProfile", "pass", pass)
		obj = getNewObjDetails(obj, "userProfile", "status", status)
		obj = getNewObjDetails(obj, "userProfile", "lang", lang)
		obj = getNewObjDetails(obj, "userProfile", "theme", theme)
	}

	// удаляем данные User'а при выходе из профиля
	else if (name === "userLogOut") {
		// обновляем поле login
		obj = getNewObjDetails(obj, "userProfile", "login", (value = ""))
		// обновляем поле pass
		obj = getNewObjDetails(obj, "userProfile", "pass", (value = ""))
	}

	// смена языковой локализации User'а при клике EN/RU
	else if (name === "userLang") {
		// обновляем поле lang
		obj = getNewObjDetails(obj, "userProfile", "lang", value)
	}

	// смена интерфейса темы User'а при клике moon/sun
	else if (name === "userTheme") {
		// обновляем поле theme
		obj = getNewObjDetails(obj, "userProfile", "theme", value)
	}

	return obj
}

// универсальный переборщик любых свойств currentDetails
const getNewObjDetails = (
	obj: any,
	keyName: string,
	innerKeyName: string,
	value: string
): ICurrentDetails => {
	// перебираем свойства-объекты currentDetails и при совпадении имён полей
	// присваиваем полю новое значение value
	// перебор полей объкта currentDetails
	for (const key in obj) {
		if (key === keyName) {
			const innerObj = obj[key]
			// перебор полей объкта section
			for (const innerKey in innerObj) {
				if (innerKey === innerKeyName) {
					innerObj[innerKey] = value
				}
			}
		}
	}
	return obj
}

// добавление newItem for sections, tags and notes
const addingItem = (
	state: IState,
	nameItem: string,
	params: {
		id?: any,
		nameSection?: any, // for sections
		nameTag?: any, // for tags
		sectionId?: any, // for tags and notes
		header?: any, // for notes
		text?: any, // for notes
		remarks?: any, // for notes
		link?: any, // for notes
		tagId?: any, // for notes
		userId?: any, // for sections, tags and notes
		createdAt?: any, // for sections, tags and notes
		updatedAt?: any, // for sections, tags and notes
	}
): any => {
	if (nameItem === "addSection") {
		const arr = state.sections.slice()
		const obj = {
			id: params.id,
			nameSection: params.nameSection,
			userId: params.userId,
		}
		arr.push(obj)
		return arr
	} else if (nameItem === "addTag") {
		const arr = state.tags.slice()
		const obj = {
			id: idRand(),
			nameTag: params.nameTag,
			userId: state.currentDetails.userProfile.id,
			sectionId: params.sectionId,
		}
		arr.push(obj)
		return arr
	} else if (nameItem === "addNote") {
		const arr = state.notes.slice()
		const obj = {
			id: idRand(),
			header: params.header,
			text: params.text,
			remarks: params.remarks,
			link: params.link,
			userId: state.currentDetails.userProfile.id,
			sectionId: params.sectionId,
			tagId: params.tagId,
			createdAt: "2019-12-10T12:13:40.124Z",
			updatedAt: "2019-12-10T12:13:40.124Z",
		}
		arr.push(obj)
		return arr
	}
}

// редактирование Item for sections, tags and notes
const editingItem = (
	state: IState,
	nameItem: string,
	params: {
		id: string,
		nameSection?: any, // for sections
		nameTag?: any, // for tags
		sectionId?: any, // for tags and notes
		header?: any, // for notes
		text?: any, // for notes
		remarks?: any, // for notes
		link?: any, // for notes
		tagId?: any, // for notes
		userId?: any, // for notes
		createdAt?: any, // for sections, tags and notes
		updatedAt?: any, // for sections, tags and notes
	}
): any => {
	if (nameItem === "editSection") {
		const arr = state.sections.slice()
		// получаем index элемента массива sections с id === id
		const index = arr.findIndex(param => param.id === params.id)
		// присваиваем новое значение полю section.nameSection
		arr[index].nameSection = params.nameSection
		// присваиваем новое значение полю section.userId
		arr[index].userId = params.userId

		return arr
	} else if (nameItem === "editTag") {
		const arr = state.tags.slice()
		// получаем index элемента массива tags с id === id
		const index = arr.findIndex(param => param.id === params.id)
		// присваиваем новое значение полю tag.nameTag
		arr[index].nameTag = params.nameTag
		// присваиваем новое значение полю tag.sectionId
		arr[index].sectionId = params.sectionId

		return arr
	} else if (nameItem === "editNote") {
		const arr = state.notes.slice()
		// получаем index элемента массива notes с id === id
		const index = arr.findIndex(param => param.id === params.id)
		// присваиваем новое значение полю note.header
		arr[index].header = params.header
		// присваиваем новое значение полю note.text
		arr[index].text = params.text
		// присваиваем новое значение полю note.remarks
		arr[index].remarks = params.remarks
		// присваиваем новое значение полю note.link
		arr[index].link = params.link
		// присваиваем новое значение полю note.sectionId
		arr[index].sectionId = params.sectionId
		// присваиваем новое значение полю note.tagId
		arr[index].tagId = params.tagId

		return arr
	}
}

// удаление Item for sections, tags and notes
const removingItem = (
	state: IState,
	nameItem: string,
	id: string
): ISections[] | ITags[] | INotes[] | undefined => {
	if (nameItem === "Section") {
		const arr = state.sections.slice()
		// находим section с id === idx
		for (let i: number = 0; i < arr.length; i++) {
			// вырезаем элемент
			if (arr[i].id === id) arr.splice(i, 1)
		}
		return arr
	} else if (nameItem === "Tag") {
		const arr = state.tags.slice()
		// находим tag с id === idx
		for (let i: number = 0; i < arr.length; i++) {
			// вырезаем элемент
			if (arr[i].id === id) arr.splice(i, 1)
		}
		return arr
	} else if (nameItem === "Note") {
		const arr = state.notes.slice()
		// находим note с id === idx
		for (let i: number = 0; i < arr.length; i++) {
			// вырезаем элемент
			if (arr[i].id === id) arr.splice(i, 1)
		}
		return arr
	}
}

// перемещение notes в Untagged,
// если удаляется родительский tag/section
const transplaceNotes = (
	state: IState,
	nameItem: string,
	idItem: any
): INotes[] => {
	// для массива notes[]
	const arr = state.notes.slice()
	// при удалении tag
	if (nameItem === "Tag") {
		for (let i = 0; i < arr.length; i++) {
			// если note относится к id удаляемому tag
			if (arr[i].tagId === idItem) {
				// тогда переносим эту note в Untagged
				arr[i].tagId = "0"
			}
		}
	}
	// при удалении section
	else if (nameItem === "Section") {
		for (let i = 0; i < arr.length; i++) {
			// если note относится к id удаляемой section
			if (arr[i].sectionId === idItem) {
				// тогда переносим эту note в Untagged
				arr[i].tagId = "0"
				// и переносим эту note в All sections
				arr[i].sectionId = "0"
			}
		}
	}
	// при перемещении tag в другую section
	else if (nameItem === "editTag") {
		for (let i = 0; i < arr.length; i++) {
			// если note относится к id редактируемого tag
			if (arr[i].tagId === idItem.id) {
				// перемещаем notes в секцию тега
				arr[i].sectionId = idItem.sectionId
			}
		}
	}
	return arr
}

// перемещение tags в All
const transplaceTags = (state: IState, idItem: string): ITags[] => {
	const arr = state.tags.slice()
	for (let i = 0; i < arr.length; i++) {
		// если tag относится к id удаляемой section
		if (arr[i].sectionId === idItem) {
			// переносим этот tag в All sections
			arr[i].sectionId = "0"
		}
	}
	return arr
}

export const Reducer = (state: IState = initialState, action: any) => {
	switch (action.type) {
		case "LOAD_REQUESTED_DATA_ACTION":
			return {
				...state,
				loading: true,
				loaded: false,
			}

		case "LOAD_FAILURE_DATA_ACTION":
			// $("#modal-alert").modal("show");
			console.log(action.error)
			return {
				...state,
				loading: false,
				loaded: true,
				error: action.error,
				namePopup: action.message,
			}

		case "GET_DATA_BY_LOGIN_ACTION":
			// console.log(action.result.sections)
			return {
				...state,
				sections: action.result.sections,
				tags: action.result.tags,
				notes: action.result.notes,
				currentDetails: handlerCurrentDetails(
					state,
					"userData",
					action.result.user
				),
				loading: false,
				loaded: true,
				auth: !state.auth,
			}

		case "CREATE_NEW_USER_ACTION":
			return {
				...state,
				currentDetails: handlerCurrentDetails(
					state,
					"userData",
					action.result.data
				),
				loading: false,
				loaded: true,
				textMessage: action.result.message,
				auth: !state.auth,
			}

		case "USER_LOGOUT_ACTION":
			return {
				...state,
				auth: !state.auth,
				loading: false,
				loaded: true,
				currentDetails: handlerCurrentDetails(state, "userLogOut"),
			}

		case "HANDLER_VALUE_INPUTS_ACTION":
			// console.log(action.name, action.value)
			return {
				...state,
				currentDetails: handlerCurrentDetails(
					state,
					action.name,
					action.value
				),
			}

		case "HANDLER_HEADER_POPUP_ACTION":
			return {
				...state,
				namePopup: action.header,
			}

		case "HANDLER_LANG_LOCAL_ACTION":
			return {
				...state,
				currentDetails: handlerCurrentDetails(state, "userLang", action.lang),
			}

		case "HANDLER_USER_THEME_ACTION":
			return {
				...state,
				currentDetails: handlerCurrentDetails(
					state,
					"userTheme",
					action.theme
				),
			}

		case "HANDLER_VALUE_FILTERS_ACTION":
			return {
				...state,
				filters: handlerFiltersValue(state, action.filter, action.id),
			}

		// ======= SECTIONS =======

		case "ADD_NEW_SECTION_ACTION":
			const addSectionParams = {
				id: action.result.data.id,
				nameSection: action.result.data.nameSection,
				userId: action.result.data.userId,
				createdAt: action.result.data.createdAt,
				updatedAt: action.result.data.updatedAt,
			}
			return {
				...state,
				sections: addingItem(state, "addSection", addSectionParams),
				textMessage: action.result.message,
				loading: false,
				loaded: true,
			}

		case "EDIT_SECTION_ACTION":
			const editSectionParams = {
				id: action.result.data.id,
				nameSection: action.result.data.nameSection,
				userId: action.result.data.userId,
				createdAt: action.result.data.createdAt,
				updatedAt: action.result.data.updatedAt,
			}
			return {
				...state,
				sections: editingItem(state, "editSection", editSectionParams),
				textMessage: action.result.message,
				loading: false,
				loaded: true,
			}

		case "REMOVE_ANY_ITEM_ACTION":
			$("#modal-removeItem").modal("hide")
			if (action.name === "Section") {
				return {
					...state,
					sections: removingItem(state, action.name, action.id),
					tags: transplaceTags(state, action.id),
					notes: transplaceNotes(state, action.name, action.id),
					filters: { sections: "All", tags: "All" },
				}
			} else if (action.name === "Tag") {
				return {
					...state,
					tags: removingItem(state, action.name, action.id),
					notes: transplaceNotes(state, action.name, action.id),
					filters: { sections: state.filters.sections, tags: "All" },
				}
			} else if (action.name === "Note") {
				return {
					...state,
					notes: removingItem(state, action.name, action.id),
				}
			}

		// ======= END SECTIONS =======

		// ======= TAGS =======
		// eslint-disable-next-line
		case "ADD_NEW_TAG_ACTION":
			const addTagParams = {
				id: action.result.data.id,
				nameTag: action.result.data.nameTag,
				sectionId: action.result.data.sectionId,
				userId: action.result.data.userId,
				createdAt: action.result.data.createdAt,
				updatedAt: action.result.data.updatedAt,
			}
			return {
				...state,
				tags: addingItem(state, "addTag", addTagParams),
				textMessage: action.result.message,
				loading: false,
				loaded: true,
			}

		case "EDIT_TAG_ACTION":
			const editTagParams = {
				id: action.result.data.id,
				nameTag: action.result.data.nameTag,
				sectionId: action.result.data.sectionId,
				userId: action.result.data.userId,
				createdAt: action.result.data.createdAt,
				updatedAt: action.result.data.updatedAt,
			}
			return {
				...state,
				tags: editingItem(state, "editTag", editTagParams),
				notes: transplaceNotes(state, "editTag", action.result.data),
				textMessage: action.result.message,
				loading: false,
				loaded: true,
			}
		// ======= END TAGS =======

		// ======= NOTES =======
		case "ADD_NEW_NOTE_ACTION":
			console.log(action.result.data)
			const addNoteParams = {
				id: action.result.data.id,
				header: action.result.data.header,
				text: action.result.data.text,
				remarks: action.result.data.remarks,
				link: action.result.data.link,
				sectionId: action.result.data.sectionId,
				userId: action.result.data.userId,
				createdAt: action.result.data.createdAt,
				updatedAt: action.result.data.updatedAt,
			}
			return {
				...state,
				notes: addingItem(state, "addNote", addNoteParams),
				textMessage: action.result.message,
				loading: false,
				loaded: true,
			}

		case "EDIT_NOTE_ACTION":
			const editNoteParams = {
				id: action.result.data.id,
				header: action.result.data.header,
				text: action.result.data.text,
				remarks: action.result.data.remarks,
				link: action.result.data.link,
				sectionId: action.result.data.sectionId,
				userId: action.result.data.userId,
				createdAt: action.result.data.createdAt,
				updatedAt: action.result.data.updatedAt,
			}
			return {
				...state,
				notes: editingItem(state, "editNote", editNoteParams),
				textMessage: action.result.message,
				loading: false,
				loaded: true,
			}

		// ======= END NOTES =======

		default:
			return state
	}
}
