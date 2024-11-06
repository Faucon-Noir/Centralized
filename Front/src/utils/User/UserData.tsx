import { jwtDecode } from 'jwt-decode';
import getUser from './getUser';
import getUserProject from './getUserProject';
import getUserTeam from './getUserTeam';
import getUserTicket from './getUserTicket';
import getUserSpecification from './getUserSpecification';
import getProjectRex from './getProjectRex';
import getCountAllTicketByUserOneProject from './getCountAllTicketByUserOneProject';
import getCountAllTicketOneUser from './getCountAllTicketOneUser';
import {
	findNumberTicketByUserName,
	GenerateDataWeekTicket,
} from '@/app/helpers';

//Create the type id in the decoded token so id is poperty is known
interface JwtPayload {
	id: string;
}

export default async function UserData() {
	const token = localStorage.getItem('token');
	if (token == null) return null;
	var user_id = '';
	var userData = {
		user: {
			avatar: '',
			bio: '',
			created_at: '',
			firstname: '',
			id: '',
			lastname: '',
			email: '',
			password: '',
			phone: '',
			token: '',
		},
		project: [
			{
				id: '',
				rex: [],
				ticket: {
					ticket: [],
					count: 0,
				},
			},
		],
		team: [{}],
		specification: [{}],
		selectedProjects: [],
		stat: {
			nbrAllTicket: 0,
			nbrTicketByUser: [{ userName: '', nbr_ticket: 0 }],
			nbrTicket: 0,
			nbrTicketPerWeek: { week: [''], nbr_ticket: [0] },
			error: false,
		},
	};
	if (token) {
		//Decode the token and define it as JwtPayload so it contain id poperty
		const decoded = jwtDecode(token) as JwtPayload;
		user_id = decoded.id;

		//Fill the userData
		userData.user = await getUser(user_id, token);
		userData.project = await getUserProject(user_id, token);
		userData.specification = await getUserSpecification(user_id, token);
		userData.team = await getUserTeam(user_id, token);
		if (
			!userData.user ||
			!userData.project ||
			!userData.specification ||
			!userData.team
		)
			window.location.href = '/login';

		let selectedP = localStorage.getItem('selectedP');
		let tempSelectedMap: { [key: string]: any } = []; // Crée un objet temporaire pour stocker les projets

		//get rexs of projects
		for (let projectData of userData.project) {
			projectData.rex = await getProjectRex(projectData.id, token);
			projectData.ticket = await getUserTicket(projectData.id, token);

			if (selectedP != null) {
				for (let pid of selectedP.split(',')) {
					if (pid === projectData.id) {
						tempSelectedMap.push(projectData); // Ajouter le projet à l'objet temporaire
					}
				}
				if (tempSelectedMap.length === 0) {
					userData.stat.error = true;
				} else {
					let lastSelected =
						tempSelectedMap[tempSelectedMap.length - 1];
					//Sert à compter les tickets par semaine

					const dataWeek = GenerateDataWeekTicket(
						lastSelected?.ticket?.ticket
					);
					userData.stat.nbrTicketPerWeek.week = dataWeek.week;
					userData.stat.nbrTicketPerWeek.nbr_ticket =
						dataWeek.nbr_ticket;

					userData.stat.nbrTicketByUser =
						await getCountAllTicketByUserOneProject(
							user_id,
							token,
							lastSelected.id
						);
					//Récuperer le nombre de ticket de l'utilisateur sur le projet
					//Une alternative plus sur serait de passer directement à travers une requete (pas de problème si 2 utilisateurs ont le même nom/prénom)
					const userName =
						userData.user.firstname + ' ' + userData.user.lastname;
					userData.stat.nbrTicket = findNumberTicketByUserName(
						userName,
						userData.stat.nbrTicketByUser
					);
				}
			}
		}
		userData.user.token = token;
		return userData;
	} else {
		window.location.href = '/login';
	}
}
