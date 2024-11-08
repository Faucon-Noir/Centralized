import axios from 'axios';

export default async function getUserTeam(id: string, token: string) {
	const baseUrl = process.env.NEXT_PUBLIC_API_URL;
	try {
		let response = await axios.get(`${baseUrl}teamuser/user/` + id, {
			headers: { Authorization: `Bearer ${token}` },
		});
		return response.data;
	} catch (e) {
		console.log(e);
	}
}
