import axios from 'axios';

export default async function getUserTeam(id: string, token: string) {
	try {
		let response = await axios.get(
			'http://localhost:8000/api/teamuser/user/' + id,
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		return response.data;
	} catch (e) {
		console.log(e);
	}
}
