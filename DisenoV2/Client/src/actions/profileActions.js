// Dependencies
import axios from "axios";

// Import Action types
import {
	GET_PROFILE,
	PROFILE_LOADING,
	CLEAR_CURRENT_PROFILE,
	GET_TRUCKS,
	CLEAR_ERRORS
} from "./types";

// Add new truck
export const addTrucks = (truckData, history) => dispatch => {
	console.log(truckData);
	axios
		.post("http://34.197.229.47:3000/api/v1/user/addTruck", truckData, {
			headers: { "Access-Control-Allow-Origin": "http://34.197.229.47:3000/" }
		})
		.then(res => history.push("/dashboard"));
};

// Get user trucks list
export const getUserTrucks = () => dispatch => {
	dispatch(setProfileLoading());
	axios
		.get("http://34.197.229.47:3000/api/v1/user/getTrucks", {
			headers: { "Access-Control-Allow-Origin": "http://34.197.229.47:3000/" }
		})
		.then(res => {
			dispatch({
				type: GET_TRUCKS,
				payload: res.data.trucks
			});
		})
		.catch(err =>
			dispatch({
				type: GET_PROFILE,
				payload: {}
			})
		);
};

// Profile loading
export const setProfileLoading = () => {
	return {
		type: PROFILE_LOADING
	};
};

// Clear profile
export const clearCurrentProfile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE
	};
};

// Clear errors
export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS
	};
};
