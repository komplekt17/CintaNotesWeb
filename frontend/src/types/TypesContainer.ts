import { ICurrentDetails, ISections, ITags, INotes } from "./TypesReducer"

export interface IAppProps {
	store: {
		auth: boolean,
		loading: boolean,
		loaded: boolean,
		namePopup: string,
		messagePopup: {category: string, message: string},
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
	addNewTagToApp: (newTag: { 
		nameTag: any,
		sectionId: any,
		userId: string }) => void;
	addNewNoteToApp: (newNote: {
		header: string,
		text: string,
		remarks: string,
		link: string,
		sectionId: string,
		tagId: string,
		userId: string,
	}) => void;
	editSectionToApp: (editedSection: {
		id: string,
		nameSection: string, userId: string
	}) => void;
	editTagToApp: (editedTag: {
		id: string,
		nameTag: string,
		sectionId: string,
		userId: string,
	}) => void;
	editNoteToApp: (editedNote: {
		id: string,
		header: string,
		text: string,
		remarks: string,
		link: string,
		sectionId: string,
		tagId: string,
		userId: string,
	}) => void;
	removeSectionToApp: (sectionId: string) => void;
	removeTagToApp: (tagId: string) => void;
	removeNoteToApp: (noteId: string) => void;
	handlerCurrentValueToApp: (name: string, value: string) => void;
	handlerHeaderPopupToApp: (header: string) => void;
	handlerValueFiltersToApp: (filter: string, id: string) => void;
	handlerLangToApp: (lang: string) => void;
	handlerThemeToApp: (lang: string) => void;
}
