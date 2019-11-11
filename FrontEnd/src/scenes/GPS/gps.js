// Dependencies
import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

// Styles
import "./gps.scss";

export class GPSMap extends Component {
	state = {
		selectedPlace: "Hawai",
		lat: 10.99304,
		lon: -74.8281,
		zoom: 18
	};

	componentWillReceiveProps(nextProps) {
		this.setState({
			lon: nextProps.lon,
			lat: nextProps.lat
		});
	}

	render() {
		const style = {
			width: "60%",
			height: "60%",
			position: "relative",
			left: "20%"
		};

		return (
			<div>
				<div className="Box">
					<input placeholder="ID del camion" className="Box--Search" />
					<div className="Box--Button">Seguir</div>
				</div>
				<Map
					style={style}
					google={this.props.google}
					zoom={this.state.zoom}
					initialCenter={{
						lat: this.state.lat,
						lng: this.state.lon
					}}
					center={{
						lat: this.state.lat,
						lng: this.state.lon
					}}
				>
					<Marker
						onClick={this.onMarkerClick}
						name={"Current location"}
						position={{ lat: this.state.lat, lng: this.state.lon }}
					/>
				</Map>
			</div>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: "AIzaSyAaUgFuVypDeWug-2htEXKEssI7TpifSg8"
})(GPSMap);
