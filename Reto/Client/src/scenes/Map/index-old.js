// Dependencies
import React, { Fragment, useState, useEffect } from "react";
import {
	GoogleMap,
	LoadScript,
	MarkerClusterer,
	Marker
} from "@react-google-maps/api";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Assets
import "./map.scss";
import LeftCol from "../../components/LeftCol";

// Actions
import { getLocations } from "../../actions/locationAction";

function Map(props) {
	const [center, setCenter] = useState({
		lat: -3.745,
		lng: -38.523
	});
	const [zoom, setZoom] = useState(0);
	const [calls, setCalls] = useState([]);
	function refreshData() {
		let groupCalls = [];
		props.getLocations();
		if (props.locations.locations !== []) {
			props.locations.locations.map((loc, index) => {
				groupCalls[index] = {
					lat: parseFloat(loc[0]),
					lng: parseFloat(loc[1])
				};
				return 0;
			});
			setCalls(groupCalls);
		}
		setTimeout(refreshData(), 3000);
	}
	refreshData();
	const deleteMarkerPoint = (i, c) => {
		let conf = window.confirm("Desea eliminar esta alerta");
		if (conf) {
			let newCalls = [...calls];
			newCalls.splice(i, 1);
			setCalls(newCalls);
		}
	};
	const focusMarker = (lat, lng) => {
		setCenter({
			lat: lat,
			lng: lng
		});
		setZoom(20);
	};
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
									mapContainerStyle={{ height: "25vw", width: "75vw" }}
									zoom={zoom}
									center={center}
								>
									<MarkerClusterer
										options={{
											imagePath:
												"https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
										}}
									>
										{clusterer =>
											calls.map((location, id) => (
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
						<div className='Calls '>
							{calls.map((location, id) => (
								<div
									key={id}
									id={id}
									className='Calls--Item'
									onClick={() => {
										focusMarker(location.lat, location.lng);
									}}
								>
									{location.lat} | {location.lng}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
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
	{ getLocations }
)(Map);
