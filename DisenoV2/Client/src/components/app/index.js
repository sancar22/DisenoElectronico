// Dependencies
import React, { Component } from "react";
import PropTypes from "prop-types";

// Components
import Navbar from "../navbar";
import Footer from "../footer";

// Assets
import "./app.css";

class App extends Component {
	static propTypes = {
		children: PropTypes.object.isRequired
	};
	render() {
		const { children } = this.props;
		return (
			<div className='Main'>
				<Navbar />
				{children}
				<Footer />
			</div>
		);
	}
}

export default App;
