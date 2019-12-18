import axios from "axios"
import { SERVER_URI } from "../constants"
import $ from "jquery"

// получение данных с сервера по логину юзера
const getDataByLoginAction = (objUser: {
	login: string,
	pass: string,
}) => {
	// console.log(objUser)
	return (dispatch: {
		(arg0: { type: string }): void,
		(arg0: { type: string, result: any }): void,
		(arg0: { type: string, error: any }): void,
	}) => {
		dispatch({
			type: "LOAD_REQUESTED_DATA_ACTION",
		})
		axios
			.post(`${SERVER_URI}/users/enter`, objUser)
			.then(response => {
				// console.log(response.data)
				dispatch({
					type: "GET_DATA_BY_LOGIN_ACTION",
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

// создание нового пользователя
const createNewUserAction = (objNewUser: {
	login: string,
	pass: string,
}) => {
	$("#modal-createUser").modal("hide")
	return (dispatch: {
		(arg0: { type: string }): void,
		(arg0: { type: string, result: any }): void,
		(arg0: { type: string, error: any }): void,
	}) => {
		dispatch({
			type: "LOAD_REQUESTED_DATA_ACTION",
		})
		axios
			.post(`${SERVER_URI}/users/create`, objNewUser)
			.then(response => {
				// console.log(response.data)
				dispatch({
					type: "CREATE_NEW_USER_ACTION",
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

// обработчик обновления user (изменение пароля)
const updateUserPassAction = (objUserPass: {
	inputOldPass: any,
	inputNewPass: any,
	token: string,
}) => {
	$("#modal-changePass").modal("hide")
	return (dispatch: {
		(arg0: { type: string }): void,
		(arg0: { type: string, result: any }): void,
		(arg0: { type: string, error: any }): void,
	}) => {
		dispatch({
			type: "LOAD_REQUESTED_DATA_ACTION",
		})
		axios
			.put(`${SERVER_URI}/users/update/${objUserPass.token}`, objUserPass)
			.then(response => {
				console.log(response.data)
				dispatch({
					type: "UPDATE_USER_PASS_ACTION",
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

// сброс пароля
const resetPasswordAction = (objUser: { login: any, pass: any }) => {
	return {
		type: "RESET_PASSWORD_ACTION",
		objUser,
	}
}

// обработчик статуса логина (залогинен или нет User)
// выход из всех сессий (сброс токенов)
const changeStatusLoginAction = (token: string) => {
	{
		return (dispatch: {
			(arg0: { type: string }): void,
			(arg0: { type: string, result: any }): void,
			(arg0: { type: string, error: any }): void,
		}) => {
			dispatch({
				type: "LOAD_REQUESTED_DATA_ACTION",
			})
			axios
				.get(`${SERVER_URI}/users/logout/${token}`)
				.then(response => {
					console.log(response.data)
					dispatch({
						type: "USER_LOGOUT_ACTION",
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
}

export {
	getDataByLoginAction,
	changeStatusLoginAction,
	createNewUserAction,
	updateUserPassAction,
	resetPasswordAction,
}
