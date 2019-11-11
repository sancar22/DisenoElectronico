// Dependencies
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
	GoogleMap,
	LoadScript,
	Marker,
	Polyline
} from "@react-google-maps/api";
import axios from "axios";

// Components

// Assets
import "./livemap.css";

// Import actions
import { getUserTrucks } from "../../actions/profileActions";

class LiveMap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			reload: true,
			selectedTruck: null,
			selectedTruck2: null,
			mapCenter: {
				lat: -3.745,
				lng: -38.523
			},
			coord2: {
				lat: -3.7445,
				lng: -38.5823
			},
			mapZoom: 7,
			flightPath: [],
			flightPath2: [],
			RPM: 0,
			RPM2: 0
		};
		this.onClick = this.onClick.bind(this);
		this.reloadMap = this.reloadMap.bind(this);
	}
	componentDidMount() {
		this.props.getUserTrucks();
	}
	componentWillUnmount() {}
	onClick(truckname) {
		this.setState({
			selectedTruck: truckname,
			mapCenter: {
				lat: -3.745,
				lng: -38.523
			},
			mapZoom: 7,
			flightPath: [],
			RPM: 0
		});
	}
	onClick2(truckname) {
		this.setState({
			selectedTruck2: truckname,
			flightPath2: [],
			RPM2: 0
		});
	}
	reloadMap() {
		const data = {
			truckname: this.state.selectedTruck
		};
		const data2 = {
			truckname: this.state.selectedTruck2
		};
		// First Truck
		axios
			.post("http://34.197.229.47:3000/api/v1/user/liveLocation", data, {
				headers: { "Access-Control-Allow-Origin": "http://34.197.229.47:3000/" }
			})
			.then(res => {
				let location = res.data.location;
				let parseLat;
				let parseLng;
				if (location != null) {
					parseLat = parseFloat(location.Lat);
					parseLng = parseFloat(location.Lng);
				} else {
					parseLat = 0;
					parseLng = 0;
				}
				let latlng = {
					lat: parseLat,
					lng: parseLng
				};
				let RPM = parseFloat(location.RPM);
				if (this.state.flightPath.length < 1 || latlng.lat < 1) {
					this.setState({
						mapCenter: latlng,
						flightPath: [latlng],
						RPM: RPM,
						mapZoom: 15
					});
				} else {
					let newPath = [...this.state.flightPath, latlng];
					this.setState({
						mapCenter: latlng,
						flightPath: newPath,
						RPM: RPM,
						mapZoom: 15
					});
				}
			})
			.then(() => {
				setTimeout(() => {
					this.reloadMap();
				}, 1000);
			});
		// Second Truck
		axios
			.post("http://34.197.229.47:3000/api/v1/user/liveLocation", data2, {
				headers: { "Access-Control-Allow-Origin": "http://34.197.229.47:3000/" }
			})
			.then(res => {
				let location = res.data.location;
				let parseLat;
				let parseLng;
				if (location != null) {
					parseLat = parseFloat(location.Lat);
					parseLng = parseFloat(location.Lng);
				} else {
					parseLat = 0;
					parseLng = 0;
				}
				let latlng = {
					lat: parseLat,
					lng: parseLng
				};
				let RPM = parseFloat(location.RPM);
				if (this.state.flightPath2.length < 1 || latlng.lat < 1) {
					this.setState({
						coord2: latlng,
						flightPath2: [latlng],
						RPM2: RPM,
						mapZoom: 15
					});
				} else {
					let newPath = [...this.state.flightPath2, latlng];
					this.setState({
						coord2: latlng,
						flightPath2: newPath,
						RPM2: RPM,
						mapZoom: 15
					});
				}
			})
			.then(() => {
				if (this.state.reload) {
					setTimeout(() => {
						this.reloadMap();
					}, 1000);
				}
			});
	}

	render() {
		const { user } = this.props.auth;
		const { trucks } = this.props.profile;
		const { selectedTruck } = this.state;
		const { selectedTruck2 } = this.state;
		let map, drop2;
		if (selectedTruck == null) {
			map = <div />;
			drop2 = null;
		} else {
			if (selectedTruck2 == null) {
				map = (
					<div className='LiveMapBox'>
						<LoadScript
							id='script-loader'
							googleMapsApiKey='AIzaSyAaUgFuVypDeWug-2htEXKEssI7TpifSg8'
						>
							<GoogleMap
								id='map'
								mapContainerStyle={{
									height: "40vw",
									width: "70vw",
									borderRadius: "10px",
									margin: "4px"
								}}
								zoom={this.state.mapZoom}
								center={this.state.mapCenter}
							>
								<Marker
									onLoad={marker => {
										this.reloadMap();
									}}
									position={this.state.mapCenter}
								/>
								<Polyline
									path={this.state.flightPath}
									options={{
										strokeColor: "#FF0000",
										strokeOpacity: 0.8,
										strokeWeight: 3,
										fillColor: "#FF0000",
										fillOpacity: 0.35,
										clickable: true,
										draggable: false,
										editable: false,
										visible: true,
										radius: 30000,
										zIndex: 1
									}}
								/>
							</GoogleMap>
						</LoadScript>
						<div className='Stat-Box'>
							<p1 className='Stat-title'>{this.state.selectedTruck} Info</p1>
							<div className='line' />
							<p1 className='Stat-rpm'>RPM: {this.state.RPM}</p1>
							<p1 className='Stat-lat'>Latitude: {this.state.mapCenter.lat}</p1>
							<p1 className='Stat-lng'>
								Longitude: {this.state.mapCenter.lng}
							</p1>
						</div>
					</div>
				);
			} else {
				map = (
					<div className='LiveMapBox'>
						<LoadScript
							id='script-loader'
							googleMapsApiKey='AIzaSyAaUgFuVypDeWug-2htEXKEssI7TpifSg8'
						>
							<GoogleMap
								id='map'
								mapContainerStyle={{
									height: "40vw",
									width: "70vw",
									borderRadius: "10px",
									margin: "4px"
								}}
								zoom={this.state.mapZoom}
								center={this.state.mapCenter}
							>
								<Marker
									onLoad={marker => {
										this.reloadMap();
									}}
									position={this.state.mapCenter}
								/>
								<Marker position={this.state.coord2} />
								<Polyline
									path={this.state.flightPath}
									options={{
										strokeColor: "#FF0000",
										strokeOpacity: 0.8,
										strokeWeight: 3,
										fillColor: "#FF0000",
										fillOpacity: 0.35,
										clickable: true,
										draggable: false,
										editable: false,
										visible: true,
										radius: 30000,
										zIndex: 1
									}}
								/>
								<Polyline
									path={this.state.flightPath2}
									options={{
										strokeColor: "#1da30b",
										strokeOpacity: 0.8,
										strokeWeight: 3,
										fillColor: "#1da30b",
										fillOpacity: 0.35,
										clickable: true,
										draggable: false,
										editable: false,
										visible: true,
										radius: 30000,
										zIndex: 1
									}}
								/>
							</GoogleMap>
						</LoadScript>
						<div className='Stat-Box'>
							<p1 className='Stat-title'>{this.state.selectedTruck} Info</p1>
							<div className='line' />
							<p1 className='Stat-rpm'>RPM: {this.state.RPM}</p1>
							<p1 className='Stat-lat'>Latitude: {this.state.mapCenter.lat}</p1>
							<p1 className='Stat-lng'>
								Longitude: {this.state.mapCenter.lng}
							</p1>
						</div>
						<div className='Stat-Box'>
							<p1 className='Stat-title'>{this.state.selectedTruck2} Info</p1>
							<div className='line' />
							<p1 className='Stat-rpm'>RPM: {this.state.RPM2}</p1>
							<p1 className='Stat-lat'>Latitude: {this.state.coord2.lat}</p1>
							<p1 className='Stat-lng'>Longitude: {this.state.coord2.lng}</p1>
						</div>
					</div>
				);
			}

			drop2 = (
				<div className='dropdown'>
					<button
						className='btn btn-secondary dropdown-toggle'
						type='button'
						id='dropdownMenuButton'
						data-toggle='dropdown'
						aria-haspopup='true'
						aria-expanded='false'
					>
						{selectedTruck2 ? " " + selectedTruck2 + " " : " Truck "}
					</button>
					<div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
						{trucks.map(truck => {
							return (
								<div
									className='dropdown-item'
									key={truck.id}
									type='button'
									onClick={() => {
										this.onClick2(truck.truckname);
									}}
								>
									{truck.truckname}
								</div>
							);
						})}
					</div>
				</div>
			);
		}
		let drop1 = (
			<div className='dropdown'>
				<button
					className='btn btn-secondary dropdown-toggle'
					type='button'
					id='dropdownMenuButton'
					data-toggle='dropdown'
					aria-haspopup='true'
					aria-expanded='false'
				>
					{this.state.selectedTruck
						? " " + this.state.selectedTruck + " "
						: " Truck "}
				</button>
				<div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
					{trucks.map(truck => {
						return (
							<div
								className='dropdown-item'
								key={truck.id}
								type='button'
								onClick={() => {
									this.onClick(truck.truckname);
								}}
							>
								{truck.truckname}
							</div>
						);
					})}
				</div>
			</div>
		);
		return (
			<div className=''>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12'>
							<h1 className='display-4'>Live Map</h1>
							<div>
								<p className=' lead text-muted'>Welcome {user.user}</p>
								<p>Choose the truck you want to track</p>
								<div className='container'>
									<div className='row'>
										<div className='col'>{drop1}</div>
										<div className='col'>{drop2}</div>
									</div>
								</div>
								{map}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

LiveMap.propTypes = {
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	getUserTrucks: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ getUserTrucks }
)(LiveMap);
