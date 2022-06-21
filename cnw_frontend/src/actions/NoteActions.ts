import axios from "axios"
import { SERVER_URI } from "../constants"
import $ from "jquery"

// добавление new note
const addNewNoteAction = (newNote: {
	header: string,
	text: string,
	remarks: string,
	link: string,
	sectionId: string,
	tagId: string,
	userId: string,
}) => {
	$("#modal-addNote").modal("hide")
	return (dispatch: {
		(arg0: { type: string }): void,
		(arg0: { type: string, result: any }): void,
		(arg0: { type: string, error: any }): void,
	}) => {
		dispatch({
			type: "LOAD_REQUESTED_DATA_ACTION",
		})
		axios
			.post(`${SERVER_URI}/notes/add`, newNote)
			.then(response => {
				dispatch({
					type: "ADD_NEW_NOTE_ACTION",
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

// редактирование note
const editNoteAction = (editedNote: {
	id: string,
	header: string,
	text: string,
	remarks: string,
	link: string,
	sectionId: string,
	tagId: string,
	userId: string,
}) => {
	$("#modal-editNote").modal("hide")
	return (dispatch: {
		(arg0: { type: string }): void,
		(arg0: { type: string, result: any }): void,
		(arg0: { type: string, error: any }): void,
	}) => {
		dispatch({
			type: "LOAD_REQUESTED_DATA_ACTION",
		})
		axios
			.put(`${SERVER_URI}/notes/update/${editedNote.id}`, editedNote)
			.then(response => {
				dispatch({
					type: "EDIT_NOTE_ACTION",
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
const removeNoteAction = (noteId: string) => {
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
			.post(`${SERVER_URI}/notes/remove/${noteId}`)
			.then(response => {
				dispatch({
					type: "REMOVE_NOTE_ACTION",
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

export { addNewNoteAction, editNoteAction, removeNoteAction }
