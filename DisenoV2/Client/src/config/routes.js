// Dependencies
import React from "react";
import { Route, Switch } from "react-router-dom";

// Components
import App from "../components/app";
import Home from "../components/home";
import Login from "../components/login";
import Register from "../components/register";
import Dashboard from "../components/main/dashboard";
import Historics from "../components/historics";
import LiveMap from "../components/liveMap";
import AddTrucks from "../components/addTrucks";
import PrivateRoute from "../utils/privateRoutes";
import Page404 from "../components/page404";

const AppRoutes = () => (
	<App>
		<Switch>
			<Route path='/' exact component={Home} />
			<Route path='/login' exact component={Login} />
			<Route path='/register' exact component={Register} />
			<PrivateRoute path='/dashboard' exact component={Dashboard} />
			<PrivateRoute path='/historics' exact component={Historics} />
			<PrivateRoute path='/real-time' exact component={LiveMap} />
			<PrivateRoute path='/add-truck' exact component={AddTrucks} />
			<Route component={Page404} />
		</Switch>
	</App>
);

export default AppRoutes;
