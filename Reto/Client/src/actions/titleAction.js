// Import Actions
import { CHANGE_TITLE } from "./types.js";

export const changeTitle = title => dispatch => {
	dispatch({
		type: CHANGE_TITLE,
		payload: title
	});
	document.title = title;
};
