import { ICurrentDetails, ISections, ITags, INotes } from "./TypesReducer"

export interface IAppProps {
	store: {
		auth: boolean,
		loading: boolean,
		loaded: boolean,
		namePopup: string,
		textMessage: string,
		filters: { sections:string, tags:string }
		currentDetails: ICurrentDetails,
		sections: [],
		tags: ITags[],
		notes: INotes[],
	};
	getDataByLoginToApp: (objUser: { login: string, pass: string }) => void;
	getStatusLoginToApp: (token: string) => void;
	createNewUserToApp: (objUser: { login: string, pass: string }) => void;
	addNewSectionToApp: (objSection: {nameSection: string, userId: string}) => void;
	addNewTagToApp: (newTag: { nameTag: any, sectionID: any }) => void;
	addNewNoteToApp: (newNote: {
		header: string,
		text: string,
		remarks: string,
		link: string,
		sectionID: string,
		tagID: string,
	}) => void;
	editSectionToApp: (editedSection: {
		id: string,
		nameSection: string, userId: string
	}) => void;
	editTagToApp: (editedTag: {
		id: string,
		nameTag: string,
		sectionID: string,
	}) => void;
	editNoteToApp: (editedNote: {
		id: string,
		header: string,
		text: string,
		remarks: string,
		link: string,
		sectionID: string,
		tagID: string,
	}) => void;
	removeItemToApp: (name: string, id: string) => void;
	handlerCurrentValueToApp: (name: string, value: string) => void;
	handlerHeaderPopupToApp: (header: string) => void;
	handlerValueFiltersToApp: (filter: string, id: string) => void;
	handlerLangToApp: (lang: string) => void;
	handlerThemeToApp: (lang: string) => void;
}
