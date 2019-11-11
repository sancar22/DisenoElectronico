// Dependencies
import React, { Component } from "react";

// Assets
import "./footer.css";

class Footer extends Component {
	render() {
		return (
			<div className='bg-dark text-white mt-5 p-4 text-center Main-footer'>
				<footer>
					Copyright &copy; {new Date().getFullYear()} Truck Trackers
				</footer>
			</div>
		);
	}
}

export default Footer;
