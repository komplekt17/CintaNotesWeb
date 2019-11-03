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
	addNewSectionToApp: (text: string) => void;
	removeSectionToApp: (id: string) => void;
	handlerInputsValueToApp: (name: string, value: string) => void;
	handlerHeaderPopupToApp: (header: string) => void;
}
