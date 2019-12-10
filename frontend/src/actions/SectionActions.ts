import axios from "axios"
import { SERVER_URI } from "../constants"
import $ from "jquery"

const addNewSectionAction = (objSection: {
	nameSection: string,
	userId: string,
}) => {
	$("#modal-addSection").modal("hide")
	return (dispatch: {
		(arg0: { type: string }): void,
		(arg0: { type: string, result: any }): void,
		(arg0: { type: string, error: any }): void,
	}) => {
		dispatch({
			type: "LOAD_REQUESTED_DATA_ACTION",
		})
		axios
			.post(`${SERVER_URI}/sections/add`, objSection)
			.then(response => {
				dispatch({
					type: "ADD_NEW_SECTION_ACTION",
					result: response.data,
				})
			})
			.catch(error => {
				dispatch({
					type: "LOAD_FAILURE_DATA_ACTION",
					error,
				})
				console.log(error)
			})
	}
}

// редактирование section
const editSectionAction = (editedSection: {
	id: string,
	nameSection: string,
	userId: string,
}) => {
	$("#modal-editSection").modal("hide")
	return (dispatch: {
		(arg0: { type: string }): void,
		(arg0: { type: string, result: any }): void,
		(arg0: { type: string, error: any }): void,
	}) => {
		dispatch({
			type: "LOAD_REQUESTED_DATA_ACTION",
		})
		axios
			.put(`${SERVER_URI}/sections/update/${editedSection.id}`, editedSection)
			.then(response => {
				dispatch({
					type: "EDIT_SECTION_ACTION",
					result: response.data,
				})
			})
			.catch(error => {
				dispatch({
					type: "LOAD_FAILURE_DATA_ACTION",
					error,
				})
				console.log(error)
			})
	}
}

// удаление любого Item
const removeItemAction = (name: string, id: string) => {
	return {
		type: "REMOVE_ANY_ITEM_ACTION",
		name,
		id,
	}
}

export { addNewSectionAction, editSectionAction, removeItemAction }
