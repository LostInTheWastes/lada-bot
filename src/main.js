import { Telegraf } from "telegraf";
import config from "./config.js";

const bot = new Telegraf(config.telegram.token);

bot.start((ctx) => ctx.reply("Test!"));
