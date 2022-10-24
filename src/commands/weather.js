import { fmt, bold, italic } from "telegraf/format";

import getWeather from "../helpers/getWeather.js";

/**
 * @param {import('telegraf').Context} ctx
 * @returns {Promise<void>}
 */
const weather = async (ctx) => {
	let parts = ctx.update.message.text.split(" ");
	parts.shift();
	const location = parts.join(" ") || "moscow";
	console.log(location);
	try {
		const weather = await getWeather(location);
		const loc = weather.list[0];
		const isRaining = loc.rain ? true : false;
		const isSnowing = loc.snow ? true : false;

		const reply =
            fmt`Weather for ${loc.name}
\n${italic`Temperature`}: ${bold(loc.main.temp.toString())}°C
${italic`Feels like`} ${bold(loc.main.feels_like.toString())}°C
${italic`Humidity`}: ${bold(loc.main.humidity.toString())}%
${italic`Wind`}: ${bold(loc.wind.speed.toString())}m/s
${italic`Clouds`}: ${bold(loc.clouds.all.toString())}%
${italic`Pressure`}: ${bold(loc.main.pressure.toString())}hPa

${isRaining ? "It seems to be raining" : "no rain reported"}
${isSnowing ? "It seems to be snowing" : "no snow reported"}`;

		await ctx.reply(reply);


	} catch (error) {
		ctx.reply("Failed to get the weather at this time, sorry!");
	}
};

/**
   * @param {import('telegraf').Telegraf} bot
   * @returns {{command: String, description: String}[]}
   */
export function register(bot) {
	bot.command("weather", weather);
	return [
		{
			command: "weather",
			description: "Get the weather"
		}
	];
}

