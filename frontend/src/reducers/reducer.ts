import $ from "jquery"
import { ICurrentDetails, IState } from "../types"

const initialState = {
	auth: false,
	namePopup: "",
	filter: "all",
	loading: false,
	loaded: false,
	error: null,
	currentDetails: {
		section: { _id: "", nameSection: "" },
		tag: { _id: "", value: "" },
		note: { _id: "", value: "" },
		user: { _id: "1", login: "", pass: "", status: "" },
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

// обработчик значений инпутов
const handlerValueInputs = (
	state: IState,
	name: string,
	value: string
): ICurrentDetails => {
	let obj = state.currentDetails
	// сохраняем input value section
	if (name === "nameSection") {
		// for (const key in obj) {
		// 	if (key === "section") {
		// 		const innerObj = obj[key]
		// 		// перебор полей section
		// 		for (const innerKey in innerObj) {
		// 			if (innerKey === "nameSection") {
		// 				innerObj[innerKey] = value
		// 			}
		// 		}
		// 	}
		// }
		obj = getObjDetailsSection(obj, "section", "nameSection", value)
	}
	// очищаем поле nameSection, если new Section добавлена
	else if (name === "buttonAddSection") {
		obj = getObjDetailsSection(obj, "section", "nameSection", (value = ""))
	}
	// сохраняем id удаляемой section
	else if (name === "saveIdRemovedSection") {
		obj = getObjDetailsSection(obj, "section", "_id", value)
	}
	// очищаем поле nameSection, если new Section добавлена
	else if (name === "buttonRemoveSection") {
		obj = getObjDetailsSection(obj, "section", "_id", (value = ""))
	}
	return obj
}
// перебор свойств currentDetails.section
const getObjDetailsSection = (
	obj: any,
	keyName: string,
	innerKeyName: string,
	value: string
): any => {
	// перебираем свойства-объекты объекта и при совпадении полей с name
	// присваиваем полю новое значение value
	// перебор полей currentDetails
	for (const key in obj) {
		if (key === keyName) {
			const innerObj = obj[key]
			// перебор полей section
			for (const innerKey in innerObj) {
				if (innerKey === innerKeyName) {
					innerObj[innerKey] = value
				}
			}
		}
	}
	return obj
}

// добавление новой section
const addingSection = (
	state: IState
): Array<{
	_id: string,
	nameSection: string,
	userID: string,
}> => {
	const arr = state.sections.slice()
	const obj = {
		_id: idRand(),
		nameSection: state.currentDetails.section.nameSection,
		userID: state.currentDetails.user._id,
	}
	arr.push(obj)
	return arr
}

// удаление section
const removingSection = (
	state: IState
): Array<{
	_id: string,
	nameSection: string,
	userID: string,
}> => {
	const arr = state.sections.slice()
	const idx = state.currentDetails.section._id
	// ищем заметку с id === idx
	for (let i: number = 0; i < arr.length; i++) {
		// вырезаем элемент
		if (arr[i]._id === idx) arr.splice(i, 1)
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
			console.log(action.name, action.value)
			return {
				...state,
				currentDetails: handlerValueInputs(state, action.name, action.value),
			}

		case "HANDLER_HEADER_POPUP":
			return {
				...state,
				namePopup: action.header,
			}

		case "ADD_NEW_SECTION_ACTION":
			$("#modal-addSection").modal("hide")
			return {
				...state,
				sections: addingSection(state),
				currentDetails: handlerValueInputs(state, action.name, ""),
			}

		case "EDIT_SECTION_ACTION":
			$("#modal-editSection").modal("hide")
			return {
				...state,
			}

		case "REMOVE_SECTION_ACTION":
			$("#modal-removeSection").modal("hide")
			return {
				...state,
				sections: removingSection(state),
				currentDetails: handlerValueInputs(state, action.name, ""),
			}

		default:
			return state
	}
}
