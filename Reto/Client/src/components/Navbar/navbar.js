// Dependencies
import React from "react";
import { Link } from "react-router-dom";

function TopNavbar() {
	return (
		<nav className='navbar navbar-expand-lg pt-0 pb-0 '>
			<h1 className='navbar-brand brand'>DFIMO</h1>
			<button
				className='navbar-toggler2'
				type='button'
				data-toggle='collapse'
				data-target='#navbarSupportedContent'
				aria-controls='navbarSupportedContent'
				aria-expanded='false'
				aria-label='Toggle navigation'
			>
				<span className='navbar-toggler-icon' />
			</button>

			<div className='collapse navbar-collapse ' id='navbarSupportedContent'>
				{/* align-items-center */}
				<ul className='but navbar-nav mr-5 ml-auto justify-content-end  '>
					<li className='nav-item mr-3'>
						<Link className='nav-link links' to='/clients'>
							Clientes
						</Link>
					</li>
					<li className='nav-item mr-3'>
						<Link className='nav-link links' to='/about'>
							Acerca de la empresa
						</Link>
					</li>
					<li className='nav-item mr-3'>
						<Link className='nav-link links' to='/contact'>
							Contactenos
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default TopNavbar;
