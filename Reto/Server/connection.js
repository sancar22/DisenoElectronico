// Connection with the DB
const mysql = require("mysql");

// Create the connection
let con = mysql.createConnection({
	host: "diseno.cxmeswdphwpd.us-east-1.rds.amazonaws.com",
	user: "dherreraj",
	password: "9805jama",
	database: "diseno"
});

let callsModel = {};

callsModel.getCalls = callback => {
	if (con) {
		let query = "SELECT payload, reg_date FROM diseno.comu";
		con.query(query, (err, rows) => {
			if (err) {
				console.log(err);
			} else {
				callback(null, rows);
			}
		});
	} else {
		console.log("Error with the conection to the DB");
	}
};

callsModel.deleteCall = (payload, callback) => {
	if (con) {
		let query = "DELETE FROM `diseno`.`comu` WHERE `payload`=?";
		con.query(query, [payload], (err, res) => {
			if (err) {
				console.log(err);
				callback(err, null);
			} else {
				callback(null, res);
			}
		});
	} else {
		console.log("Error with the conection to the DB");
	}
};

// Export the model
module.exports = callsModel;
