// Import actions
import { FETCH_DATA } from "./types";

export const fetchCoord = () => dispatch => {
	console.log("Llegue a fetch coord");
	fetch("/coord")
		.then(res => {
			return res.json();
		})
		.then(data => {
			data = JSON.parse(data);
			console.log(data);
			dispatch({
				type: FETCH_DATA,
				payload: data
			});
		})
		.catch(err => {
			console.log(err);
		});
};
