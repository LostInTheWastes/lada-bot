/**
 * @param {import('telegraf').Context} ctx
 * @returns {Promise<void>}
 */
const help = async (ctx) => {
	await ctx.reply("Welcome to Lada bot! This is a little project made for Lada.\nTry /help");
};

/**
   * @param {import('telegraf').Telegraf} bot
   * @returns {{command: String, description: String}[]}
   */
export function register(bot) {
	bot.command("start", help);
	return [
		{
			command: "start",
			description: "start the bot!"
		}
	];
}

