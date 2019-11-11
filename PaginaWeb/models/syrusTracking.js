//llamamos al paquete mysql que hemos instalado
const mysql = require("mysql"),
	//creamos la conexion a nuestra base de datos con los datos de acceso de cada uno
	connection = mysql.createConnection({
		host: "avengers.cc2vb3ot4m30.us-east-1.rds.amazonaws.com",
		user: "avenger",
		password: "avenger0102",
		database: "gps"
	});

//creamos un objeto para ir almacenando todo lo que necesitemos
let gpsModel = {};

//obtenemos todos los usuarios
gpsModel.getRasters = callback => {
	if (connection) {
		connection.query(
			"SELECT * FROM `GPS-tracking` ORDER BY id",
			(error, rows) => {
				if (error) {
					throw error;
				} else {
					callback(null, rows);
				}
			}
		);
	}
};

//obtenemos un usuario por su id
gpsModel.getRaster = (id, callback) => {
	if (connection) {
		var sql =
			"SELECT * FROM `GPS-tracking` WHERE id = " + connection.escape(id);
		connection.query(sql, function(error, row) {
			if (error) {
				throw error;
			} else {
				callback(null, row);
			}
		});
	}
};

//añadir una nueva trama
gpsModel.insertRaster = (gpsData, callback) => {
	if (connection) {
		// INSERT INTO `gps`.`GPS-Tracking` (`id`, `Syrus ID`, `GPS-Trama`) VALUES ('1', 'Avengers', '>REV002041663724+1099304-0748281400000032;ID=AVENGERS<');
		connection.query(
			"INSERT INTO `GPS-tracking` SET ?",
			gpsData,
			(error, result) => {
				if (error) {
					throw error;
				} else {
					//devolvemos la última id insertada
					callback(null, { insertId: result.insertId });
				}
			}
		);
	}
};

// Buscamos un rango de fechas
gpsModel.getRange = (range, callback) => {
	let { firstDate, lastDate, firstTime, lastTime } = range;
	if (connection) {
		connection.query(
			"SELECT * FROM `GPS-tracking` WHERE date BETWEEN ? and ? and time BETWEEN ? and ?",
			[firstDate, lastDate, firstTime, lastTime],
			(error, rows) => {
				if (error) {
					throw error;
				} else {
					callback(null, rows);
				}
			}
		);
	}
};

// Buscamos la hora en un punto especifico
gpsModel.getTimes = (point, callback) => {
	let { date, lat, lon } = point;
	if (connection) {
		connection.query(
			"SELECT time FROM `GPS-tracking` WHERE date = ? and FORMAT(lat, 3) = FORMAT(?, 3) and FORMAT(lon, 3) = FORMAT(?, 3)",
			[date, lat, lon],
			(error, rows) => {
				if (error) {
					throw error;
				} else {
					callback(null, rows);
				}
			}
		);
	}
};

//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = gpsModel;
