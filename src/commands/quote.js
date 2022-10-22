import { fmt, italic } from "telegraf/format";
import getQuote from "../helpers/getQuote.js";

/**
 * @param {import('telegraf').Context} ctx
 * @returns {Promise<void>}
 */
export const quote = async (ctx) => {
	try {
		const quote = await getQuote();
		const message = fmt`${italic(quote.content)} — ${quote.author}`;

		await ctx.reply(message, {
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: "Get another quote",
							callback_data: "quote"
						}
					]
				]
			}
		});

	} catch (_) {
		console.log("An error occurred while fetching a quote");
	}
};

/**
   * @param {import('telegraf').Telegraf} bot
   * @returns {{command: String, description: String}[]}
   */
export function register(bot) {
	bot.command("quote", quote);
	bot.action("quote", quote);
	return [
		{
			command: "quote",
			description: "Get a random quote"
		}
	];
}

