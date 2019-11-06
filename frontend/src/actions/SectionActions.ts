// добавление section
const addNewSectionAction = (value: string) => {
	return {
		type: "ADD_NEW_SECTION_ACTION",
		value,
	}
}

// редактирование section
const editSectionAction = (editedSection: {
	id: string,
	nameSection: string,
}) => {
	return {
		type: "EDIT_SECTION_ACTION",
		editedSection,
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
