import {
	ICurrentDetails,
	IState,
	ISections,
	ITags,
	INotes,
} from "../types"
import { NAME_LOCAL_STORAGE } from "../constants"
import { getDataLocalStorage, startModalAlert } from "../common"

export const initialState = {
	auth: false,
	namePopup: "",
	messagePopup: { category: "", message: "" },
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
			id: "",
			login: "",
			token: "",
			status: "user",
			lang: "en",
			theme: "night", // or light
		},
		searchDetails: { searchSort: "header", searchText: "" },
	},
	sections: [],
	tags: [],
	notes: [],
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
	let sections = state.sections.slice()
	let tags = state.tags.slice()
	let notes = state.notes.slice()

	// получаем данные из localStorage
	const data = getDataLocalStorage()

	if (data !== null) {
		sections = data.sections
		tags = data.tags
		notes = data.notes
	}

	// ------- ОБРАБОТЧИКИ СВОЙСТВ currentDetails.section -------

	// сохраняем value input добавляемой или редактируемой section
	if (name === "addNameSection" || name === "editNameSection") {
		obj = getNewObjDetails(obj, "section", "nameSection", value)
	}
	// сохраняем данные удаляемой или редактируемой section
	// в currentDitails.section
	else if (
		name === "saveIdRemovedSection" ||
		name === "saveIdEditedSection"
	) {
		// получаем index элемента массива sections с id === value
		const index = sections.findIndex(param => param.id === value)
		// получаем значения свойств найденного section'а
		const nameSection = sections[index].nameSection
		const userId = sections[index].userId

		// сохраняем значения полей найденного section'а
		// в currentDitails.section
		obj = getNewObjDetails(obj, "section", "id", value)
		obj = getNewObjDetails(obj, "section", "nameSection", nameSection)
		obj = getNewObjDetails(obj, "section", "userId", userId)

		// сохраняем в localStorage в currentDitails.section
		manageDataLocalStorage("getEditableSection", sections[index])
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
		obj = getNewObjDetails(obj, "section", "userId", (value = ""))
	}

	// ------- ОБРАБОТЧИКИ СВОЙСТВ currentDetails.tag -------

	// сохраняем данные редактируемого tag'а в currentDitails.tag
	else if (name === "saveIdEditedTag") {
		// сохраняем id редактируемого tag'а
		obj = getNewObjDetails(obj, "tag", "id", value)

		// получаем index элемента массива tags с id === value
		const index = tags.findIndex(param => param.id === value)
		// получаем значения свойства найденного tag'а
		const nameTag = tags[index].nameTag
		const sectionId = tags[index].sectionId
		const userId = tags[index].userId

		// сохраняем значения полей найденного tag'а в currentDitails.tag
		obj = getNewObjDetails(obj, "tag", "nameTag", nameTag)
		obj = getNewObjDetails(obj, "tag", "sectionId", sectionId)
		obj = getNewObjDetails(obj, "tag", "userId", userId)

		// сохраняем в localStorage в currentDitails.tag
		manageDataLocalStorage("getEditableTag", tags[index])
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

		// получаем index элемента массива notes с id === value
		const index = notes.findIndex(param => param.id === value)
		// получаем значения свойства найденного note'а
		const header = notes[index].header
		const text = notes[index].text
		const remarks = notes[index].remarks
		const link = notes[index].link
		const sectionId = notes[index].sectionId
		const tagId = notes[index].tagId
		const userId = notes[index].userId

		// сохраняем значения полей найденного note'а в currentDitails.note
		obj = getNewObjDetails(obj, "note", "header", header)
		obj = getNewObjDetails(obj, "note", "text", text)
		obj = getNewObjDetails(obj, "note", "remarks", remarks)
		obj = getNewObjDetails(obj, "note", "link", link)
		obj = getNewObjDetails(obj, "note", "sectionId", sectionId)
		obj = getNewObjDetails(obj, "note", "tagId", tagId)
		obj = getNewObjDetails(obj, "note", "userId", userId)

		// сохраняем в localStorage в currentDitails.note
		manageDataLocalStorage("getEditableNote", notes[index])
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
		// value = user{login, token}
		const { id, login, token, status, lang, theme } = value
		// обновляем значения полей
		obj = getNewObjDetails(obj, "userProfile", "id", id)
		obj = getNewObjDetails(obj, "userProfile", "login", login)
		obj = getNewObjDetails(obj, "userProfile", "token", token)
		obj = getNewObjDetails(obj, "userProfile", "status", status)
		obj = getNewObjDetails(obj, "userProfile", "lang", lang)
		obj = getNewObjDetails(obj, "userProfile", "theme", theme)
	}

	// удаляем данные User'а при выходе из профиля
	else if (name === "userLogOut") {
		// очищаем значения полей id, login, token
		obj = getNewObjDetails(obj, "userProfile", "id", (value = ""))
		obj = getNewObjDetails(obj, "userProfile", "login", (value = ""))
		obj = getNewObjDetails(obj, "userProfile", "token", (value = ""))
	}

	// смена языковой локализации User'а при клике EN/RU
	else if (name === "userLang") {
		// обновляем поле lang
		obj = getNewObjDetails(obj, "userProfile", "lang", value)

		// сохраняем в localStorage в currentDitails.userProfile.lang
		if (data !== null) manageDataLocalStorage("editUserData", value)
	}

	// смена интерфейса темы User'а при клике moon/sun
	else if (name === "userTheme") {
		// обновляем поле theme
		obj = getNewObjDetails(obj, "userProfile", "theme", value)

		// сохраняем в localStorage в currentDitails.userProfile.theme
		if (data !== null) manageDataLocalStorage("editUserData", value)
	}

	// ------- ОБРАБОТЧИКИ СВОЙСТВ currentDetails.searchDetails -------

	// сохранение значения поля searchText
	else if (name === "searchText") {
		obj = getNewObjDetails(obj, "searchDetails", "searchText", value)
	}

	// сохранение значения поля searchSort
	else if (name === "searchSort") {
		obj = getNewObjDetails(obj, "searchDetails", "searchSort", value)
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
		id: any,
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
			id: params.id,
			nameTag: params.nameTag,
			userId: params.userId,
			sectionId: params.sectionId,
		}
		arr.push(obj)
		return arr
	} else if (nameItem === "addNote") {
		const arr = state.notes.slice()
		const obj = {
			id: params.id,
			header: params.header,
			text: params.text,
			remarks: params.remarks,
			link: params.link,
			userId: params.userId,
			sectionId: params.sectionId,
			tagId: params.tagId,
			createdAt: params.createdAt,
			updatedAt: params.updatedAt,
		}
		arr.push(obj)
		return arr
	}
}

// редактирование Item for sections, tags and notes
const editingItem = (
	state: IState,
	nameItem: string,
	params:
		| {
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
		| any
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
		const arr: any = state.notes.slice()
		// получаем index элемента массива notes с id === id
		const index = arr.findIndex((param: any) => param.id === params.id)
		// // присваиваем новое значение полю note.header
		// arr[index].header = params.header
		// // присваиваем новое значение полю note.text
		// arr[index].text = params.text
		// // присваиваем новое значение полю note.remarks
		// arr[index].remarks = params.remarks
		// // присваиваем новое значение полю note.link
		// arr[index].link = params.link
		// // присваиваем новое значение полю note.sectionId
		// arr[index].sectionId = params.sectionId
		// // присваиваем новое значение полю note.tagId
		// arr[index].tagId = params.tagId
		// // присваиваем новое значение полю note.tagId
		// arr[index].createdAt = params.createdAt
		// // присваиваем новое значение полю note.tagId
		// arr[index].updatedAt = params.updatedAt

		// присваиваем изменённые значения полям
		for (const key in params) {
			if (arr[index][key] !== params[key]) {
				arr[index][key] = params[key]
			}
		}

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
			// если note относится к id удаляемого tag
			if (arr[i].tagId === idItem) {
				// переносим notes в Unsorted tag -> tagId = 0
				arr[i].tagId = "0"
				// переносим notes в All section -> sectionId = 0
				arr[i].sectionId = "0"
			}
		}
	}
	// при удалении section
	else if (nameItem === "Section") {
		for (let i = 0; i < arr.length; i++) {
			// если note относится к id удаляемой section
			if (arr[i].sectionId === idItem) {
				// переносим notes в All section -> sectionId = 0
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
			// переносим tags в All section -> sectionId = 0
			arr[i].sectionId = "0"
		}
	}
	return arr
}

// установка данных в localStorage
const manageDataLocalStorage = (
	nameData: string,
	action?: any,
	state?: any
): void => {
	// получаем данные из localStorage
	const data = getDataLocalStorage()

	if (nameData === "setAllData") {
		console.log()
		localStorage.setItem(
			NAME_LOCAL_STORAGE,
			JSON.stringify({
				auth: true,
				currentDetails: handlerCurrentDetails(
					state,
					"userData",
					action.result.user
				),
				sections: action.result.sections,
				tags: action.result.tags,
				notes: action.result.notes,
			})
		)
	} else if (nameData === "removeAllData") {
		localStorage.removeItem(NAME_LOCAL_STORAGE)
	} else if (nameData === "setUserData") {
		localStorage.setItem(
			NAME_LOCAL_STORAGE,
			JSON.stringify({
				auth: true,
				currentDetails: handlerCurrentDetails(
					state,
					"userData",
					action.result.user
				),
				sections: "",
				tags: "",
				notes: "",
			})
		)
	} else if (nameData === "editUserData") {
		// for currentDetails.userProfile.lang
		if (action === "en" || action === "ru") {
			localStorage.setItem(
				NAME_LOCAL_STORAGE,
				JSON.stringify({
					...data,
					currentDetails: {
						...data.currentDetails,
						userProfile: {
							...data.currentDetails.userProfile,
							lang: action,
						},
					},
				})
			)
		}
		// for currentDetails.userProfile.theme
		else {
			localStorage.setItem(
				NAME_LOCAL_STORAGE,
				JSON.stringify({
					...data,
					currentDetails: {
						...data.currentDetails,
						userProfile: {
							...data.currentDetails.userProfile,
							theme: action,
						},
					},
				})
			)
		}
	} else if (nameData === "addSection") {
		const addSectionParams = {
			id: action.result.data.id,
			nameSection: action.result.data.nameSection,
			userId: action.result.data.userId,
			createdAt: action.result.data.createdAt,
			updatedAt: action.result.data.updatedAt,
		}
		localStorage.setItem(
			NAME_LOCAL_STORAGE,
			JSON.stringify({
				...data,
				sections: addingItem(state, "addSection", addSectionParams),
			})
		)
	} else if (nameData === "editSection") {
		const editSectionParams = {
			id: action.result.data.id,
			nameSection: action.result.data.nameSection,
			userId: action.result.data.userId,
			createdAt: action.result.data.createdAt,
			updatedAt: action.result.data.updatedAt,
		}
		localStorage.setItem(
			NAME_LOCAL_STORAGE,
			JSON.stringify({
				...data,
				sections: editingItem(state, "editSection", editSectionParams),
			})
		)
	} else if (nameData === "getEditableSection") {
		localStorage.setItem(
			NAME_LOCAL_STORAGE,
			JSON.stringify({
				...data,
				currentDetails: {
					...data.currentDetails,
					section: {
						id: action.id,
						nameSection: action.nameSection,
						userId: action.userId,
					},
				},
			})
		)
	} else if (nameData === "removeSection") {
		localStorage.setItem(
			NAME_LOCAL_STORAGE,
			JSON.stringify({
				...data,
				sections: removingItem(state, "Section", action.result.data.id),
				tags: transplaceTags(state, action.result.data.id),
				notes: transplaceNotes(state, "Section", action.result.data.id),
			})
		)
	} else if (nameData === "addTag") {
		const addTagParams = {
			id: action.result.data.id,
			nameTag: action.result.data.nameTag,
			sectionId: action.result.data.sectionId,
			userId: action.result.data.userId,
			createdAt: action.result.data.createdAt,
			updatedAt: action.result.data.updatedAt,
		}
		localStorage.setItem(
			NAME_LOCAL_STORAGE,
			JSON.stringify({
				...data,
				tags: addingItem(state, "addTag", addTagParams),
			})
		)
	} else if (nameData === "editTag") {
		const editTagParams = {
			id: action.result.data.id,
			nameTag: action.result.data.nameTag,
			sectionId: action.result.data.sectionId,
			userId: action.result.data.userId,
			createdAt: action.result.data.createdAt,
			updatedAt: action.result.data.updatedAt,
		}
		localStorage.setItem(
			NAME_LOCAL_STORAGE,
			JSON.stringify({
				...data,
				tags: editingItem(state, "editTag", editTagParams),
				notes: transplaceNotes(state, "editTag", action.result.data),
			})
		)
	} else if (nameData === "getEditableTag") {
		localStorage.setItem(
			NAME_LOCAL_STORAGE,
			JSON.stringify({
				...data,
				currentDetails: {
					...data.currentDetails,
					tag: {
						id: action.id,
						nameSection: action.nameTag,
						sectionId: action.sectionId,
						userId: action.userId,
					},
				},
			})
		)
	} else if (nameData === "removeTag") {
		localStorage.setItem(
			NAME_LOCAL_STORAGE,
			JSON.stringify({
				...data,
				tags: removingItem(state, "Tag", action.result.data.id),
				notes: transplaceNotes(state, "Tag", action.result.data.id),
			})
		)
	} else if (nameData === "createNote") {
		const addNoteParams = {
			id: action.result.data.id,
			header: action.result.data.header,
			text: action.result.data.text,
			remarks: action.result.data.remarks,
			link: action.result.data.link,
			sectionId: action.result.data.sectionId,
			tagId: action.result.data.tagId,
			userId: action.result.data.userId,
			createdAt: action.result.data.createdAt,
			updatedAt: action.result.data.updatedAt,
		}
		localStorage.setItem(
			NAME_LOCAL_STORAGE,
			JSON.stringify({
				...data,
				notes: addingItem(state, "addNote", addNoteParams),
			})
		)
	} else if (nameData === "editNote") {
		const editNoteParams = {
			id: action.result.data.id,
			header: action.result.data.header,
			text: action.result.data.text,
			remarks: action.result.data.remarks,
			link: action.result.data.link,
			sectionId: action.result.data.sectionId,
			tagId: action.result.data.tagId,
			userId: action.result.data.userId,
			createdAt: action.result.data.createdAt,
			updatedAt: action.result.data.updatedAt,
		}
		localStorage.setItem(
			NAME_LOCAL_STORAGE,
			JSON.stringify({
				...data,
				notes: editingItem(state, "editNote", editNoteParams),
			})
		)
	} else if (nameData === "getEditableNote") {
		localStorage.setItem(
			NAME_LOCAL_STORAGE,
			JSON.stringify({
				...data,
				currentDetails: {
					...data.currentDetails,
					note: {
						id: action.id,
						header: action.header,
						text: action.text,
						remarks: action.remarks,
						link: action.link,
						sectionId: action.sectionId,
						tagId: action.tagId,
						userId: action.userId,
					},
				},
			})
		)
	} else if (nameData === "removeNote") {
		localStorage.setItem(
			NAME_LOCAL_STORAGE,
			JSON.stringify({
				...data,
				notes: removingItem(state, "Note", action.result.data.id),
			})
		)
	}
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
			return {
				...state,
				loading: false,
				loaded: true,
				error: action.error,
			}

		case "GET_DATA_BY_LOGIN_ACTION":
			// console.log(action.result)
			if (action.result.typeMsg === "success") {
				manageDataLocalStorage("setAllData", action, state)
				return {
					...state,
					auth: true,
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
					messagePopup: {
						category: action.result.typeMsg,
						message: action.result.message,
					},
					filters: { sections: "All", tags: "All" },
				}
			}
			//  action.result.typeMsg === "error"
			else {
				startModalAlert()
				return {
					...state,
					loading: false,
					loaded: true,
					messagePopup: {
						category: action.result.typeMsg,
						message: action.result.message,
					},
				}
			}

		case "CREATE_NEW_USER_ACTION":
			if (action.result.typeMsg === "success") {
				manageDataLocalStorage("setUserData", action, state)
				return {
					...state,
					auth: true,
					currentDetails: handlerCurrentDetails(
						state,
						"userData",
						action.result.user
					),
					sections: [],
					tags: [],
					notes: [],
					loading: false,
					loaded: true,
					messagePopup: {
						category: action.result.typeMsg,
						message: action.result.message,
					},
				}
			}
			// action.result.typeMsg === "error"
			else {
				startModalAlert()
				return {
					...state,
					loading: false,
					loaded: true,
					messagePopup: {
						category: action.result.typeMsg,
						message: action.result.message,
					},
				}
			}

		case "UPDATE_USER_PASS_ACTION":
			startModalAlert()
			return {
				...state,
				loading: false,
				loaded: true,
				messagePopup: {
					category: action.result.typeMsg,
					message: action.result.message,
				},
			}

		case "RESET_PASSWORD_ACTION":
			startModalAlert()
			return {
				...state,
				loading: false,
				loaded: true,
				messagePopup: {
					category: action.result.typeMsg,
					message: action.result.message,
				},
			}

		case "USER_LOGOUT_ACTION":
			manageDataLocalStorage("removeAllData")
			return {
				...state,
				auth: false,
				loading: false,
				loaded: true,
				currentDetails: handlerCurrentDetails(state, "userLogOut"),
				messagePopup: {
					category: action.result.typeMsg,
					message: action.result.message,
				},
				sections: [],
				tags: [],
				notes: [],
			}

		case "HANDLER_VALUE_INPUTS_ACTION":
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
				messagePopup: {
					category: action.category,
					message: action.message,
				},
			}

		case "HANDLER_LANG_LOCAL_ACTION":
			return {
				...state,
				currentDetails: handlerCurrentDetails(state, "userLang", action.lang),
			}

		case "HANDLER_USER_THEME_ACTION":
			return {
				...state,
				filters: { sections: "All", tags: "All" },
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
			startModalAlert()
			manageDataLocalStorage("addSection", action, state)
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
				messagePopup: { category: "success", message: action.result.message },
				loading: false,
				loaded: true,
			}

		case "EDIT_SECTION_ACTION":
			startModalAlert()
			manageDataLocalStorage("editSection", action, state)
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
				messagePopup: { category: "success", message: action.result.message },
				loading: false,
				loaded: true,
			}

		case "REMOVE_SECTION_ACTION":
			startModalAlert()
			manageDataLocalStorage("removeSection", action, state)
			return {
				...state,
				sections: removingItem(state, "Section", action.result.data.id),
				tags: transplaceTags(state, action.result.data.id),
				notes: transplaceNotes(state, "Section", action.result.data.id),
				filters: { sections: "All", tags: "All" },
				messagePopup: { category: "success", message: action.result.message },
				loading: false,
				loaded: true,
			}

		// ======= END SECTIONS =======

		// ======= TAGS =======
		case "ADD_NEW_TAG_ACTION":
			startModalAlert()
			manageDataLocalStorage("addTag", action, state)
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
				messagePopup: { category: "success", message: action.result.message },
				loading: false,
				loaded: true,
			}

		case "EDIT_TAG_ACTION":
			startModalAlert()
			manageDataLocalStorage("editTag", action, state)
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
				messagePopup: { category: "success", message: action.result.message },
				loading: false,
				loaded: true,
			}

		case "REMOVE_TAG_ACTION":
			startModalAlert()
			manageDataLocalStorage("removeTag", action, state)
			return {
				...state,
				tags: removingItem(state, "Tag", action.result.data.id),
				notes: transplaceNotes(state, "Tag", action.result.data.id),
				filters: { sections: state.filters.sections, tags: "All" },
				messagePopup: { category: "success", message: action.result.message },
				loading: false,
				loaded: true,
			}
		// ======= END TAGS =======

		// ======= NOTES =======
		case "ADD_NEW_NOTE_ACTION":
			startModalAlert()
			manageDataLocalStorage("addNote", action, state)
			const addNoteParams = {
				id: action.result.data.id,
				header: action.result.data.header,
				text: action.result.data.text,
				remarks: action.result.data.remarks,
				link: action.result.data.link,
				sectionId: action.result.data.sectionId,
				tagId: action.result.data.tagId,
				userId: action.result.data.userId,
				createdAt: action.result.data.createdAt,
				updatedAt: action.result.data.updatedAt,
			}
			return {
				...state,
				notes: addingItem(state, "addNote", addNoteParams),
				messagePopup: { category: "success", message: action.result.message },
				loading: false,
				loaded: true,
			}

		case "EDIT_NOTE_ACTION":
			startModalAlert()
			manageDataLocalStorage("editNote", action, state)
			const editNoteParams = {
				id: action.result.data.id,
				header: action.result.data.header,
				text: action.result.data.text,
				remarks: action.result.data.remarks,
				link: action.result.data.link,
				sectionId: action.result.data.sectionId,
				tagId: action.result.data.tagId,
				userId: action.result.data.userId,
				createdAt: action.result.data.createdAt,
				updatedAt: action.result.data.updatedAt,
			}
			return {
				...state,
				notes: editingItem(state, "editNote", editNoteParams),
				messagePopup: { category: "success", message: action.result.message },
				loading: false,
				loaded: true,
			}

		case "REMOVE_NOTE_ACTION":
			startModalAlert()
			manageDataLocalStorage("removeNote", action, state)
			return {
				...state,
				notes: removingItem(state, "Note", action.result.data.id),
				messagePopup: { category: "success", message: action.result.message },
				loading: false,
				loaded: true,
			}

		// ======= END NOTES =======

		default:
			return state
	}
}
