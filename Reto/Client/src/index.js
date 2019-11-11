// Dependencies
import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import AppRoutes from "./config/routes";
import * as serviceWorker from "./serviceWorker";
import store from "./store";

render(
	<Provider store={store}>
		<BrowserRouter>
			<AppRoutes />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
