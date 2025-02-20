'use client';

import React, { useEffect, useState } from 'react';
import './style.scss';
import axios from 'axios';
import getUserTeamProject from '@/utils/User/getUserTeamProject';
import { encryptData } from '@/app/security/encrypt';
import { decryptData } from '@/app/security/decrypt';

function CreateTicketForm({
	userData,
	selectedProject,
}: {
	userData: any;
	selectedProject: any;
}) {
	const [ticket, setTicket] = useState({
		start_date: new Date().toISOString().split('T')[0],
		end_date: new Date().toISOString().split('T')[0],
		planningId: selectedProject.ticket.planning[0].id,
		user: userData.user.id,
		title: '',
		urgenceId: 0,
		description: '',
		status: 'a faire',
	});
	const baseUrl = process.env.NEXT_PUBLIC_API_URL;
	const [userTeam, setUserTeam] = useState([{}]);
	async function handleSubmit() {
		// const encryptedTicket = {
		// 	...ticket,
		// 	title: encryptData(ticket.title),
		// 	description: encryptData(ticket.description),
		// };

		let response = await axios.post(`${baseUrl}ticket`, ticket, {
			headers: { Authorization: `Bearer ${userData.user.token}` },
		});
		window.location.reload();
	}

	useEffect(() => {
		getUserTeamProject(selectedProject.id, userData.user.token).then(
			(result) => {
				// const decryptedTeam = result.map((item: any) => ({
				// 	...item,
				// 	user_firstname: decryptData(item.user_firstname),
				// 	user_lastname: decryptData(item.user_lastname),
				// }));
				setUserTeam(result);
			}
		);
	}, []);
	return (
		<div className='ticket_form'>
			<h3>Créez votre ticket</h3>
			<div className='same_line'>
				<div className='input_grp'>
					<p>Titre *</p>
					<input
						type='text'
						placeholder='Création du ticket'
						name=''
						id=''
						onChange={(e) =>
							setTicket({
								...ticket,
								title: e.target.value.trim(),
							})
						}
					/>
				</div>
				<div className='input_grp'>
					<p>Date de début</p>
					<input
						type='date'
						placeholder='Date de début'
						onChange={(e) =>
							setTicket({
								...ticket,
								start_date: e.target.value.trim(),
							})
						}
					/>
				</div>
				<div className='input_grp'>
					<p>Date de fin</p>
					<input
						type='date'
						placeholder='Date de fin'
						onChange={(e) =>
							setTicket({
								...ticket,
								end_date: e.target.value.trim(),
							})
						}
					/>
				</div>
			</div>
			<div className='second_line'>
				<div className='input_grp'>
					<p>Status</p>
					<select
						onChange={(e) =>
							setTicket({
								...ticket,
								status: e.target.value.trim(),
							})
						}
						required
					>
						<option value='a faire'>À faire</option>
						<option value='en cours'>En cours</option>
						<option value='en retard'>En retard</option>
						<option value='résolu'>Résolu</option>
					</select>
				</div>
				<div className='input_grp'>
					<p>Urgence</p>
					<select
						onChange={(e) =>
							setTicket({
								...ticket,
								urgenceId: parseInt(e.target.value),
							})
						}
						required
					>
						<option value={0}>Mineur</option>
						<option value={1}>Moyen</option>
						<option value={2}>Majeur</option>
						<option value={3}>Urgent</option>
					</select>
				</div>
			</div>
			<div className='third_line'>
				<div className='input_grp'>
					<p>Description</p>
					<textarea
						name=''
						id=''
						onChange={(e) =>
							setTicket({
								...ticket,
								description: e.target.value,
							})
						}
					></textarea>
				</div>
			</div>
			<div>
				<select
					onChange={(e) =>
						setTicket({
							...ticket,
							user: e.target.value.trim(),
						})
					}
					required
				>
					<option value=''>Veuillez choisir une personne</option>
					{userTeam.length > 0
						? userTeam.map((item: any) => (
								<option key={item.id} value={item.id}>
									{item.user_firstname +
										' ' +
										item.user_lastname}
								</option>
							))
						: null}
				</select>
			</div>
			<button className='next_btn' onClick={() => handleSubmit()}>
				Valider
			</button>
		</div>
	);
}

export default CreateTicketForm;
