// Dependecies
import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

// Import actions
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

// Components
import AppRoutes from "./config/routes";

import store from "./store";

// Check for token
if (localStorage.Token) {
	// Set auth Token header auth
	setAuthToken(localStorage.Token);

	// Decode the token
	const decoded = jwt_decode(localStorage.Token);

	// Set user and is Authenticated
	store.dispatch(setCurrentUser(decoded));

	// Check for expiration time
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// Logout user
		store.dispatch(logoutUser());

		// Clear current profile
		store.dispatch(clearCurrentProfile());

		// Redirect to login
		window.location.href = "/login";
	}
}

render(
	<Provider store={store}>
		<Router>
			<AppRoutes />
		</Router>
	</Provider>,
	document.getElementById("root")
);
