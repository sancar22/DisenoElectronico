let longitude = document.getElementById("Long");
let latitude = document.getElementById("Lat");
let date = document.getElementById("Date");
let time = document.getElementById("Time");
let now;
let msg;
let nWeeks, day, times, lon, lat, oldLat, oldLon, map, marker, flightPath;
let markers = [];
let flightPlanCoordinates = [];
lat = 10.99304;
lon = -74.8281;
oldLat = lat;
oldLon = lon;
function act(long, lat, dat, tim) {
	longitude.innerText = `Longitude: ${long}`;
	latitude.innerText = `Latitude: ${lat}`;
	date.innerText = `Date: ${dat}`;
	time.innerText = `Time: ${tim}`;
}
function fetchData() {
	fetch("/coord") // Fetching the data from the server
		.then(res => {
			return res.json();
		})
		.then(data => {
			now = new Date(); // To get the internal date
			data = JSON.parse(data);
			oldLat = lat;
			oldLon = lon;
			lat = parseFloat(data.lat);
			lon = parseFloat(data.lon);
			act(
				`${lon}`,
				`${lat}`,
				`${now.getDay()}/${now.getMonth()}/${now.getFullYear()}`,
				`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
			);
		});
}

function initMap() {
	// Map options
	let opt = {
		zoom: 18,
		center: { lat: parseFloat(lat), lng: parseFloat(lon) }
	};
	// Creating the map
	map = new google.maps.Map(document.getElementById("map"), opt);

	let marker = new google.maps.Marker({
		position: { lat: parseFloat(lat), lng: parseFloat(lon) },
		map
	});
	marker.setMap(null);
	marker.position = 0;
	marker.setMap(map);

	function addMarker(latPos, lonPos) {
		marker.setMap(null);
		marker.position = 0;
		marker = new google.maps.Marker({
			position: { lat: parseFloat(latPos), lng: parseFloat(lonPos) },
			map
		});
		marker.setMap(map);
		map.setCenter(marker.getPosition());
	}

	function drawRoad(latPos, lonPos) {
		flightPlanCoordinates.push({
			lat: latPos,
			lng: lonPos
		});

		flightPath = new google.maps.Polyline({
			path: flightPlanCoordinates,
			geodisc: true,
			strokeColor: "#FF0000",
			strokeOpacity: 1,
			strokeWeight: 2
		});
		flightPath.setMap(map);
	}

	function actMap() {
		if (lat != oldLat || lon != oldLon) {
			drawRoad(lat, lon);
			addMarker(lat, lon);
		}
		setTimeout(actMap, 1000);
	}
	actMap();
}
function go() {
	fetchData();
	setTimeout(go, 500); // callback
}
go();
