/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// OpenWeatherMap API Key
const baseURL = "http://api.openweathermap.org/data/2.5/weather?";
const key = "b9186922d7e27088984892c4cedcd3d6";

// GET request for weather data
async function getWeather(zip) {
	const res = await fetch(baseURL + "zip=" + zip + "&appid=" + key);
	try {
		const data = await res.json();
		console.log(data);
		return data;
	} catch(error) {
		console.log("error", error);
	}
}

// POST weather data to server
async function postWeather( url = '', data = {}) {
	const response = await fetch(url, {
	  method: 'POST', 
	  credentials: 'same-origin',
	  headers: {
		  'Content-Type': 'application/json',
	  },        
	  body: JSON.stringify(data), 
	});

	try {
		const newData = await response.json();
		return newData;
	} catch(error) {
		console.log("error", error);
	}
}

// Display data in index.html
async function displayData() {
	const request = await fetch('/data');
	try {
		const data = await request.json();
		console.log(data);
		document.getElementById("date").innerHTML = data.date;
		document.getElementById("temp").innerHTML = data.temperature;
		document.getElementById("content").innerHTML = data.user_response;
	} catch(error) {
		console.log("error", error);
	}
}

function performAction(e){
	const zip = document.getElementById('zip').value;
	const user_response = document.getElementById('feelings').value;
	getWeather(zip)
	.then(function(data){
		console.log("temperature = " + data.main['temp']);
		postWeather('/', {temperature: data.main['temp'], date: newDate, user_response: user_response});
	})
	.then(displayData);
}


// Attach getWeather to Generate button
const generateButton = document.getElementById('generate');
generateButton.addEventListener('click', performAction);
