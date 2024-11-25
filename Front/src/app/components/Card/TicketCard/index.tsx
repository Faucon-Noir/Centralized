import { useEffect, useState } from 'react';
import {
	BoxTicketCardCy,
	MajTicketCardCy,
	NameTicketCardCy,
	PeriodTicketCardCy,
	UrgenceTicketCardCy,
} from './const';
import './style.scss';
import axios from 'axios';
import getUserByOneTicket from '@/utils/User/getUserByOneTicket';
import getUserTeamProject from '@/utils/User/getUserTeamProject';

type Status = 'a faire' | 'en cours' | 'en retard' | 'résolu'; // Définir les statuts possibles
type Urgence = 0 | 1 | 2 | 3; // Définir les urgences possibles
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function TicketCard({
	id,
	title,
	start,
	end,
	urgence,
	updated_at,
	status,
	planningId,
	userData,
	description,
	mail,
	projectId
}: {
	description: any;
	userData: any;
	id: any;
	title: any;
	start: any;
	end: any;
	urgence: Urgence;
	updated_at: Date;
	status: Status;
	planningId: any;
	mail: string;
	projectId: string
}) {
	const [ticket, setTicket] = useState({
		start_date: start,
		end_date: end,
		planningId: planningId,
		userId: userData.user.id,
		title: title,
		urgenceId: urgence,
		description: description,
		status: status,
	});
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [userTeam, setUserTeam] = useState([{}])

	const urgenceColor = {
		0: '#8BC729',
		1: '#0083E1',
		2: '#ffa60063',
		3: '#ff000038',
	};

	const date1 = new Date();
	const date2 = new Date(updated_at);
	let lastUpdate = Number(date1) - Number(date2);
	const millisecondsInOneDay = 1000 * 60 * 60 * 24;
	const differenceInDays = lastUpdate / millisecondsInOneDay;

	useEffect(() => {
        getUserByOneTicket(id, userData.user.token).then((result) => {
			setTicket({ ...ticket, userId: result.user.user_id });
        });

        getUserTeamProject(projectId, userData.user.token).then((result) => {
            setUserTeam(result);
        });

	}, []);

	async function handleSubmit() {
		let response = await axios.patch(`${baseUrl}ticket/` + id, ticket, {
			headers: { Authorization: `Bearer ${userData.user.token}` },
		});
		if (response.status == 200) {
			window.location.reload();
		}
	}
	async function handleDelete() {
		let response = await axios.delete(`${baseUrl}ticket/` + id, {
			headers: { Authorization: `Bearer ${userData.user.token}` },
		});
		if (response.status == 200) {
			window.location.reload();
		}
	}
	return (
		<>
			<div
				data-cy={BoxTicketCardCy}
				className='card'
				style={{
					borderLeft: '7px solid ' + urgenceColor[ticket.urgenceId],
					cursor: 'pointer',
				}}
				onClick={() => setShowUpdateModal(true)}
			>
				<h3 data-cy={NameTicketCardCy}>{title}</h3>
				<div>
					<p data-cy={PeriodTicketCardCy}>
						{start.substring(0, 10)} - {end.substring(0, 10)}
					</p>
					<p data-cy={UrgenceTicketCardCy}>Status : {status}</p>
				</div>
				<p data-cy={MajTicketCardCy} className='card_date'>
					Dernier maj :{' '}
					<strong>
						il y a {differenceInDays.toString().split('.')[0]} jours
					</strong>
				</p>
			</div>

			{showUpdateModal ? (
				<div className='ticket_modal'>
					<div className='ticket_main_modal'>
						<img
							src='/assets/icons/icon-cross.svg'
							alt=''
							className='cross'
							onClick={() => setShowUpdateModal(false)}
						/>
						<div className='ticket_form'>
							<h3>Modifier votre ticket</h3>
							<div className='same_line'>
								<div className='input_grp'>
									<p>Titre *</p>
									<input
										type='text'
										placeholder='Création du ticket'
										value={ticket.title}
										onChange={(e) =>
											setTicket({
												...ticket,
												title: e.target.value,
											})
										}
									/>
								</div>
								<div className='input_grp'>
									<p>Date de début</p>
									<input
										type='date'
										placeholder='Date de début'
										value={ticket.start_date.substring(0,10)}
										onChange={(e) =>
											setTicket({
												...ticket,
												start_date:
													e.target.value.trim(),
											})
										}
									/>
								</div>
								<div className='input_grp'>
									<p>Date de fin</p>
									<input
										type='date'
										placeholder='Date de fin'
										value={ticket.end_date.substring(0, 10)}
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
										onChange={(e) => {
											const newStatus =
												e.target.value.trim() as Status;
											setTicket({
												...ticket,
												status: newStatus,
											});
										}}
										required
									>
										<option
											value='a faire'
											selected={
												ticket.status === 'a faire'
											}
										>
											À faire
										</option>
										<option
											value='en cours'
											selected={
												ticket.status === 'en cours'
											}
										>
											En cours
										</option>
										<option
											value='en retard'
											selected={
												ticket.status === 'en retard'
											}
										>
											En retard
										</option>
										<option
											value='résolu'
											selected={
												ticket.status === 'résolu'
											}
										>
											Résolu
										</option>
									</select>
								</div>
								<div className='input_grp'>
									<p>Urgence</p>
									<select
										onChange={(e) => {
											const newStatus = parseInt(
												e.target.value
											) as Urgence;
											setTicket({
												...ticket,
												urgenceId: newStatus,
											});
										}}
										required
									>
										<option
											value={0}
											selected={ticket.urgenceId === 0}
										>
											Mineur
										</option>
										<option
											value={1}
											selected={ticket.urgenceId === 1}
										>
											Moyen
										</option>
										<option
											value={2}
											selected={ticket.urgenceId === 2}
										>
											Majeur
										</option>
										<option
											value={3}
											selected={ticket.urgenceId === 3}
										>
											Urgent
										</option>
									</select>
								</div>
							</div>
							<div className='third_line'>
								<div className='input_grp'>
									<p>Description</p>
									<textarea
										value={ticket.description}
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
											userId: e.target.value.trim(),
										})
									}
									required
								>
									<option value=''>Veuillez choisir une personne</option>
									{userTeam.length > 0 ?
										userTeam.map((item: any) => (
												<option
													key={item.id}
													value={item.id}
													selected={ticket?.userId === item.id}
												>
													{item.user_firstname + ' ' + item.user_lastname}
												</option>
											))
										: null}
								</select>
							</div>
							<div className='buttn_container'>
								<button
									className='next_btn'
									onClick={handleSubmit}
								>
									Valider
								</button>
								<button
									className='delete_btn'
									onClick={handleDelete}
								>
									Supprimer
								</button>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</>
	);
}
