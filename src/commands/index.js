import * as help from "./help.js";
import * as start from "./start.js";
import * as weather from "./weather.js";
import * as meme from "./meme.js";
import * as quote from "./quote.js";
import * as goodmorning from "../scheduled/goodmorning.js";

export const commands = [
	start,
	help,
	weather,
	meme,
	quote,
	goodmorning,
];

/**
 * @param {import('telegraf').Context} bot
 */
const Commands = async (bot) => {
	return commands.map(command => command.register(bot)).flat();
};

export default Commands;
