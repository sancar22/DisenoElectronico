// Dependencies
import React, { Component, Fragment } from "react";
import {
	GoogleMap,
	LoadScript,
	MarkerClusterer,
	Marker
} from "@react-google-maps/api";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Geocode from "react-geocode";

// Assets
import "./map.scss";
import LeftCol from "../../components/LeftCol";

// Actions
import { getLocations } from "../../actions/locationAction";
import { deleteLocation } from "../../actions/locationAction";

// Conf
Geocode.setApiKey("AIzaSyAaUgFuVypDeWug-2htEXKEssI7TpifSg8");

class Map extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mapCenter: {
				lat: 0,
				lng: 0
			},
			mapZoom: 1,
			calls: []
		};
		this.reloadMap = this.reloadMap.bind(this);
		this.focusMarker = this.focusMarker.bind(this);
		this.deleteMarkerPoint = this.deleteMarkerPoint.bind(this);
	}
	componentWillMount() {
		this.props.getLocations();
		this.reloadMap();
	}
	reloadMap() {
		this.props.getLocations();
		let groupCalls = [];
		let callsID = [];
		let locations = this.props.locations.locations[0];
		let dates = this.props.locations.locations[1];
		let times = [];
		if (locations !== undefined) {
			locations.map((loc, index) => {
				groupCalls[index] = {
					lat: parseFloat(loc[0]),
					lng: parseFloat(loc[1])
				};
				callsID[index] = loc[2];
				return 0;
			});
			dates.map((date, index) => {
				let objDate = new Date(date);
				dates[index] =
					objDate.getUTCDay() +
					"/" +
					objDate.getUTCMonth() +
					"/" +
					objDate.getUTCFullYear();
				times[index] = objDate.getUTCHours() + ":" + objDate.getUTCMinutes();
				return 0;
			});
			this.setState({
				calls: groupCalls,
				callsIDs: callsID,
				callsDates: dates,
				callsTimes: times
			});
		}
		setTimeout(() => {
			this.reloadMap();
		}, 2000);
	}
	focusMarker(lat, lng) {
		if (lat !== 0 && lng !== 0) {
			Geocode.fromLatLng(lat, lng).then(response => {
				const address = response.results[0].formatted_address;
				alert(address);
			});
		} else {
			alert("Invalid coordinates");
		}
		this.setState({
			mapCenter: {
				lat: lat,
				lng: lng
			},
			mapZoom: 20
		});
	}
	deleteMarkerPoint(i) {
		let conf = window.confirm("Desea eliminar esta alerta");
		if (conf) {
			let removeMSG =
				this.state.calls[i].lat +
				":" +
				this.state.calls[i].lng +
				":" +
				this.state.callsIDs[i];
			removeMSG = removeMSG.toString();
			this.props.deleteLocation(removeMSG);
		}
	}
	render() {
		return (
			<Fragment>
				<div className='container-fluid'>
					<div className='row'>
						<LeftCol />
						<div className='col-10'>
							<div className='Map'>
								<LoadScript
									id='script-loader'
									googleMapsApiKey='AIzaSyAPLLzHwARFL3Nbw21l2kv6-Uz0yyy95Kk'
								>
									<GoogleMap
										id='map'
										mapContainerClassName='Map--Map'
										mapContainerStyle={{}}
										zoom={this.state.mapZoom}
										center={this.state.mapCenter}
									>
										<MarkerClusterer
											options={{
												imagePath:
													"https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
											}}
										>
											{clusterer =>
												this.state.calls.map((location, id) => (
													<Marker
														key={id}
														position={location}
														clusterer={clusterer}
														onClick={() => {
															this.deleteMarkerPoint(id);
														}}
													/>
												))
											}
										</MarkerClusterer>
									</GoogleMap>
								</LoadScript>
							</div>
							<table className='Calls'>
								<thead>
									<tr className='Table--Head'>
										<th>ID</th>
										<th>Date</th>
										<th>Time</th>
										<th>Latitude</th>
										<th>Longitude</th>
									</tr>
								</thead>
								<tbody className='Calls--Body'>
									{this.state.calls.map((location, id) => (
										<tr
											key={id}
											id={id}
											className='Calls--Body--Item'
											onClick={() => {
												this.focusMarker(location.lat, location.lng);
											}}
										>
											<td>{this.state.callsIDs[id]}</td>
											<td>{this.state.callsDates[id]}</td>
											<td>{this.state.callsTimes[id]}</td>
											<td>{location.lat}</td>
											<td>{location.lng}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

Map.propTypes = {
	locations: PropTypes.object.isRequired,
	getLocations: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	locations: state.locations
});

export default connect(
	mapStateToProps,
	{ getLocations, deleteLocation }
)(Map);
