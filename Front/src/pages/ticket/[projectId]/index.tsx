import { useEffect, useState } from 'react';
import { ButtonBase } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './style.scss';
import TicketCard from '@/app/components/Card/TicketCard';
import { ButtonCreateTicketCy } from '@/app/const/ticket/ticketIdConst';
import React from 'react';
import CreateTicketForm from '@/app/components/Form/createTicket';
import { useRouter } from 'next/router';

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
export default function Tickets({ userData, updateUserData, }: { userData: any, updateUserData: any }) {
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [selectedProject, setSelectedProject] = useState({id: ''});
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
			if (project.id == new URL(window.location.href).pathname.split('/')[2]) {
				setSelectedProject(project);
				if (project.ticket.ticket != undefined) {
					for (let ticket of project.ticket.ticket) {
						if (ticket.status === 'a faire') {
							updatedTickets.todo.push(ticket);
						} else if (ticket.status === 'résolu') {
							updatedTickets.done.push(ticket);
						} else if (ticket.status === 'en retard') {
							updatedTickets.late.push(ticket);
						} else if (ticket.status === 'en cours') {
							updatedTickets.inprogress.push(ticket);
						}
					}
				}
			}
		}
		setProjectTickets(updatedTickets);
	}, [userData]);

	function handleCloseModal() {
		setShowCreateModal(false);
	}

	return (
		<>
			<div className='ticketPage'>
				<div className='header'>
					<h1>Gestion des tickets</h1>
					<ButtonBase onClick={() => setShowCreateModal(true)}>
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
										status={item.status}
										planningId={item.planningId}
										updated_at={item.updated_at}
										userData={userData}
										description={item.description}
										mail={item.description}
										projectId={selectedProject.id}
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
										status={item.status}
										planningId={item.planningId}
										updated_at={item.updated_at}
										userData={userData}
										description={item.description}
										mail={item.description}
										projectId={selectedProject.id}
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
										status={item.status}
										planningId={item.planningId}
										updated_at={item.updated_at}
										userData={userData}
										description={item.description}
										mail={item.description}
										projectId={selectedProject.id}
									/>
								))}
							</div>
						</div>
						<div className='done_container'>
							<h2>Résolu</h2>

							<div className='card_container'>
								{projectTickets.done.map((item: any) => (
									<TicketCard
										key={item.id}
										id={item.id}
										title={item.title}
										start={item.start_date}
										end={item.end_date}
										urgence={item.urgenceId}
										status={item.status}
										planningId={item.planningId}
										updated_at={item.updated_at}
										userData={userData}
										description={item.description}
										mail={item.description}
										projectId={selectedProject.id}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
				{showCreateModal ? (
					<div className='ticket_modal'>
						<div className='ticket_main_modal'>
							<img
								src='/assets/icons/icon-cross.svg'
								alt=''
								className='cross'
								onClick={() => handleCloseModal()}
							/>
							<CreateTicketForm userData={userData} selectedProject={selectedProject} />
						</div>
					</div>
				) : null}
			</div>
		</>
	);
}
