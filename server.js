// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes

const express = require('express');

// Start up an instance of app

const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

const cors = require('cors');
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 8000;
const server = app.listen(port, listening);
function listening () {
	console.log("Server running");
}

// GET route
app.get('/data', function (request, response) {
    response.send(projectData);
});

// POST route
app.post('/', function (request, response) {
	let data = request.body;
	console.log("data = " + JSON.stringify(data));
	projectData['temperature'] = data.temperature;
	projectData['date'] = data.date,
	projectData['user_response'] = data.user_response;
	console.log("projectData = " + JSON.stringify(projectData));
	response.send(projectData);
});




