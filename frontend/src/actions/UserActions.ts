// получение данных с сервера по логину юзера
const getDataByLoginAction = (user: { login: any, pass: any }) => {
	return {
		type: "GET_DATA_BY_LOGIN_ACTION",
		data: "data from server",
		user,
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
export { getDataByLoginAction, getStatusLoginAction }
