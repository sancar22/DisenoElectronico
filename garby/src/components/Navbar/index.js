// Dependencies
import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";

// Assets
import "./navbar.scss";

function Navbar(props) {
	return (
		<Fragment>
			<nav className='navbar navbar-expand-lg navbar-light bg-secondary'>
				<div className='navbar-brand navBtn' href='#'>
					Garby
				</div>
				<button
					className='navbar-toggler'
					type='button'
					data-toggle='collapse'
					data-target='#navbarNav'
					aria-controls='navbarNav'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon' />
				</button>
				<div className='collapse navbar-collapse' id='navbarNav'>
					<ul className='navbar-nav'>
						<li className='nav-item ml-4 active'>
							<div
								className='nav-link navBtn'
								onClick={() => {
									props.history.push("/");
								}}
							>
								Home
							</div>
						</li>
						<li className='nav-item ml-4 active'>
							<div
								className='nav-link navBtn'
								onClick={() => {
									props.history.push("/request");
								}}
							>
								Request
							</div>
						</li>
						<li className='nav-item ml-4 active'>
							<div
								className='nav-link navBtn'
								onClick={() => {
									props.history.push("/about");
								}}
							>
								About Us
							</div>
						</li>
					</ul>
				</div>
			</nav>
		</Fragment>
	);
}

export default withRouter(Navbar);
