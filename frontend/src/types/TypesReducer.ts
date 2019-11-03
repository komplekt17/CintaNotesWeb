export interface ICurrentDetails {
	section: {
		_id: string,
		nameSection: string,
	};
	tag: {
		_id: string,
		value: string,
	};
	note: {
		_id: string,
		value: string,
	};
	user: {
		_id: string,
		login: string,
		pass: string,
		status: string,
	};
}

export interface IState {
	auth: boolean;
	namePopup: string;
	filter: string;
	loading: boolean;
	loaded: boolean;
	error: null;
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
		userID: string,
		sectionID: string,
		tagID: string,
		dateCreated: string,
		dateModified: string,
	}>;
}
