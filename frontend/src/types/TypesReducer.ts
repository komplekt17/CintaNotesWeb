export interface ISections {
	_id: string;
	nameSection: string;
	userID: string;
}

export interface ITags {
	_id: string;
	nameTag: string;
	userID: string;
	sectionID: string;
}

export interface INotes {
	_id: string;
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

export interface ICurrentDetails {
	section: ISections;
	tag: ITags;
	note: INotes;
	userProfile: {
		_id: string,
		login: string,
		pass: string,
		status: string,
		lang: string,
		theme: string,
	};
}

export interface IState {
	auth: boolean;
	namePopup: string;
	loading: boolean;
	loaded: boolean;
	error: null;
	filters: { sections: string, tags: string };
	currentDetails: ICurrentDetails;
	sections: ISections[];
	tags: ITags[];
	notes: INotes[];
}
