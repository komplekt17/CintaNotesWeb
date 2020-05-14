import { NAME_LOCAL_STORAGE } from "../constants"

export const getDataLocalStorage = () => {
	let dataLocalStorage = null
	const ls: null | string = localStorage.getItem(NAME_LOCAL_STORAGE)
	if (typeof ls === "string") dataLocalStorage = JSON.parse(ls)

	return dataLocalStorage
}
