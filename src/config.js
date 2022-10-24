import dotenv from "dotenv";
dotenv.config();

import user_config from "../config.js";

const config = {
	telegram: {
		token: process.env?.TELEGRAM_TOKEN || user_config?.telegram?.token,
	},
	openWeatherMap: {
		token: process.env?.OPENWEATHERMAP_TOKEN || user_config?.openWeatherMap?.token,
	},
	newsApi: {
		token: process.env?.NEWSAPI_TOKEN || user_config?.newsApi?.token,
	}
};

if (config.telegram.token === undefined) {
	throw new Error("Telegram token is not defined");
}

export default config;
