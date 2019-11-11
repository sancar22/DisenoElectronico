// Get dom obejcts
const fDate = document.getElementById("fDate");
const fTime = document.getElementById("fTime");
const lDate = document.getElementById("lDate");
const lTime = document.getElementById("lTime");
const dBtn = document.getElementById("dispBtn");
let lat = 10.99304;
let lon = -74.8281;
let flightPlanCoordinates = [];
let flightPlanCoordinates2 = [];
let safe = 0;

function formatdate(date, time) {
	let formDate = `${date.getUTCDate()}-${date.getUTCMonth() +
		1}-${date.getUTCFullYear()} `;
	let formTime = time;
	return {
		formDate,
		formTime
	};
}

function initMap() {
	// Map options
	let opt = {
		zoom: 18,
		center: { lat: parseFloat(lat), lng: parseFloat(lon) }
	};
	// Creating the map
	map = new google.maps.Map(document.getElementById("map"), opt);
	function drawRoad() {
		let flightPath = new google.maps.Polyline({
			path: flightPlanCoordinates,
			geodisc: true,
			strokeColor: "#FF0000",
			strokeOpacity: 1,
			strokeWeight: 4
		});
		flightPath.setMap(map);
		let marker = new google.maps.Marker({
			position: {
				lat: flightPlanCoordinates[0].lat,
				lng: flightPlanCoordinates[0].lng
			},
			map
		});
		map.setCenter(marker.getPosition());
		marker.setMap(null);
		google.maps.event.addListener(flightPath, "click", point => {
			let latlng = point.latLng;
			let needle = {
				minDistance: 9999999999, //silly high
				index: -1,
				latlng: null,
				time: null
			};
			flightPath.getPath().forEach((routePoint, index) => {
				let dist = google.maps.geometry.spherical.computeDistanceBetween(
					latlng,
					routePoint
				);
				if (dist < needle.minDistance) {
					needle.minDistance = dist;
					needle.index = index;
					needle.latlng = routePoint;
					needle.time = flightPlanCoordinates2[index].time;
				}
			});
			let geocoder = new google.maps.Geocoder();
			geocoder.geocode({ location: latlng }, (result, status) => {
				if (status === "OK") {
					if (result[0]) {
						alert(
							"The truck was at: " +
								result[0].formatted_address +
								" at: " +
								needle.time
						);
					}
				} else {
					console.log(result);
				}
			});
		});
	}

	dBtn.addEventListener("click", () => {
		let nFdate = new Date(fDate.value);
		let nLdate = new Date(lDate.value);
		let dateObj = formatdate(nFdate, fTime.value);
		let dateObj2 = formatdate(nLdate, lTime.value);
		let seconds1Date = nFdate.getTime() / 1000;
		let seconds2Date = nLdate.getTime() / 1000;
		let seconds1Hour = dateObj.formTime;
		let seconds2Hour = dateObj2.formTime;
		let a1 = seconds1Hour.split(":");
		let b1 = seconds2Hour.split(":");
		let sec1 = +a1[0] * 60 * 60 + +a1[1] * 60;
		let sec2 = +b1[0] * 60 * 60 + +b1[1] * 60;
		let secTot1 = sec1 + seconds1Date; // segundos totales de la fecha inicial incluyendo segundo de horas
		let secTot2 = sec2 + seconds2Date; // segundos totales de la fecha final incluyendo segundo de horas

		if (secTot1 < secTot2) {
			let data = {
				fDate: dateObj.formDate,
				lDate: dateObj2.formDate,
				fTime: dateObj.formTime,
				lTime: dateObj2.formTime
			};
			axios
				.post("/gps/hist", data)
				.then(response => {
					if (response.data.length == 0) {
						safe = 1;
					} else {
						response.data.map((path, index) => {
							flightPlanCoordinates[index] = {
								lat: path.lat,
								lng: path.lon
							};
							flightPlanCoordinates2[index] = {
								time: path.time
							};
						});
						safe = 0;
					}
				})
				.then(() => {
					if (safe == 0) {
						drawRoad();
					} else {
						alert("No data");
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		} else {
			alert("Rango de fechas erroneas");
		}
	});
}
