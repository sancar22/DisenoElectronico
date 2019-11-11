// Dependencies
import React from "react";
import PropTypes from "prop-types";

// Assets
import "./App.scss";

// Components
//import Navbar from "../../components/Navbar";

function App(props) {
	const { children } = props;
	return <div className='Main'>{children}</div>;
}

App.propTypes = {
	children: PropTypes.object.isRequired
};

export default App;
