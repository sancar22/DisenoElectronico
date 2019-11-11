// Dependencies
import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

// Components
import TopNavbar from "./navbar";

// Assets
import "./navbar.scss";

function Navbar(props) {
	const [isMap, setMap] = useState(false);
	let { pathname } = props.location;
	let nav;
	useEffect(() => {
		if (pathname === "/map") {
			setMap(true);
		} else {
			setMap(false);
		}
	}, [pathname]);
	if (isMap) {
		nav = null;
	} else {
		nav = <TopNavbar />;
	}
	return <Fragment>{nav}</Fragment>;
}

export default withRouter(Navbar);
