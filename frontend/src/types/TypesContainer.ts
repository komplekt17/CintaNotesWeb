import { ICurrentDetails } from "./TypesReducer"

export interface IAppProps {
	store: {
		sections: [],
		tags: [],
		notes: [],
		currentDetails: ICurrentDetails,
		namePopup: string,
	};
	getAllNotesToApp: () => void;
	addNewSectionToApp: (value: string) => void;
	editSectionToApp: (id: string, value: string) => void;
	removeSectionToApp: (id: string) => void;
	handlerInputsValueToApp: (name: string, value: string) => void;
	handlerHeaderPopupToApp: (header: string) => void;
}
