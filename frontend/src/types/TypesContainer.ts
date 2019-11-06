import { ICurrentDetails } from "./TypesReducer"

export interface IAppProps {
	store: {
		auth: boolean,
		namePopup: string,
		currentDetails: ICurrentDetails,
		sections: [],
		tags: [],
		notes: [],
	};
	getDataByLoginToApp: (user: { login: any, pass: any }) => void;
	getStatusLoginToApp: (token: string) => void;
	addNewSectionToApp: (value: string) => void;
	addNewTagToApp: (newTag: { nameTag: any, sectionID: any }) => void;
	editSectionToApp: (editedSection: {
		id: string,
		nameSection: string,
	}) => void;
	editTagToApp: (editedTag: {
		id: string,
		nameTag: string,
		sectionID: string,
	}) => void;
	removeItemToApp: (name: string, id: string) => void;
	handlerCurrentValueToApp: (name: string, value: string) => void;
	handlerHeaderPopupToApp: (header: string) => void;
}
