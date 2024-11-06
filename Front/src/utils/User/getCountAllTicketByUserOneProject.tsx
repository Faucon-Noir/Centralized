import axios from 'axios';

export default async function getCountAllTicketByUserOneProject(
	id: string,
	token: string,
	id_project: string
) {
	try {
		let response = await axios.get(
			'http://localhost:8000/api/ticket/user/' +
				id +
				'/project/' +
				id_project,
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		return response.data;
	} catch (e) {
		console.log(e);
	}
}
