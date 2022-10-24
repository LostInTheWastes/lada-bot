import config from "../config.js";

export default async (sources = "google-news-ru", pageSize = 3) => new Promise((resolve) => {
	fetch("https://newsapi.org/v2/top-headlines?apiKey=" +
        `${config.newsApi.token}&sources=${sources}&pageSize=${pageSize}`)
		.then(r => r.json())
		.then(res => resolve(res));
});
