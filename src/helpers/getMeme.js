export default async () => new Promise((resolve) => {
	fetch("https://meme-api.herokuapp.com/gimme")
		.then(r => r.json())
		.then(res => resolve(res.url));
});
