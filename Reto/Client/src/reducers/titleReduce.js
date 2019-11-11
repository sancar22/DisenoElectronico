// Reducer to change title

// Import Action types
import { CHANGE_TITLE } from "../actions/types";

const initialState = {
	title: ""
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CHANGE_TITLE:
			return {
				...state,
				title: action.payload
			};
		default:
			return state;
	}
};
