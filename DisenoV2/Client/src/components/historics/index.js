// Dependencies
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import { GoogleMap, LoadScript, Polyline } from "@react-google-maps/api";
import axios from "axios";

// Components

// Assets
import "react-datepicker/dist/react-datepicker.css";

// Import actions
import { getUserTrucks } from "../../actions/profileActions";

class Historics extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTruck: null,
			selectedTruck2: null,
			startDate: new Date(),
			endDate: new Date(),
			startDate2: new Date(),
			endDate2: new Date(),
			mapCenter: {
				lat: -3.745,
				lng: -38.523
			},
			mapZoom: 7,
			flightPath: [{ lat: -3.745, lng: -38.523 }],
			flightPathTruck2: [{ lat: -3.745, lng: -38.523 }]
		};
		this.onClick = this.onClick.bind(this);
		this.onClick2 = this.onClick2.bind(this);
		this.handleChangeStart = this.handleChangeStart.bind(this);
		this.handleChangeEnd = this.handleChangeEnd.bind(this);
		this.fetchHistorics = this.fetchHistorics.bind(this);
		this.polylineClick = this.polylineClick.bind(this);
		this.polylineClick2 = this.polylineClick2.bind(this);
	}
	componentDidMount() {
		this.props.getUserTrucks();
	}
	onClick(truckname) {
		this.setState({
			selectedTruck: truckname
		});
	}
	onClick2(truckname) {
		this.setState({
			selectedTruck2: truckname
		});
	}
	handleChangeStart(date) {
		this.setState({
			startDate: date
		});
	}
	handleChangeEnd(date) {
		this.setState({
			endDate: date
		});
	}
	fetchHistorics() {
		let sDate = this.state.startDate;
		let sTime = `${sDate.getHours()}:${sDate.getMinutes()}`;
		sDate = `${sDate.getDate()}-${sDate.getMonth() +
			1}-${sDate.getFullYear()} `;
		let fDate = this.state.endDate;
		let fTime = `${fDate.getHours()}:${fDate.getMinutes()}`;
		fDate = `${fDate.getDate()}-${fDate.getMonth() +
			1}-${fDate.getFullYear()} `;

		const data = {
			truckname: this.state.selectedTruck,
			startDate: sDate,
			startTime: sTime,
			endDate: fDate,
			endTime: fTime
		};
		axios
			.post("http://34.197.229.47:3000/api/v1/user/getLocations", data, {
				headers: { "Access-Control-Allow-Origin": "http://34.197.229.47:3000/" }
			})
			.then(res => {
				let locations = res.data.locations;
				let paths = [];
				let pathsTimes = [];
				locations.map((path, index) => {
					paths[index] = {
						lat: parseFloat(path.Lat),
						lng: parseFloat(path.Lng)
					};
					pathsTimes[index] = {
						time: path.Time,
						rpm: path.RPM
					};
					return 0;
				});
				this.setState({
					flightPath: paths,
					flightPath2: pathsTimes,
					mapCenter: paths[0],
					mapZoom: 15
				});
			});
		if (this.state.selectedTruck2 != null) {
			const data2 = {
				truckname: this.state.selectedTruck2,
				startDate: sDate,
				startTime: sTime,
				endDate: fDate,
				endTime: fTime
			};
			axios
				.post("http://34.197.229.47:3000/api/v1/user/getLocations", data2, {
					headers: {
						"Access-Control-Allow-Origin": "http://34.197.229.47:3000/"
					}
				})
				.then(res => {
					let locations = res.data.locations;
					let paths = [];
					let pathsTimes = [];
					locations.map((path, index) => {
						paths[index] = {
							lat: parseFloat(path.Lat),
							lng: parseFloat(path.Lng)
						};
						pathsTimes[index] = {
							time: path.Time,
							rpm: path.RPM
						};
						return 0;
					});
					this.setState({
						flightPathTruck2: paths,
						flightPath2Truck2: pathsTimes,
						coord2: paths[0]
					});
				});
		}
	}
	polylineClick(point) {
		let latlng = point.latLng;

		let needle = {
			minDistance: 9999999999,
			index: -1,
			latlng: null,
			time: null,
			rpm: null
		};
		this.state.flightPath.map((routePoint, index) => {
			// http://www.movable-type.co.uk/scripts/latlong.html
			const lat1 = latlng.lat();
			const lon1 = latlng.lng();

			const lat2 = routePoint.lat;
			const lon2 = routePoint.lng;

			const R = 6371e3; // earth radius in meters
			const φ1 = lat1 * (Math.PI / 180);
			const φ2 = lat2 * (Math.PI / 180);
			const Δφ = (lat2 - lat1) * (Math.PI / 180);
			const Δλ = (lon2 - lon1) * (Math.PI / 180);

			const a =
				Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
				Math.cos(φ1) * Math.cos(φ2) * (Math.sin(Δλ / 2) * Math.sin(Δλ / 2));

			const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

			let dist = R * c;

			if (dist < needle.minDistance) {
				needle.minDistance = dist;
				needle.index = index;
				needle.latlng = routePoint;
				needle.time = this.state.flightPath2[index].time;
				needle.rpm = this.state.flightPath2[index].rpm;
			}

			return 0;
		});
		alert("The truck was here at: " + needle.time + " and with: " + needle.rpm);
	}
	polylineClick2(point) {
		let latlng = point.latLng;

		let needle = {
			minDistance: 9999999999,
			index: -1,
			latlng: null,
			time: null,
			rpm: null
		};
		this.state.flightPathTruck2.map((routePoint, index) => {
			// http://www.movable-type.co.uk/scripts/latlong.html
			const lat1 = latlng.lat();
			const lon1 = latlng.lng();

			const lat2 = routePoint.lat;
			const lon2 = routePoint.lng;

			const R = 6371e3; // earth radius in meters
			const φ1 = lat1 * (Math.PI / 180);
			const φ2 = lat2 * (Math.PI / 180);
			const Δφ = (lat2 - lat1) * (Math.PI / 180);
			const Δλ = (lon2 - lon1) * (Math.PI / 180);

			const a =
				Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
				Math.cos(φ1) * Math.cos(φ2) * (Math.sin(Δλ / 2) * Math.sin(Δλ / 2));

			const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

			let dist = R * c;

			if (dist < needle.minDistance) {
				needle.minDistance = dist;
				needle.index = index;
				needle.latlng = routePoint;
				needle.time = this.state.flightPath2Truck2[index].time;
				needle.rpm = this.state.flightPath2Truck2[index].rpm;
			}
			return 0;
		});
		alert(
			"The second truck was here at: " +
				needle.time +
				" and with: " +
				needle.rpm
		);
	}

	render() {
		const { user } = this.props.auth;
		const { trucks } = this.props.profile;
		const { selectedTruck } = this.state;
		let map;
		let drop1, drop2;
		drop1 = (
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
		if (selectedTruck == null) {
			map = <div />;
		} else {
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
						{this.state.selectedTruck2
							? " " + this.state.selectedTruck2 + " "
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
			if (this.state.selectedTruck2 == null) {
				map = (
					<div>
						<LoadScript
							id='script-loader'
							googleMapsApiKey='AIzaSyAaUgFuVypDeWug-2htEXKEssI7TpifSg8'
						>
							<GoogleMap
								id='map'
								mapContainerStyle={{
									height: "40vw",
									width: "80vw",
									borderRadius: "10px",
									margin: "4px"
								}}
								zoom={this.state.mapZoom}
								center={this.state.mapCenter}
							>
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
										radius: 300,
										zIndex: 1
									}}
									onClick={point => {
										this.polylineClick(point);
									}}
								/>
							</GoogleMap>
						</LoadScript>
						<div
							className='btn btn-info btn-block mt-4'
							onClick={this.fetchHistorics}
						>
							Show data
						</div>
					</div>
				);
			} else {
				map = (
					<div>
						<LoadScript
							id='script-loader'
							googleMapsApiKey='AIzaSyAaUgFuVypDeWug-2htEXKEssI7TpifSg8'
						>
							<GoogleMap
								id='map'
								mapContainerStyle={{
									height: "40vw",
									width: "80vw",
									borderRadius: "10px",
									margin: "4px"
								}}
								zoom={this.state.mapZoom}
								center={this.state.mapCenter}
							>
								<Polyline
									path={this.state.flightPath}
									options={{
										strokeColor: "#FF0000",
										strokeOpacity: 0.8,
										strokeWeight: 6,
										fillColor: "#FF0000",
										fillOpacity: 0.35,
										clickable: true,
										draggable: false,
										editable: false,
										visible: true,
										radius: 300,
										zIndex: 1
									}}
									onClick={point => {
										this.polylineClick(point);
									}}
								/>
								<Polyline
									path={this.state.flightPathTruck2}
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
										radius: 300,
										zIndex: 1
									}}
									onClick={point => {
										this.polylineClick2(point);
									}}
								/>
							</GoogleMap>
						</LoadScript>
						<div
							className='btn btn-info btn-block mt-4'
							onClick={this.fetchHistorics}
						>
							Show data
						</div>
					</div>
				);
			}
		}
		return (
			<div className=''>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12'>
							<h1 className='display-4'>Historics</h1>
							<div>
								<p className=' lead text-muted'>Welcome {user.user}</p>
								<p>Choose the truck you want to see the historics</p>
								<div className='container'>
									<div className='row'>
										<div className='col'>{drop1}</div>
										<div className='col'>{drop2}</div>
									</div>
								</div>
								<div>Date Picker</div>
								<DatePicker
									selected={this.state.startDate}
									selectsStart
									startDate={this.state.startDate}
									endDate={this.state.endDate}
									onChange={this.handleChangeStart}
									showTimeSelect
								/>

								<DatePicker
									selected={this.state.endDate}
									selectsEnd
									startDate={this.state.startDate}
									endDate={this.state.endDate}
									onChange={this.handleChangeEnd}
									showTimeSelect
								/>
								{map}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Historics.propTypes = {
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
)(Historics);
