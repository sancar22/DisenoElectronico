// Dependencies
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// Styles
import "./navbar.scss";

// Assets
import Logo from "../../images/img1.png";

class Navbar extends Component {
	state = {
		mobile: true
	};

	navClick = route => {
		this.setState({ mobile: true });
		this.props.history.push(route);
	};

	handleClick = () => {
		this.setState({ mobile: !this.state.mobile });
	};

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	onClick = route => {
		this.props.history.push(route);
	};

	renderMobileButtons = () => {
		return (
			<div className={"Navbar-Mobile-Links"}>
				<LinkMobileButton
					push={this.navClick.bind(this, "/")}
					name={"Inicio"}
					icon={"fa-home"}
				/>
				<LinkMobileButton
					push={this.navClick.bind(this, "/gps")}
					name={"GPS"}
					icon={"fa-tags"}
				/>
				<LinkMobileButton
					push={this.navClick.bind(this, "/contact")}
					name={"Contacto"}
					icon={"fa-envelope"}
				/>
			</div>
		);
	};

	render() {
		return (
			<>
				<div className={"Navbar-Main"}>
					<img
						className={"Navbar-Main--Logo"}
						src={Logo}
						alt="Truck Tracker Logo"
					/>
					<div className={"Navbar-Main--Contact"}>
						<div className={"Navbar-Main--Contact--Field"}>
							<i className="fab fa-whatsapp Navbar-Main--Contact--Icon" />
							317-382-2733
						</div>
					</div>
				</div>
				<div className={"Navbar-Links"}>
					<LinkButton
						push={this.navClick.bind(this, "/")}
						name={"Inicio"}
						icon={"fa-home"}
					/>
					<LinkButton
						push={this.navClick.bind(this, "/gps")}
						name={"GPS"}
						icon={"fa-globe"}
					/>
					<LinkButton
						push={this.navClick.bind(this, "/contact")}
						name={"Contacto"}
						icon={"fa-envelope"}
					/>
				</div>
				<div className={"Navbar-Mobile"}>
					<i
						onClick={this.handleClick}
						className="fas fa-bars Navbar-Mobile--Menu"
					/>
				</div>
				{this.state.mobile ? null : this.renderMobileButtons()}
			</>
		);
	}
}

function LinkButton(props) {
	return (
		<div onClick={props.push} className={"LinkButton"}>
			<i className={"fas LinkButton--Icon " + props.icon} />
			{props.name}
		</div>
	);
}

function LinkMobileButton(props) {
	return (
		<div onClick={props.push} className={"LinkMobileButton"}>
			<i className={"fas LinkMobileButton--Icon " + props.icon} />
			{props.name}
		</div>
	);
}

export default withRouter(Navbar);
