// Dependencies
import React, { Component } from "react";
import { Link } from "react-router-dom";

// Assets
import "./LeftCol.css";
import logo from "../../Assets/whitelogo.png";

class LeftCol extends Component {
	render() {
		return (
			<div className='colm col-md-2 text-light'>
				<div className='title row mx-auto'>
					<h1>DFIMO</h1>
				</div>
				<div className='tag '>
					<Link to='' className='fas fa-user' />
					<Link to='#' className='text-light'>
						{"   "}My profile
					</Link>
				</div>
				<div className='tag'>
					<Link to='' className='fas fa-home ' />
					<Link to='#' className='text-light'>
						{"   "}
						{"   "}Home
					</Link>
				</div>
				<div className='tag'>
					<Link to='' className='fas fa-users text-secondary' />
					<Link to='' className=' text-secondary'>
						{"   "}Family Devices
					</Link>
				</div>
				<div className='tag'>
					<Link to='' className='fas fa-cog' />
					<Link to='/' className=' text-light'>
						{"   "}Log out
					</Link>
				</div>
				<img src={logo} alt='Logo' className='Image' />
			</div>
		);
	}
}

export default LeftCol;
