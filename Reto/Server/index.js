// Dependencies
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

// Init express
const app = express();

// Import routes
const calls = require("./routes/calls");

const corsOptions = {
	origin: "*",
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Middlewares
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public/")));

app.use("/api", calls);

app.listen(4000, () => {
	console.log("Server on");
});
