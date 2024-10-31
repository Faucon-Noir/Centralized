import { useEffect, useState } from 'react';
import { ButtonBase } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './style.scss';
import TicketCard from '@/app/components/Card/TicketCard';
import { ButtonCreateTicketCy  } from '@/app/const/ticket/ticketIdConst';
import React from 'react';

// Définir un type pour vos tickets
type Ticket = {
	start_date: string;
	end_date: string;
	status: string;
	id: string;
	planningId: string;
	title: string;
	urgenceId: string;
	updated_at: Date;
};
export default function Tickets({
	userData,
	updateUserData,
}: {
	userData: any;
	updateUserData: any;
}) {
	const [projectTickets, setProjectTickets] = useState<{
		todo: Ticket[];
		inprogress: Ticket[];
		late: Ticket[];
		done: Ticket[];
	}>({
		todo: [],
		inprogress: [],
		late: [],
		done: [],
	});

	useEffect(() => {
		const updatedTickets = {
			todo: [] as Ticket[],
			inprogress: [] as Ticket[],
			late: [] as Ticket[],
			done: [] as Ticket[],
		};
		for (let project of userData.project) {
			if (
				project.id ==
				new URL(window.location.href).pathname.split('/')[2]
			) {
				for (let ticket of project.ticket.ticket) {
					if (ticket.start_date > new Date().toISOString()) {
						updatedTickets.todo.push(ticket);
					} else if (
						ticket.start_date < new Date().toISOString() &&
						ticket.end_date < new Date().toISOString() &&
						ticket.status === 'fermé'
					) {
						updatedTickets.done.push(ticket);
					} else if (
						ticket.start_date < new Date().toISOString() &&
						ticket.end_date < new Date().toISOString() &&
						ticket.status === 'ouvert'
					) {
						updatedTickets.late.push(ticket);
					} else {
						updatedTickets.inprogress.push(ticket);
					}
				}
			}
		}
		setProjectTickets(updatedTickets);
	}, [userData]);
	console.log(projectTickets);
	return (
		<>
			<div className='ticketPage'>
				<div className='header'>
					<h1>Gestion des tickets</h1>
					<ButtonBase href='/specification/create'>
						<AddIcon fontSize='medium' sx={{ color: '#000000' }} />
					</ButtonBase>
				</div>
				<hr style={{ marginLeft: 0 }} />
				<div className='ticket_container'>
					<div className='debut_container'>
						<div className='todo_container'>
							<h2>A faire</h2>
							<div className='card_container'>
								{projectTickets.todo.map((item: any) => (
									<TicketCard
										key={item.id}
										id={item.id}
										title={item.title}
										start={item.start_date}
										end={item.end_date}
										urgence={item.urgenceId}
										updated_at={item.updated_at}
									/>
								))}
							</div>
						</div>
						
						<div className='inprogress_container'>
							<h2>En cours</h2>

							<div className='card_container'>
								{projectTickets.inprogress.map((item: any) => (
									<TicketCard
										key={item.id}
										id={item.id}
										title={item.title}
										start={item.start_date}
										end={item.end_date}
										urgence={item.urgenceId}
										updated_at={item.updated_at}
									/>
								))}
							</div>
						</div>
					</div>
					<div className='fin_container'>
						<div className='late_container'>
							<h2>En retard</h2>
							<div className='card_container'>
								{projectTickets.late.map((item: any) => (
									<TicketCard
										key={item.id}
										id={item.id}
										title={item.title}
										start={item.start_date}
										end={item.end_date}
										urgence={item.urgenceId}
										updated_at={item.updated_at}
									/>
								))}
							</div>
						</div>
						<div className='done_container'>
							<h2>Terminé</h2>

							<div className='card_container'>
								{projectTickets.done.map((item: any) => (
									<TicketCard
										key={item.id}
										id={item.id}
										title={item.title}
										start={item.start_date}
										end={item.end_date}
										urgence={item.urgenceId}
										updated_at={item.updated_at}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
