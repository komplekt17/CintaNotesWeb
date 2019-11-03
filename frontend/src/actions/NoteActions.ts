const addNewTagAction = (name: string) => {
	return {
		type: "ADD_NEW_TAG_ACTION",
		name,
	}
}

const editTagAction = (idx: string) => {
	return {
		type: "EDIT_TAG_ACTION",
		idx,
	}
}

const removeTagAction = (idx: string) => {
	return {
		type: "REMOVE_TAG_ACTION",
		idx,
	}
}

export { addNewTagAction, editTagAction, removeTagAction }
