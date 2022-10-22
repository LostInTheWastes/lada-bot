import config from "../config.js";

export default async (location = "moscow") => new Promise((resolve, reject) => {
	const owm_url = `https://api.openweathermap.org/data/2.5/find?q=${location}&type=accurate&APPID=${config.openWeatherMap.token}&units=metric`;

	fetch(owm_url)
		.then(async res => res.json())
		.then(data => {
			resolve(data);
		})
		.catch(reject);
});
