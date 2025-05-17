import axios from "axios";
export const getUnsplashImage = async (query: string) => {
	const { data } = await axios.get(`
    https://api.unsplash.com/search/photos?per_page=1&query=${query}&client_id=${process.env.UNSPLASH_API_KEY}
    `);
	if (data.results && data.results.length > 0) {
		return data.results[0].urls.small;
	} else {
		throw new Error("No image found for the query");
	}
};
