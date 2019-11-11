// Dependencies
import axios from "axios";
import jwt_decode from "jwt-decode";

// Import Action types
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Import Utils
import setAuthToken from "../utils/setAuthToken";

// Register User
export const registerUser = (userData, history) => dispatch => {
	axios
		.post("http://34.197.229.47:3000/api/v1/user/register", userData, {
			headers: { "Access-Control-Allow-Origin": "http://34.197.229.47:3000/" }
		})
		.then(res => history.push("/login"))
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

export const loginUser = userData => dispatch => {
	axios
		.post("http://34.197.229.47:3000/api/v1/user/login", userData, {
			headers: { "Access-Control-Allow-Origin": "http://34.197.229.47:3000/" }
		})
		.then(res => {
			// Save to Local Storage
			const { token } = res.data;

			// Store token in LocalStorage
			localStorage.setItem("Token", token);

			// Set Token to Auth Header
			setAuthToken(token);

			// Decode token to get user data
			const decoded = jwt_decode(token);

			// Set current user
			dispatch(setCurrentUser(decoded));
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

// Set logged in user
export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
};

// Logout user
export const logoutUser = () => dispatch => {
	// Remove the token from localStorage
	localStorage.removeItem("Token");

	// Remove the authHeader
	setAuthToken(false);

	// Set current user to empty
	dispatch(setCurrentUser({}));
};
