// добавление section
const addNewSectionAction = (value: string) => {
	return {
		type: "ADD_NEW_SECTION_ACTION",
		value,
	}
}

// редактирование section
const editSectionAction = (id: string, value: string) => {
	return {
		type: "EDIT_SECTION_ACTION",
		id,
		value,
	}
}

// удаление section
const removeSectionAction = (id: string) => {
	return {
		type: "REMOVE_SECTION_ACTION",
		id,
	}
}

export { addNewSectionAction, editSectionAction, removeSectionAction }
