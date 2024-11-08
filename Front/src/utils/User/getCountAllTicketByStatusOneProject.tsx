import axios from 'axios';

export default async function getCountAllTicketByStatusOneProject(
	id: string,
	token: string,
	id_project: string
) {
	const baseUrl = process.env.NEXT_PUBLIC_API_URL;
	try {
		let response = await axios.get(
			`${baseUrl}ticket/user/` +
				id +
				'/project/' +
				id_project +
				'/status',
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		return response.data;
	} catch (e) {
		console.log(e);
	}
}
