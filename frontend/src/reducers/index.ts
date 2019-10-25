const initialState = {
	auth: false,
	textModal: "",
	filter: "all",
	loading: false,
	loaded: false,
	error: null,
	sections: [
		{ _id: "1", nameSection: "Tab-1", userID: "1" },
		{ _id: "2", nameSection: "Tab-2", userID: "1" },
		{ _id: "3", nameSection: "Tab-3", userID: "1" },
	],
	tags: [
		{ _id: "1", nameTag: "audiobooks", userID: "1", sectionID: "1" },
		{ _id: "2", nameTag: "webgames", userID: "1", sectionID: "2" },
		{ _id: "3", nameTag: "programs", userID: "1", sectionID: "3" },
	],
	notes: [
		{
			_id: "1",
			header: "aud-1",
			text:
				"txt-aud-1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nostrum at, itaque error perferendis necessitatibus. At ut dolorum velit, officiis rerum vel impedit repellendus consequatur doloribus rem beatae! Illo, delectus!",
			userID: "1",
			sectionID: "1",
			tagID: "1",
			dateCreated: "20.10.2019, 11:34",
			dateModified: "21.10.2019, 12:31",
		},
		{
			_id: "2",
			header: "aud-2",
			text:
				"txt-aud-2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nostrum at, itaque error perferendis necessitatibus. At ut dolorum velit, officiis rerum vel impedit repellendus consequatur doloribus rem beatae! Illo, delectus!",
			userID: "1",
			sectionID: "1",
			tagID: "1",
			dateCreated: "21.10.2019, 11:31",
			dateModified: "22.10.2019, 13:31",
		},
		{
			_id: "3",
			header: "web-1",
			text:
				"txt-web-1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nostrum at, itaque error perferendis necessitatibus. At ut dolorum velit, officiis rerum vel impedit repellendus consequatur doloribus rem beatae! Illo, delectus!",
			userID: "1",
			sectionID: "1",
			tagID: "2",
			dateCreated: "23.10.2019, 10:34",
			dateModified: "24.10.2019, 12:11",
		},
		{
			_id: "4",
			header: "web-2",
			text:
				"txt-web-2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nostrum at, itaque error perferendis necessitatibus. At ut dolorum velit, officiis rerum vel impedit repellendus consequatur doloribus rem beatae! Illo, delectus!",
			userID: "1",
			sectionID: "1",
			tagID: "2",
			dateCreated: "22.10.2019, 10:34",
			dateModified: "23.10.2019, 10:36",
		},
		{
			_id: "5",
			header: "pro-1",
			text:
				"txt-pro-1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nostrum at, itaque error perferendis necessitatibus. At ut dolorum velit, officiis rerum vel impedit repellendus consequatur doloribus rem beatae! Illo, delectus!",
			userID: "1",
			sectionID: "1",
			tagID: "3",
			dateCreated: "20.10.2019, 11:34",
			dateModified: "21.10.2019, 12:31",
		},
		{
			_id: "6",
			header: "pro-2",
			text:
				"txt-pro-2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nostrum at, itaque error perferendis necessitatibus. At ut dolorum velit, officiis rerum vel impedit repellendus consequatur doloribus rem beatae! Illo, delectus!",
			userID: "1",
			sectionID: "1",
			tagID: "3",
			dateCreated: "23.10.2019, 10:31",
			dateModified: "25.10.2019, 15:33",
		},
	],
}

const Reducer = (state = initialState, action: any) => {
	switch (action.type) {
		case "GET_ALL_NOTES_ACTION":
			return {
				...state,
				loading: false,
				loaded: true,
			}

		default:
			return state
	}
}

export default Reducer
