import { combineReducers } from "redux";

// Reducers
import titleReducer from "./titleReduce";
import locationReducer from "./locationReducer";

export default combineReducers({
	titleName: titleReducer,
	locations: locationReducer
});
