export interface ISections {
	id: string;
	nameSection: string;
	userId: string;
}

export interface ITags {
	id: string;
	nameTag: string;
	userId: string;
	sectionId: string;
}

export interface INotes {
	id: string;
	header: string;
	text: string;
	remarks: string;
	link: string;
	userId: string;
	sectionId: string;
	tagId: string;
	createdAt: string;
	updatedAt: string;
}

export interface IUserProfile {
	id: string;
	login: string;
	token: string;
	status: string;
	lang: string;
	theme: string;
}

export interface ICurrentDetails {
	section: ISections;
	tag: ITags;
	note: INotes;
	userProfile: IUserProfile;
	searchDetails: { searchSort: string, searchText: string };
}

export interface IState {
	auth: boolean;
	namePopup: string;
	messagePopup: {category: string, message: string}
	loading: boolean;
	loaded: boolean;
	error: null;
	filters: { sections: string, tags: string };
	currentDetails: ICurrentDetails;
	sections: ISections[];
	tags: ITags[];
	notes: INotes[];
}
