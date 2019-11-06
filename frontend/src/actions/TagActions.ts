// добавление tag
const addNewTagAction = (newTag: { nameTag: any, sectionID: any }) => {
	return {
		type: "ADD_NEW_TAG_ACTION",
		newTag,
	}
}

// редактирование tag
const editTagAction = (editedTag: {
	id: string,
	nameTag: string,
	sectionID: string,
}) => {
	return {
		type: "EDIT_TAG_ACTION",
		editedTag,
	}
}

export { addNewTagAction, editTagAction }
