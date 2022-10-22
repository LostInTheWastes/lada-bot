import getWeather from "../helpers/getWeather.js";
import { fmt, bold, italic } from "telegraf/format";
import getQuote from "../helpers/getQuote.js";
import * as getRandomQuote from "../commands/quote.js";
import * as getRandomMeme from "../commands/meme.js";

/**
 * @param {import('telegraf').Context} ctx
 * @returns {Promise<void>}
 */
export const goodmorning = async (ctx, chat_id = 906063137) => {
	const random_greeting = [
		"Good morning",
		"Rise and shine",
		"Wakey wakey",
		"Mornin",
		"Good morning, sunshine",
		"Good morning, sleepy head",
	];

	const weather = await getWeather();
	const loc = weather.list[0];

	const weather_message = weather ? fmt`Weather for ${bold(loc.name)}\n
${italic`Temperature`}: ${bold(loc.main.temp.toString())}°C
${italic`Feels like`} ${bold(loc.main.feels_like.toString())}°C
${italic`Humidity`}: ${bold(loc.main.humidity.toString())}%
${italic`Wind`}: ${bold(loc.wind.speed.toString())}m/s
${italic`Clouds`}: ${bold(loc.clouds.all.toString())}%
${italic`Pressure`}: ${bold(loc.main.pressure.toString())}hPa`
		: "We couldn't work out the weather today for some reason... Oh well!";

	const quote_res = await getQuote(true);
	const quote = fmt`Quote of the day:\n${italic(quote_res[0].q)} — ${quote_res[0].a}`;

	const message = fmt`${random_greeting[Math.floor(Math.random() * random_greeting.length)]} Lada!

${weather_message}

${quote}`;

	await ctx.telegram.sendMessage(chat_id, message, {
		reply_markup: {
			inline_keyboard: [
				[
					{
						text: "Get a random meme",
						callback_data: "getRandomMeme"
					},
					{
						text: "Get a random quote",
						callback_data: "getRandomQuote"
					}
				]
			]
		}
	});
};

/**
   * @param {import('telegraf').Telegraf} bot
   * @returns {{command: String, description: String}[]}
   */
export function register(bot) {
	bot.action("getRandomQuote", getRandomQuote.quote);
	bot.action("getRandomMeme", getRandomMeme.meme);
	return [
		{
			command: "goodmorning",
			description: "Get a good morning message"
		}
	];
}

export const schedule = "0 7 * * *";
