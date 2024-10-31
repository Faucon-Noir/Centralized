import { Grid, ButtonBase } from '@mui/material';
import CalendarBox from '../CalendarBox';
import RexCard from '../Card/rexCard';
import SpecificationCard from '../Card/SpecificationCard';
import TaskCard from '../Card/TaskCard';
import GraphiqueLine from '../GraphiqueLine';
import GraphiquePie from '../GraphiquePie';
import { useState } from 'react';
import Image from 'next/image';

export default function HomeData({
	userData,
	lastP,
}: {
	userData: any;
	lastP: any;
}) {
	// const [lastP, setLastP] = useState({
	// 	name: '',
	// 	start_date: '',
	// 	end_date: '',
	// 	description: '',
	// 	color: 0,
	// 	ticket: { count: 0, ticket: [] },
	// 	rex: { answer1: '', answer2: '', answer3: '' },
	// });
	return (
		<>
			{userData?.stat?.error ? (
				<></>
			) : (
				<div className='stat'>
					<h2>Statistique du dernier projet</h2>
					<div className='graph_div'>
						{userData?.stat?.nbrTicketByUser ? (
							<GraphiquePie
								labels={userData.stat.nbrTicketByUser.map(
									(x: { userName: any }) => x.userName
								)}
								data={userData.stat.nbrTicketByUser.map(
									(row: { nbr_ticket: any }) => row.nbr_ticket
								)}
								title='Nombre de ticket non fini par utilisateur'
								hover='Nombre de ticket'
							/>
						) : null}
						{userData?.stat?.nbrTicketByUser ? (
							<GraphiqueLine
								labels={userData.stat.nbrTicketPerWeek.week}
								data={userData.stat.nbrTicketPerWeek.nbr_ticket}
								title='Nombre de tickets ouverts par semaine'
								hover='Nombre de tickets'
							/>
						) : null}
						<div className='text_stat'>
							<div className='stat_container'>
								<p>Vous avez</p>
								<h3>
									{userData?.stat?.nbrTicket
										? userData.stat.nbrTicket
										: 0}
								</h3>
								<p>tickets ouverts sur ce projet</p>
							</div>
							<div className='stat_container'>
								<p>Vous avez</p>
								<h3>
									{userData?.stat?.nbrAllTicket
										? userData.stat.nbrAllTicket
										: 0}
								</h3>
								<p>tickets ouverts en tout</p>
							</div>
						</div>
					</div>
				</div>
			)}

			<div className='BlocDouble'>
				<div className='calendar_container'>
					<CalendarBox
						name={lastP ? lastP.name : ''}
						start_date={
							lastP ? new Date(lastP.start_date) : new Date()
						}
						end_date={lastP ? new Date(lastP.end_date) : new Date()}
						description={lastP ? lastP.description : ''}
						color={lastP.color}
					/>
				</div>

				<div className='DernierTicket'>
					<div className='entetedernierticket'>
						<h2>Derniers tickets</h2>
						<ButtonBase>
							<Image
								height={20}
								width={20}
								alt=''
								src='/assets/arrow-narrow-right.svg'
							/>
						</ButtonBase>
					</div>
					{lastP.ticket.count > 0
						? lastP.ticket.ticket
								.filter((task: any, idx: number) => idx < 3)
								.map((task: any) => (
									<TaskCard
										id={task.id}
										title={task.title}
										urgenceId={task.urgence}
										date={task.start_date}
										color={lastP.color}
										key={task.id}
									/>
								))
						: null}
				</div>
			</div>
			<div className='BlocDouble second_line'>
				<div className='DernierTicket'>
					<h2>Mes derniers cahiers des charges</h2>
					{userData?.project
						.filter((value: any, idx: number) => idx < 3)
						.map((value: any) => (
							<SpecificationCard
								id={value.id}
								title={value.name}
								color={value.color}
								key={value.id}
							/>
						))}
				</div>
				<div className='DernierTicket'>
					<h2>Derniers retours d&apos;expériences</h2>
					<RexCard
						answer1={
							lastP.rex.answer1 != undefined
								? lastP.rex.answer1
								: "Votre dernier projet n'a pas de rex"
						}
						answer2={
							lastP.rex.answer2 != undefined
								? lastP.rex.answer2
								: 'Continuer et vous y arriverez'
						}
						answer3={
							lastP.rex.answer3 != undefined
								? lastP.rex.answer3
								: 'Croyez en vous'
						}
						color={lastP.color}
						name='REX'
					/>
				</div>
			</div>
		</>
	);
}
