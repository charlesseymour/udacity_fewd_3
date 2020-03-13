/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// OpenWeatherMap API Key
const baseURL = "http://api.openweathermap.org/data/2.5/weather?";
const key = "b9186922d7e27088984892c4cedcd3d6";

// GET request for weather data
async function getWeather(zip) {
	const res = await fetch(baseURL + "zip=" + zip + "&appid=" + key)
	try {
		const data = await res.json();
		console.log(data)
		return data;
	} catch(error) {
		console.log("error", error);
	}
}

function performAction(e){
	const zip = document.getElementById('zip').value;
	getWeather(zip);
}


// Attach getWeather to Generate button
const generateButton = document.getElementById('generate');
generateButton.addEventListener('click', performAction);
