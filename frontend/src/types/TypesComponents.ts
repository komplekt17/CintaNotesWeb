export interface IAddSectionProps {
	addNewSection: (nameButton: string) => void;
	handlerInputsValue: (nameInput: string, value: string) => void;
	inputValueSection: string;
	namePopup: string;
}

export interface IRemoveSectionProps {
	removeSection: (id: string) => void;
	handlerInputsValue: (nameInput: string, value: string) => void;
	namePopup: string;
	idRemovedSection: string;
}

export interface ISectionsPanelProps {
	sections: [];
	handlerHeaderPopup: (name: string) => void;
	handlerInputsValue: (nameInput: string, value: string) => void;
}
