import axios from "axios"
import { SERVER_URI } from "../constants"
import $ from "jquery"

// добавление tag
const addNewTagAction = (newTag: {
	nameTag: any,
	sectionId: any,
	userId: string,
}) => {
	$("#modal-addTag").modal("hide")
	return (dispatch: {
		(arg0: { type: string }): void,
		(arg0: { type: string, result: any }): void,
		(arg0: { type: string, error: any }): void,
	}) => {
		dispatch({
			type: "LOAD_REQUESTED_DATA_ACTION",
		})
		axios
			.post(`${SERVER_URI}/tags/add`, newTag)
			.then(response => {
				dispatch({
					type: "ADD_NEW_TAG_ACTION",
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

// редактирование tag
const editTagAction = (editedTag: {
	id: string,
	nameTag: string,
	sectionId: string,
	userId: string,
}) => {
	$("#modal-editTag").modal("hide")
	return (dispatch: {
		(arg0: { type: string }): void,
		(arg0: { type: string, result: any }): void,
		(arg0: { type: string, error: any }): void,
	}) => {
		dispatch({
			type: "LOAD_REQUESTED_DATA_ACTION",
		})
		axios
			.put(`${SERVER_URI}/tags/update/${editedTag.id}`, editedTag)
			.then(response => {
				dispatch({
					type: "EDIT_TAG_ACTION",
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

// удаление tag
const removeTagAction = (tagId: string) => {
	$("#modal-removeItem").modal("hide")
	return (dispatch: {
		(arg0: { type: string }): void,
		(arg0: { type: string, result: any }): void,
		(arg0: { type: string, error: any }): void,
	}) => {
		dispatch({
			type: "LOAD_REQUESTED_DATA_ACTION",
		})
		axios
			.post(`${SERVER_URI}/tags/remove/${tagId}`)
			.then(response => {
				dispatch({
					type: "REMOVE_TAG_ACTION",
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

export { addNewTagAction, editTagAction, removeTagAction }
