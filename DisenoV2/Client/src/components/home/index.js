// Dependencies
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Assets
import "./home.css";

class Home extends Component {
	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push("/dashboard");
		}
	}
	render() {
		return (
			<div className='landing'>
				<div className='dark-overlay landing-inner text-light'>
					<div className='container'>
						<div className='row'>
							<div className='col-md-12 text-center'>
								<h1 className='display-4 mb-4'>Truck Trackers</h1>
								<p className='lead'>
									Connect all your trucks to get an accurate way to track them
									in real time and watch the historics of your trips.
								</p>
								<hr />
								<Link to='/register' className='btn btn-lg btn-info mr-2'>
									Sign Up
								</Link>
								<Link to='/login' className='btn btn-lg btn-light'>
									Login
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Home.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps)(Home);
