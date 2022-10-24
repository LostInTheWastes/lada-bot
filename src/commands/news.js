import getNews from "../helpers/getNews.js";

/**
 * @param {import('telegraf').Context} ctx
 * @returns {Promise<void>}
 */
const news = async (ctx, _, src) => {
	try {
		if (src === undefined) {
			await ctx.reply("Pick a news source:", {
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: "BBC News",
								callback_data: "bbc-news",
							},
							{
								text: "Google News (ru)",
								callback_data: "google-news-ru",
							},
							{
								text: "Google News (uk)",
								callback_data: "google-news-uk",
							}
						]
					]
				}
			});
		} else {
			const news = await getNews(src);
			const articles = news.articles;

			const content = articles.map((a, i) => `${i}: <a href="${a.url}">${a.title}</a>`).join("\n");

			ctx.reply(`<b>${articles[0].source.Name}</b>\n${content}`, {
				parse_mode: "HTML",
			});
			ctx.answerCbQuery();
		}
	} catch (error) {
		ctx.reply("Failed to get news at this time, sorry!");
		ctx.answerCbQuery();
	}
};

/**
   * @param {import('telegraf').Telegraf} bot
   * @returns {{command: String, description: String}[]}
   */
export function register(bot) {
	bot.command("news", news);
	bot.action("bbc-news", (ctx, _) => news(ctx, _, "bbc-news"));
	bot.action("google-news-ru", (ctx, _) => news(ctx, _, "google-news-ru"));
	bot.action("google-news-uk", (ctx, _) => news(ctx, _, "google-news-uk"));
	return [
		{
			command: "news",
			description: "Get the news"
		}
	];
}

