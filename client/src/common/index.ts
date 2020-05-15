import $ from "jquery"
import { NAME_LOCAL_STORAGE, DELAY_MODAL_ALERT } from "../constants"

export const getDataLocalStorage = () => {
	let dataLocalStorage = null
	const ls: null | string = localStorage.getItem(NAME_LOCAL_STORAGE)
	if (typeof ls === "string") dataLocalStorage = JSON.parse(ls)

	return dataLocalStorage
}

// func скрытия всплывшего алерта
// по типу toast materializecss
export const startModalAlert = (): void => {
	$("#modal-alert").modal("show")
	setTimeout((): void => {
		$("#modal-alert").modal("hide")
	}, DELAY_MODAL_ALERT)
}
