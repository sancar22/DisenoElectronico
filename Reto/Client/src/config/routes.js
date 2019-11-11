// Dependencies
import React from "react";
import { Route, Switch } from "react-router-dom";

// Components
import App from "../scenes/App/App";
import Home from "../scenes/Home";
import Map from "../scenes/Map";
import Page404 from "../scenes/Page404";

function AppRoutes() {
	return (
		<App>
			<Switch>
				<Route path='/' exact component={Home} />
				<Route path='/map' exact component={Map} />
				<Route default component={Page404} />
			</Switch>
		</App>
	);
}

export default AppRoutes;
