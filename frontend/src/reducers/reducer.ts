import $ from "jquery"
import { ICurrentDetails, IState } from "../types"

export const initialState = {
	auth: false,
	namePopup: "",
	loading: false,
	loaded: false,
	error: null,
	filters: { sections: "All", tags: "All" },
	currentDetails: {
		section: { _id: "", nameSection: "" },
		tag: { _id: "", nameTag: "", userID: "", sectionID: "" },
		note: {
			_id: "",
			header: "",
			text: "",
			remarks: "",
			link: "",
			sectionID: "",
			tagID: "",
			userID: "",
			dateCreated: "",
			dateModified: "",
		},
		userProfile: {
			_id: "1",
			login: "",
			pass: "",
			status: "",
			lang: "EN",
			theme: "night",
		},
	},
	sections: [
		{ _id: "1", nameSection: "Tab-1", userID: "1" },
		{ _id: "2", nameSection: "Tab-2", userID: "1" },
		{ _id: "3", nameSection: "Tab-3", userID: "1" },
	],
	tags: [
		{ _id: "1", nameTag: "audiobooks", userID: "1", sectionID: "1" },
		{ _id: "2", nameTag: "webgames", userID: "1", sectionID: "2" },
		{ _id: "3", nameTag: "programs", userID: "1", sectionID: "3" },
	],
	notes: [
		{
			_id: "1",
			header: "aud-1",
			text:
				"txt-aud-1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nostrum at, itaque error perferendis necessitatibus. At ut dolorum velit, officiis rerum vel impedit repellendus consequatur doloribus rem beatae! Illo, delectus!",
			remarks: "",
			link: "",
			sectionID: "1",
			tagID: "1",
			userID: "1",
			dateCreated: "20.10.2019, 11:34",
			dateModified: "21.10.2019, 12:31",
		},
		{
			_id: "2",
			header: "aud-2",
			text:
				"txt-aud-2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nostrum at, itaque error perferendis necessitatibus. At ut dolorum velit, officiis rerum vel impedit repellendus consequatur doloribus rem beatae! Illo, delectus!",
			remarks: "",
			link: "",
			sectionID: "1",
			tagID: "1",
			userID: "1",
			dateCreated: "21.10.2019, 11:31",
			dateModified: "22.10.2019, 13:31",
		},
		{
			_id: "3",
			header: "web-1",
			text:
				"txt-web-1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nostrum at, itaque error perferendis necessitatibus. At ut dolorum velit, officiis rerum vel impedit repellendus consequatur doloribus rem beatae! Illo, delectus!",
			remarks: "",
			link: "",
			sectionID: "2",
			tagID: "2",
			userID: "1",
			dateCreated: "23.10.2019, 10:34",
			dateModified: "24.10.2019, 12:11",
		},
		{
			_id: "4",
			header: "web-2",
			text:
				"txt-web-2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nostrum at, itaque error perferendis necessitatibus. At ut dolorum velit, officiis rerum vel impedit repellendus consequatur doloribus rem beatae! Illo, delectus!",
			remarks: "",
			link: "",
			sectionID: "2",
			tagID: "2",
			userID: "1",
			dateCreated: "22.10.2019, 10:34",
			dateModified: "23.10.2019, 10:36",
		},
		{
			_id: "5",
			header: "pro-1",
			text:
				"txt-pro-1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nostrum at, itaque error perferendis necessitatibus. At ut dolorum velit, officiis rerum vel impedit repellendus consequatur doloribus rem beatae! Illo, delectus!",
			remarks: "",
			link: "",
			sectionID: "3",
			tagID: "3",
			userID: "1",
			dateCreated: "20.10.2019, 11:34",
			dateModified: "21.10.2019, 12:31",
		},
		{
			_id: "6",
			header: "pro-2",
			text:
				"txt-pro-2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nostrum at, itaque error perferendis necessitatibus. At ut dolorum velit, officiis rerum vel impedit repellendus consequatur doloribus rem beatae! Illo, delectus!",
			remarks: "",
			link: "",
			sectionID: "3",
			tagID: "3",
			userID: "1",
			dateCreated: "23.10.2019, 10:31",
			dateModified: "25.10.2019, 15:33",
		},
	],
}

// генератор случайного ID
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
	// сохраняем _id удаляемой или редактируемой section
	else if (
		name === "saveIdRemovedSection" ||
		name === "saveIdEditedSection"
	) {
		obj = getNewObjDetails(obj, "section", "_id", value)
	}
	// очищаем поля section'а в currentDitails.section,
	// если Section added, edited or removed
	else if (
		name === "buttonAddSection" ||
		name === "buttonEditSection" ||
		name === "buttonRemoveSection"
	) {
		obj = getNewObjDetails(obj, "section", "_id", (value = ""))
		obj = getNewObjDetails(obj, "section", "nameSection", (value = ""))
	}

	// ------- ОБРАБОТЧИКИ СВОЙСТВ currentDetails.tag -------

	// сохраняем данные редактируемого tag'а в currentDitails.tag
	else if (name === "saveIdEditedTag") {
		// сохраняем _id редактируемого tag'а
		obj = getNewObjDetails(obj, "tag", "_id", value)
		// находим по _id данные редактируемого tag'а
		const arr = state.tags.slice()
		// получаем index элемента массива tags с _id === value
		const index = arr.findIndex(param => param._id === value)
		// получаем значения свойства найденного tag'а
		const nameTag = arr[index].nameTag
		const sectionID = arr[index].sectionID
		// сохраняем значения полей найденного tag'а в currentDitails.tag
		obj = getNewObjDetails(obj, "tag", "nameTag", nameTag)
		obj = getNewObjDetails(obj, "tag", "sectionID", sectionID)
	}

	// сохраняем value input'a редактируемого поля nameTage
	else if (name === "editNameTag") {
		obj = getNewObjDetails(obj, "tag", "nameTag", value)
	}

	// сохраняем value select'a редактируемого поля sectionID
	else if (name === "editTagSectionID") {
		obj = getNewObjDetails(obj, "tag", "sectionID", value)
	}

	// сохраняем _id удаляемого tag
	else if (name === "saveIdRemovedTag") {
		obj = getNewObjDetails(obj, "tag", "_id", value)
	}

	// очищаем поля tag'а в currentDitails.tag,
	// когда tag removed или edited
	else if (name === "buttonEditTag" || name === "buttonRemoveTag") {
		obj = getNewObjDetails(obj, "tag", "_id", (value = ""))
		obj = getNewObjDetails(obj, "tag", "nameTag", (value = ""))
		obj = getNewObjDetails(obj, "tag", "sectionID", (value = ""))
	}

	// ------- ОБРАБОТЧИКИ СВОЙСТВ currentDetails.note -------

	// сохраняем данные редактируемого note'а в currentDitails.note
	else if (name === "saveIdEditedNote") {
		// сохраняем _id редактируемой note'а
		obj = getNewObjDetails(obj, "note", "_id", value)
		// находим по _id данные редактируемой note'а
		const arr = state.notes.slice()
		// получаем index элемента массива notes с _id === value
		const index = arr.findIndex(param => param._id === value)
		// получаем значения свойства найденного note'а
		const header = arr[index].header
		const text = arr[index].text
		const remarks = arr[index].remarks
		const link = arr[index].link
		const sectionID = arr[index].sectionID
		const tagID = arr[index].tagID
		// сохраняем значения полей найденного note'а в currentDitails.note
		obj = getNewObjDetails(obj, "note", "header", header)
		obj = getNewObjDetails(obj, "note", "text", text)
		obj = getNewObjDetails(obj, "note", "remarks", remarks)
		obj = getNewObjDetails(obj, "note", "link", link)
		obj = getNewObjDetails(obj, "note", "sectionID", sectionID)
		obj = getNewObjDetails(obj, "note", "tagID", tagID)
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

	// сохраняем value select'a редактируемого поля sectionID
	else if (name === "editNoteSectionID") {
		obj = getNewObjDetails(obj, "note", "sectionID", value)
	}

	// сохраняем value select'a редактируемого поля tagID
	else if (name === "editNoteTagID") {
		obj = getNewObjDetails(obj, "note", "tagID", value)
	}

	// сохраняем _id удаляемоой note
	else if (name === "saveIdRemovedNote") {
		obj = getNewObjDetails(obj, "note", "_id", value)
	}

	// очищаем поля note'а в currentDitails.note,
	// когда note removed или edited
	else if (name === "buttonEditNote" || name === "buttonRemoveNote") {
		obj = getNewObjDetails(obj, "note", "_id", (value = ""))
		obj = getNewObjDetails(obj, "note", "header", (value = ""))
		obj = getNewObjDetails(obj, "note", "text", (value = ""))
		obj = getNewObjDetails(obj, "note", "remarks", (value = ""))
		obj = getNewObjDetails(obj, "note", "link", (value = ""))
		obj = getNewObjDetails(obj, "note", "sectionID", (value = ""))
		obj = getNewObjDetails(obj, "note", "tagID", (value = ""))
	}

	// ------- ОБРАБОТЧИКИ СВОЙСТВ currentDetails.user -------

	// сохраняем данные User'а
	else if (name === "userData") {
		// деструктурируем value, т.к. в данном случае
		// value = user{login, pass}
		const { login, pass } = value
		// обновляем поле login
		obj = getNewObjDetails(obj, "userProfile", "login", login)
		// обновляем поле pass
		obj = getNewObjDetails(obj, "userProfile", "pass", pass)
	}

	// удаляем данные User'а
	else if (name === "userLogOut") {
		// обновляем поле login
		obj = getNewObjDetails(obj, "userProfile", "login", (value = ""))
		// обновляем поле pass
		obj = getNewObjDetails(obj, "userProfile", "pass", (value = ""))
	}

	return obj
}

// универсальный переборщик любых свойств currentDetails
const getNewObjDetails = (
	obj: any,
	keyName: string,
	innerKeyName: string,
	value: string
): any => {
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
		valueSection?: any, // for sections
		nameTag?: any, // for tags
		sectionID?: any, // for tags and notes
		header?: any, // for notes
		text?: any, // for notes
		remarks?: any, // for notes
		link?: any, // for notes
		tagID?: any, // for notes
		dateCreated?: string, // for notes
		dateModified?: string, // for notes
	}
): any => {
	if (nameItem === "addSection") {
		const arr = state.sections.slice()
		const obj = {
			_id: idRand(),
			nameSection: params.valueSection,
			userID: state.currentDetails.userProfile._id,
		}
		arr.push(obj)
		return arr
	} else if (nameItem === "addTag") {
		const arr = state.tags.slice()
		const obj = {
			_id: idRand(),
			nameTag: params.nameTag,
			userID: state.currentDetails.userProfile._id,
			sectionID: params.sectionID,
		}
		arr.push(obj)
		return arr
	} else if (nameItem === "addNote") {
		const arr = state.notes.slice()
		const obj = {
			_id: idRand(),
			header: params.header,
			text: params.text,
			remarks: params.remarks,
			link: params.link,
			userID: state.currentDetails.userProfile._id,
			sectionID: params.sectionID,
			tagID: params.tagID,
			dateCreated: "dateCreated",
			dateModified: "dateModified",
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
		sectionID?: any, // for tags and notes
		header?: any, // for notes
		text?: any, // for notes
		remarks?: any, // for notes
		link?: any, // for notes
		tagID?: any, // for notes
	}
): any => {
	if (nameItem === "editSection") {
		const arr = state.sections.slice()
		// получаем index элемента массива sections с _id === id
		const index = arr.findIndex(param => param._id === params.id)
		// присваиваем новое значение полю section.nameSection
		arr[index].nameSection = params.nameSection

		return arr
	} else if (nameItem === "editTag") {
		const arr = state.tags.slice()
		// получаем index элемента массива tags с _id === id
		const index = arr.findIndex(param => param._id === params.id)
		// присваиваем новое значение полю tag.nameTag
		arr[index].nameTag = params.nameTag
		// присваиваем новое значение полю tag.sectionID
		arr[index].sectionID = params.sectionID

		return arr
	} else if (nameItem === "editNote") {
		const arr = state.notes.slice()
		// получаем index элемента массива notes с _id === id
		const index = arr.findIndex(param => param._id === params.id)
		// присваиваем новое значение полю note.header
		arr[index].header = params.header
		// присваиваем новое значение полю note.text
		arr[index].text = params.text
		// присваиваем новое значение полю note.remarks
		arr[index].remarks = params.remarks
		// присваиваем новое значение полю note.link
		arr[index].link = params.link
		// присваиваем новое значение полю note.sectionID
		arr[index].sectionID = params.sectionID
		// присваиваем новое значение полю note.tagID
		arr[index].tagID = params.tagID

		return arr
	}
}

// удаление Item for sections, tags and notes
const removingItem = (
	state: IState,
	nameItem: string,
	id: string
): any => {
	if (nameItem === "Section") {
		const arr = state.sections.slice()
		// находим section с _id === idx
		for (let i: number = 0; i < arr.length; i++) {
			// вырезаем элемент
			if (arr[i]._id === id) arr.splice(i, 1)
		}
		return arr
	} else if (nameItem === "Tag") {
		const arr = state.tags.slice()
		// находим tag с _id === idx
		for (let i: number = 0; i < arr.length; i++) {
			// вырезаем элемент
			if (arr[i]._id === id) arr.splice(i, 1)
		}
		return arr
	} else if (nameItem === "Note") {
		const arr = state.notes.slice()
		// находим note с _id === idx
		for (let i: number = 0; i < arr.length; i++) {
			// вырезаем элемент
			if (arr[i]._id === id) arr.splice(i, 1)
		}
		return arr
	}
}

export const Reducer = (state: IState = initialState, action: any) => {
	switch (action.type) {
		case "GET_DATA_BY_LOGIN_ACTION":
			return {
				...state,
				loading: false,
				loaded: true,
				auth: !state.auth,
				currentDetails: handlerCurrentDetails(state, "userData", action.user),
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
				currentDetails: handlerCurrentDetails(state, "userLang"),
			}

		case "HANDLER_USER_THEME_ACTION":
			return {
				...state,
				currentDetails: handlerCurrentDetails(state, "userTheme"),
			}

		case "HANDLER_VALUE_FILTERS_ACTION":
			return {
				...state,
				filters: handlerFiltersValue(state, action.filter, action.id),
			}

		// ======= SECTIONS =======

		case "ADD_NEW_SECTION_ACTION":
			$("#modal-addSection").modal("hide")
			const params = { valueSection: action.value }
			return {
				...state,
				sections: addingItem(state, "addSection", params),
			}

		case "EDIT_SECTION_ACTION":
			$("#modal-editSection").modal("hide")
			return {
				...state,
				sections: editingItem(state, "editSection", action.editedSection),
			}

		case "REMOVE_ANY_ITEM_ACTION":
			$("#modal-removeItem").modal("hide")
			if (action.name === "Section") {
				return {
					...state,
					sections: removingItem(state, action.name, action.id),
					filters: { sections: "", tags: "" },
				}
			} else if (action.name === "Tag") {
				return {
					...state,
					tags: removingItem(state, action.name, action.id),
					filters: { sections: "", tags: "" },
				}
			} else if (action.name === "Note") {
				return {
					...state,
					notes: removingItem(state, action.name, action.id),
					filters: { sections: "", tags: "" },
				}
			}

		// ======= END SECTIONS =======

		// ======= TAGS =======
		// eslint-disable-next-line
		case "ADD_NEW_TAG_ACTION":
			$("#modal-addTag").modal("hide")
			return {
				...state,
				tags: addingItem(state, "addTag", action.newTag),
			}

		case "EDIT_TAG_ACTION":
			$("#modal-editTag").modal("hide")
			return {
				...state,
				tags: editingItem(state, "editTag", action.editedTag),
			}

		// ======= END TAGS =======

		// ======= NOTES =======
		case "ADD_NEW_NOTE_ACTION":
			$("#modal-addNote").modal("hide")
			return {
				...state,
				notes: addingItem(state, "addNote", action.newNote),
			}

		case "EDIT_NOTE_ACTION":
			$("#modal-editNote").modal("hide")
			return {
				...state,
				notes: editingItem(state, "editNote", action.editedNote),
			}

		// ======= END NOTES =======

		default:
			return state
	}
}
