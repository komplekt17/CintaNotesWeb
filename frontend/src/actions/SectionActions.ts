const addNewSectionAction = (name: string) => {
	return {
		type: "ADD_NEW_SECTION_ACTION",
		name,
	}
}

const editSectionAction = (idx: string) => {
	return {
		type: "EDIT_SECTION_ACTION",
		idx,
	}
}

const removeSectionAction = (idx: string) => {
	return {
		type: "REMOVE_SECTION_ACTION",
		idx,
	}
}

export { addNewSectionAction, editSectionAction, removeSectionAction }
