// Dependencies
import React, { useState, useEffect } from "react";
import {
	GoogleMap,
	LoadScript,
	MarkerClusterer,
	Marker
} from "@react-google-maps/api";
import Geocode from "react-geocode";

// Assets
import "./request.scss";

// Conf
Geocode.setApiKey("AIzaSyAaUgFuVypDeWug-2htEXKEssI7TpifSg8");

function Request() {
	const [mapCenter, setMapCenter] = useState({
		lat: -3.745,
		lng: -38.523
	});
	const [mapZoom, setMapZoom] = useState(7);
	const [markers, setMarkers] = useState([]);
	const [directions, setDirections] = useState([]);
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(e => {
			setMapCenter({
				lat: e.coords.latitude,
				lng: e.coords.longitude
			});
			setMapZoom(15);
		});
	}, []);
	const addMarker = point => {
		let latLng = {
			lat: point.latLng.lat(),
			lng: point.latLng.lng()
		};
		let newMarkers = [...markers];
		newMarkers.push(latLng);
		setMarkers(newMarkers);
	};
	const deleteMarkerPoint = (i, c) => {
		let conf = window.confirm("Desea eliminar esta alerta");
		if (conf) {
			let newMarkers = [...markers];
			newMarkers.splice(i, 1);
			setMarkers(newMarkers);
		}
	};
	const focusMarker = id => {
		setMapCenter({
			lat: markers[id].lat,
			lng: markers[id].lng
		});
		setMapZoom(20);
	};
	useEffect(() => {
		markers.map((location, index) => {
			Geocode.fromLatLng(location.lat, location.lng).then(response => {
				const address = response.results[0].formatted_address;
				let newDirections = [...directions];
				newDirections.push(address);
				setDirections(newDirections);
			});
			return 0;
		});
		//eslint-disable-next-line
	}, [markers]);

	return (
		<div className='RequestBox'>
			<div className='RequestBox--Menu'>
				<h1 className='RequestBox--Menu--Title'>Garbage List</h1>
				{directions.map((location, id) => (
					<div
						key={id}
						id={id}
						className='RequestBox--Menu--Item'
						onClick={i => focusMarker(id)}
					>
						{location}
					</div>
				))}
			</div>
			<div className='RequestBox--Map'>
				<LoadScript
					id='script-loader'
					googleMapsApiKey='AIzaSyAaUgFuVypDeWug-2htEXKEssI7TpifSg8'
				>
					<GoogleMap
						id='map'
						mapContainerStyle={{
							height: "40vw",
							width: "60vw"
						}}
						zoom={mapZoom}
						center={mapCenter}
						onClick={point => addMarker(point)}
					>
						<MarkerClusterer
							options={{
								imagePath:
									"https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
							}}
						>
							{clusterer =>
								markers.map((location, id) => (
									<Marker
										key={id}
										position={location}
										clusterer={clusterer}
										onClick={() => {
											deleteMarkerPoint(id);
										}}
									/>
								))
							}
						</MarkerClusterer>
					</GoogleMap>
				</LoadScript>
			</div>
		</div>
	);
}

export default Request;
