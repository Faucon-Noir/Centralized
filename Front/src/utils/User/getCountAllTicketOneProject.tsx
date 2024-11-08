import axios from 'axios';

export default async function getCountAllTicketOneProject(
	id: string,
	token: string,
	id_project: string
) {
	const baseUrl = process.env.NEXT_PUBLIC_API_URL;
	let $url =
		`${baseUrl}ticket/user/` + id + '/project/' + id_project + '/count';
	try {
		let response = await axios.get($url, {
			headers: { Authorization: `Bearer ${token}` },
		});
		return response.data;
	} catch (e) {
		console.log(e);
	}
}
