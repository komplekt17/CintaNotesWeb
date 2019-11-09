export interface ICurrentDetails {
	section: {
		_id: string,
		nameSection: string,
	};
	tag: {
		_id: string,
		nameTag: string,
		userID: string,
		sectionID: string,
	};
	note: {
		_id: string,
		header: string,
		text: string,
		remarks: string,
		link: string,
		userID: string,
		sectionID: string,
		tagID: string,
		dateCreated: string,
		dateModified: string,
	};
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
	sections: Array<{
		_id: string,
		nameSection: string,
		userID: string,
	}>;
	tags: Array<{
		_id: string,
		nameTag: string,
		userID: string,
		sectionID: string,
	}>;
	notes: Array<{
		_id: string,
		header: string,
		text: string,
		remarks: string,
		link: string,
		userID: string,
		sectionID: string,
		tagID: string,
		dateCreated: string,
		dateModified: string,
	}>;
}
