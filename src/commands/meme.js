import getMeme from "../helpers/getMeme.js";

/**
 * @param {import('telegraf').Context} ctx
 * @returns {Promise<void>}
 */
export const meme = async (ctx) => {
	const meme = await getMeme();
	const isGif = meme.endsWith(".gif");

	const method = isGif ? "sendAnimation" : "sendPhoto";

	await ctx[method](meme, {
		reply_markup: {
			inline_keyboard: [
				[
					{
						text: "Get another meme",
						callback_data: "meme"
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
	bot.command("meme", meme);
	bot.action("meme", meme);
	return [
		{
			command: "meme",
			description: "Get a random meme"
		}
	];
}

