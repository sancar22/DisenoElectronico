// Dependencies
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Components
import GPSMap from "./gps";

// Import actions
import { fetchCoord } from "../../services/actions/coordinatesActions";

// Styles
import "./gps.scss";

export class GPS extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lat: 10.99304,
			lon: -74.8281
		};
	}

	componentWillMount() {
		fetch("/coord")
			.then(res => {
				return res.json();
			})
			.then(data => {
				data = JSON.parse(data);
				this.setState({
					lat: data.lat,
					lon: data.lon
				});
			})
			.catch(err => {
				console.log(err);
			});
	}
	componentDidMount() {
		fetch("/coord")
			.then(res => {
				return res.json();
			})
			.then(data => {
				data = JSON.parse(data);
				console.log("act");
				this.setState({
					lat: data.lat,
					lon: data.lon
				});
			})
			.catch(err => {
				console.log(err);
			});
	}
	render() {
		return (
			<div>
				<GPSMap lat={this.state.lat} lon={this.state.lat} />
			</div>
		);
	}
}

GPS.propTypes = {
	fetchCoord: PropTypes.func.isRequired,
	lat: PropTypes.object.isRequired,
	coordinates: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	lon: state.coordinates,
	lat: state.lon
});

export default connect(
	mapStateToProps,
	{ fetchCoord }
)(GPS);
