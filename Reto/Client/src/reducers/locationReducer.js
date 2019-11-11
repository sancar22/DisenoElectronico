// Reducer to fetch locations

// Import Action types
import { GET_LOCATIONS } from "../actions/types";

const initialState = {
	locations: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_LOCATIONS:
			return {
				...state,
				locations: action.payload
			};
		default:
			return state;
	}
};
