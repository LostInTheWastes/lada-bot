import { Telegraf } from "telegraf";
import config from "./config.js";
import Commands from "./commands/index.js";
import * as goodmorning from "./scheduled/goodmorning.js";
import { scheduleJob } from "node-schedule";

const bot = new Telegraf(config.telegram.token);

const commands = await Commands(bot);

bot.command("commands", (ctx) => {
	const cmds = commands.map(cmd => `/${cmd.command} - ${cmd.description}`).join("\n");
	ctx.reply(cmds);
});

scheduleJob(goodmorning.schedule, async () => {
	console.log("Running scheuled task");
	// LKD ID: 187988804
	// Lada ID: 906063137
	await goodmorning.goodmorning(bot, 906063137);
});

bot.telegram.setMyCommands(commands);
bot.launch();
