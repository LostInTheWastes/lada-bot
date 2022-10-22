export default async (daily = false) => new Promise((resolve, reject) => {
	if (daily) {
		fetch("https://zenquotes.io/api/today")
			.then(r => r.json())
			.then(res => resolve(res))
			.catch(reject);
	} else {
		fetch("https://api.quotable.io/random")
			.then(r => r.json())
			.then(res => resolve(res))
			.catch(reject);
	}

});
