export interface ISections {
	id: string;
	nameSection: string;
	userID: string;
}

export interface ITags {
	id: string;
	nameTag: string;
	userID: string;
	sectionID: string;
}

export interface INotes {
	id: string;
	header: string;
	text: string;
	remarks: string;
	link: string;
	userID: string;
	sectionID: string;
	tagID: string;
	createdAt: string;
	updatedAt: string;
}

export interface IUserProfile {
	id: string;
	login: string;
	pass: string;
	status: string;
	lang: string;
	theme: string;
}

export interface ICurrentDetails {
	section: ISections;
	tag: ITags;
	note: INotes;
	userProfile: IUserProfile;
}

export interface IState {
	auth: boolean;
	namePopup: string;
	textMessage: string;
	loading: boolean;
	loaded: boolean;
	error: null;
	filters: { sections: string, tags: string };
	currentDetails: ICurrentDetails;
	sections: ISections[];
	tags: ITags[];
	notes: INotes[];
}
