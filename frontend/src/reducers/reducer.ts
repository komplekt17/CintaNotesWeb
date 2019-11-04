import $ from "jquery"
import { ICurrentDetails, IState } from "../types"

export const initialState = {
	auth: false,
	namePopup: "",
	filter: "all",
	loading: false,
	loaded: false,
	error: null,
	currentDetails: {
		section: { _id: "", nameSection: "" },
		tag: { _id: "", nameTag: "", userID: "", sectionID: "" },
		note: {
			_id: "",
			header: "",
			text: "",
			userID: "",
			sectionID: "",
			tagID: "",
			dateCreated: "",
			dateModified: "",
		},
		userProfile: { _id: "1", login: "", pass: "", status: "", lang: "EN" },
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
			userID: "1",
			sectionID: "1",
			tagID: "1",
			dateCreated: "20.10.2019, 11:34",
			dateModified: "21.10.2019, 12:31",
		},
		{
			_id: "2",
			header: "aud-2",
			text:
				"txt-aud-2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nostrum at, itaque error perferendis necessitatibus. At ut dolorum velit, officiis rerum vel impedit repellendus consequatur doloribus rem beatae! Illo, delectus!",
			userID: "1",
			sectionID: "1",
			tagID: "1",
			dateCreated: "21.10.2019, 11:31",
			dateModified: "22.10.2019, 13:31",
		},
		{
			_id: "3",
			header: "web-1",
			text:
				"txt-web-1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nostrum at, itaque error perferendis necessitatibus. At ut dolorum velit, officiis rerum vel impedit repellendus consequatur doloribus rem beatae! Illo, delectus!",
			userID: "1",
			sectionID: "1",
			tagID: "2",
			dateCreated: "23.10.2019, 10:34",
			dateModified: "24.10.2019, 12:11",
		},
		{
			_id: "4",
			header: "web-2",
			text:
				"txt-web-2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nostrum at, itaque error perferendis necessitatibus. At ut dolorum velit, officiis rerum vel impedit repellendus consequatur doloribus rem beatae! Illo, delectus!",
			userID: "1",
			sectionID: "1",
			tagID: "2",
			dateCreated: "22.10.2019, 10:34",
			dateModified: "23.10.2019, 10:36",
		},
		{
			_id: "5",
			header: "pro-1",
			text:
				"txt-pro-1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nostrum at, itaque error perferendis necessitatibus. At ut dolorum velit, officiis rerum vel impedit repellendus consequatur doloribus rem beatae! Illo, delectus!",
			userID: "1",
			sectionID: "1",
			tagID: "3",
			dateCreated: "20.10.2019, 11:34",
			dateModified: "21.10.2019, 12:31",
		},
		{
			_id: "6",
			header: "pro-2",
			text:
				"txt-pro-2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nostrum at, itaque error perferendis necessitatibus. At ut dolorum velit, officiis rerum vel impedit repellendus consequatur doloribus rem beatae! Illo, delectus!",
			userID: "1",
			sectionID: "1",
			tagID: "3",
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

// универсальный обработчик разных значений input'ов для currentDetails
const handlerValueInputs = (
	state: IState,
	name: string,
	value: string
): ICurrentDetails => {
	let obj = state.currentDetails

	// ------- ОБРАБОТЧИКИ СВОЙСТВ currentDetails.section -------

	// сохраняем value input добавляемой или редактируемой section
	if (name === "addNameSection" || name === "editNameSection") {
		obj = getNewObjDetails(obj, "section", "nameSection", value)
	}
	// очищаем поле nameSection, если Section added or edited
	else if (name === "buttonAddSection" || name === "buttonEditSection") {
		obj = getNewObjDetails(obj, "section", "nameSection", (value = ""))
	}
	// сохраняем _id удаляемой или редактируемой section
	else if (
		name === "saveIdRemovedSection" ||
		name === "saveIdEditedSection"
	) {
		obj = getNewObjDetails(obj, "section", "_id", value)
	}
	// очищаем поле _id, если Section removed или edited
	else if (
		name === "buttonRemoveSection" ||
		name === "buttonEditIdSection"
	) {
		obj = getNewObjDetails(obj, "section", "_id", (value = ""))
	}

	// ------- ОБРАБОТЧИКИ СВОЙСТВ currentDetails.tag -------

	// ------- ОБРАБОТЧИКИ СВОЙСТВ currentDetails.note -------

	// ------- ОБРАБОТЧИКИ СВОЙСТВ currentDetails.user -------

	return obj
}

// универсальный перебор любых свойств currentDetails
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

// добавление section
const addingSection = (
	state: IState,
	valueInputSection: string
): Array<{
	_id: string,
	nameSection: string,
	userID: string,
}> => {
	const arr = state.sections.slice()
	const obj = {
		_id: idRand(),
		nameSection: valueInputSection,
		userID: state.currentDetails.userProfile._id,
	}
	arr.push(obj)
	return arr
}

// редактирование section
const editingSection = (
	state: IState,
	id: string,
	value: string
): Array<{
	_id: string,
	nameSection: string,
	userID: string,
}> => {
	const arr = state.sections.slice()
	// получаем index элемента массива sections с _id === id
	const index = arr.findIndex(param => param._id === id)
	// присваиваем новое value полю section.nameSection
	arr[index].nameSection = value

	return arr
}

// удаление section
const removingSection = (
	state: IState,
	id: string
): Array<{
	_id: string,
	nameSection: string,
	userID: string,
}> => {
	const arr = state.sections.slice()
	// находим section с _id === idx
	for (let i: number = 0; i < arr.length; i++) {
		// вырезаем элемент
		if (arr[i]._id === id) arr.splice(i, 1)
	}
	return arr
}

export const Reducer = (state: IState = initialState, action: any) => {
	switch (action.type) {
		case "GET_ALL_NOTES_ACTION":
			return {
				...state,
				loading: false,
				loaded: true,
			}

		case "HANDLER_VALUE_INPUTS_ACTION":
			// console.log(action.name, action.value)
			return {
				...state,
				currentDetails: handlerValueInputs(state, action.name, action.value),
			}

		case "HANDLER_HEADER_POPUP":
			return {
				...state,
				namePopup: action.header,
			}

		// ======= SECTIONS =======

		case "ADD_NEW_SECTION_ACTION":
			$("#modal-addSection").modal("hide")
			return {
				...state,
				sections: addingSection(state, action.value),
			}

		case "EDIT_SECTION_ACTION":
			$("#modal-editSection").modal("hide")
			return {
				...state,
				sections: editingSection(state, action.id, action.value),
			}

		case "REMOVE_SECTION_ACTION":
			$("#modal-removeSection").modal("hide")
			return {
				...state,
				sections: removingSection(state, action.id),
			}

		// ======= END SECTIONS =======

		default:
			return state
	}
}
