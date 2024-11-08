import axios from 'axios';

export default async function getProjectRex(id: string, token: string) {
	const baseUrl = process.env.NEXT_PUBLIC_API_URL;
	try {
		let response = await axios.get(`${baseUrl}rex/project/` + id, {
			headers: { Authorization: `Bearer ${token}` },
		});
		if (response.data.error) return {};
		return response.data;
	} catch (e) {
		console.log(e);
	}
}
