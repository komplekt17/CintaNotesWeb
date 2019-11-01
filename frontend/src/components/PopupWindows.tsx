import * as React from "react"

interface IAddSectionProps {
	addNewSection: (text: string) => string;
}

export const AddNewSectionPopup: React.FC<IAddSectionProps> = ({
	addNewSection,
}) => {
	return <h2>This is addNewSection Window</h2>
}

export const AddNewTagPopup: React.FC = () => {
	return <h2>This is addNewTag Window</h2>
}

export const AddNewNotePopup: React.FC = () => {
	return <h2>This is addNewNote Window</h2>
}
