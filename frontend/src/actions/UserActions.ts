// получение данных с сервера по логину юзера
const getDataByLoginAction = (user: { login: any, pass: any }) => {
	return {
		type: "GET_DATA_BY_LOGIN_ACTION",
		data: "data from server",
		user,
	}
}

// создание нового пользователя
const createNewUserAction = (newUser: { login: any, pass: any }) => {
	return {
		type: "CREATE_NEW_USER_ACTION",
		newUser,
	}
}

// обработчик обновления user
const updateEditUserAction = (objUser: { login: any, pass: any }) => {
	return {
		type: "UPDATE_USER_ACTION",
		objUser,
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
const getStatusLoginAction = (token: string) => {
	return {
		type: "USER_LOGOUT_ACTION",
		token,
	}
}
export {
	getDataByLoginAction,
	getStatusLoginAction,
	createNewUserAction,
	updateEditUserAction,
	resetPasswordAction,
}
