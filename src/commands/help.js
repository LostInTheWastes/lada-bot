import { fmt, bold, italic } from "telegraf/format";


const help_text =
fmt`Well hello there!
I'm ${bold`Ladabot`} - A small yet powerful bot made for ${italic`Lada`}.

Want to know what I do? Well I spam Lada at the same time everyday. Sound annoying? Hopefully!

I also have a few commands you can use to interact with me. To see them check out /commands`;

/**
 * @param {import('telegraf').Context} ctx
 * @returns {Promise<void>}
 */
const help = async (ctx) => {

	await ctx.reply(help_text);
};

/**
   * @param {import('telegraf').Telegraf} bot
   * @returns {{command: String, description: String}[]}
   */
export function register(bot) {
	bot.command("help", help);
	return [
		{
			command: "help",
			description: "Get help with the bot"
		}
	];
}

