// Dependencies
import { combineReducers } from "redux";

// Reducers
import coordinatesReducer from "./coordinatesReducer";

export default combineReducers({
	coordinates: coordinatesReducer
});
