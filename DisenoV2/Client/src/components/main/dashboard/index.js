// Dependencies
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// Components
import Spinner from "../common/spinner";

// Assets
import "./dashboard.css";

// Import actions

class Dashboard extends Component {
	componentDidMount() {}

	render() {
		const { user } = this.props.auth;
		const { loading } = this.props.profile;

		let dashboardContent;

		if (loading) {
			dashboardContent = <Spinner />;
		} else {
			// User is logged in but has no profile
			dashboardContent = (
				<div>
					<p className=' lead text-muted'>Welcome {user.user}</p>
					<p>{user.user} please use our services respectfull</p>
					<div className='dashboard-links'>
						<Link
							to='/add-truck'
							className='btn btn-lg btn-info dashboard-link'
						>
							Add Trucks
						</Link>
						<Link
							to='/real-time'
							className='btn btn-lg btn-info dashboard-link'
						>
							Real Time
						</Link>
						<Link
							to='/historics'
							className='btn btn-lg btn-info dashboard-link'
						>
							Historics
						</Link>
					</div>
				</div>
			);
		}

		return (
			<div className='dashboard'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12'>
							<h1 className='display-4'>Dashboard</h1>
							{dashboardContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{}
)(Dashboard);
