// Dependencies
import { combineReducers } from "redux";

// Reducers
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
	auth: authReducer,
	errors: errorReducer,
	profile: profileReducer
});
