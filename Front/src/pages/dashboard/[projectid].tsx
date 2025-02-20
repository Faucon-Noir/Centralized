/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import TaskCard from '@/app/components/Card/TaskCard';
import CalendarBox from '@/app/components/CalendarBox';
import 'swiper/css';
import { SwiperSlide } from 'swiper/react';
import { ButtonBase, Icon } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox'; 
import ArchiveIcon from '@mui/icons-material/Archive';
import AssignmentIcon from '@mui/icons-material/Assignment'; 
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import AddIcon from '@mui/icons-material/Add';
import './style.scss';
import 'swiper/css/pagination';
import Image from 'next/image';
import CustomSwiper from '@/app/components/Swiper/customSwiper';
import { useEffect, useState } from 'react';
import GraphiquePie from '@/app/components/GraphiquePie';
import GraphiqueLine from '@/app/components/GraphiqueLine';
import ProjectData from '@/utils/User/ProjectData';
import TeamMateCard from '@/app/components/Card/teamMate';
import RexForm from '@/app/components/Form/rexForm';
import { numberToColor } from '@/app/helpers';
import React from 'react';

export default function DashboardPage({
	userData,
	updateUserData,
}: {
	userData: any;
	updateUserData: any;
}) {
	const [windowWidth, setWindowWidth] = useState<number>(0);
	const [project, setProject] = useState({
		project: {
			name: '',
			start_date: '',
			end_date: '',
			color: 0,
			description: '',
			id: '',
		},
		cdc: {},
		rex: {
			rexProbleme: '',
			rexReussite: '',
			rexAmelioration: '',
			isForm: false,
		},
		ticket: {
			count: 0,
			ticket: [{}],
		},
		userTeam: [{}],
		stat: {
			nbrTicketByUser: [{ userName: '', nbr_ticket: 0 }],
			nbrTicketPerWeek: { week: [''], nbr_ticket: [0] },
			nbrTicketByStatus: [{ status: '', nbr_ticket: 0 }],
			nbrTicketOpenProject: 0,
			nbrTicketProject: 0,
			nbrMyTicketOpenProject: 0,
			nbrMyTicketProject: 0,
		},
	});

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	useEffect(() => {
		ProjectData(
			new URL(window.location.href).pathname.split('/')[2],
			userData
		).then((result) => {
			setProject(result);
		});
	}, [userData]);
	return (
		<>
			<div className='right_container'>
				<>
					<div className='Presentation'>
						<h1>{project?.project ? project.project.name : ''}</h1>
					</div>
					<div className='mobile'>
						{!project?.stat ? (
							<></>
						) : (
							<div className='stat'>
								<h2>Statistique du dernier projet</h2>
								<div className='graph_div'>
									<div className='text_stat'>
										{project?.stat?.nbrTicketByUser ? (
											<GraphiquePie
												labels={project.stat.nbrTicketByUser.map(
													(x: { userName: any }) =>
														x.userName
												)}
												data={project.stat.nbrTicketByUser.map(
													(row: {
														nbr_ticket: any;
													}) => row.nbr_ticket
												)}
												title='Nombre de ticket non fini par utilisateur'
												hover='Nombre de ticket'
											/>
										) : null}
										{project?.stat?.nbrTicketByStatus ? (
											<GraphiquePie
												labels={project.stat.nbrTicketByStatus.map(
													(x: { status: any }) =>
														x.status
												)}
												data={project.stat.nbrTicketByStatus.map(
													(row: {
														nbr_ticket: any;
													}) => row.nbr_ticket
												)}
												title='Nombre de ticket par état'
												hover='Nombre de ticket'
												order={2}
											/>
										) : null}
									</div>
									<div className='text_stat stat_container_1'>
										<div className='stat_container'>
											<p>Total des tickets ouverts</p>
											<div className='icon_container'>
												<Icon
													sx={{
														color: numberToColor(project.project.color),
														height: '35px',
														width: '35px',
														marginBottom: '10px',
													}}
												>
													<AssignmentIcon fontSize='large'/>
												</Icon>
												<h3>
													{project?.stat
														?.nbrTicketOpenProject
														? project.stat
																.nbrTicketOpenProject
														: 0}
												</h3>
											</div>
										</div>
										<div className='stat_container'>
											<p>Vos tickets ouverts</p>
											<div className='icon_container'>
												<Icon
													sx={{
														color: numberToColor(project.project.color),
														height: '35px',
														width: '35px',
														marginBottom: '10px',
													}}
												>
													<AssignmentReturnedIcon fontSize='large'/>
												</Icon>
												<h3>
													{project?.stat
														?.nbrMyTicketOpenProject
														? project.stat
																.nbrMyTicketOpenProject
														: 0}
												</h3>
											</div>
										</div>
									</div>
									{project?.stat?.nbrTicketByUser ? (
										<GraphiqueLine
											labels={
												project.stat.nbrTicketPerWeek
													.week
											}
											data={
												project.stat.nbrTicketPerWeek
													.nbr_ticket
											}
											title='Nombre de tickets ouverts par semaine'
											hover='Nombre de tickets'
										/>
									) : null}
									<div className='text_stat stat_container_2'>
										<div className='stat_container'>
											<p>Total des tickets</p>
											<div className='icon_container'>
												<Icon
													sx={{
														color: numberToColor(project.project.color),
														height: '35px',
														width: '35px',
														marginBottom: '10px',
													}}
												>
													<InboxIcon fontSize='large'/>
												</Icon>
												<h3>
													{project?.stat?.nbrTicketProject
													? project.stat
															.nbrTicketProject
														: 0}
												</h3>
											</div>
										</div>
										<div className='stat_container'>
											<p>Vos tickets</p>
											<div className='icon_container'>
												<Icon
													className='icon_stat'
													sx={{
														color: numberToColor(project.project.color),
														height: '35px',
														width: '35px',
														marginBottom: '10px',
													}}
												>
													<ArchiveIcon fontSize='large'/>
												</Icon>
												<h3>
													{project?.stat
														?.nbrMyTicketProject
														? project.stat
															.nbrMyTicketProject
														: 0}
												</h3>
											</div>
										</div>
									</div>
								</div>
							</div>
						)}
						<div className='BlocDouble'>
							<div className='calendar_container'>
								<CalendarBox
									name={
										project.project
											? project.project.name
											: ''
									}
									start_date={
										project.project
											? new Date(
													project.project.start_date
												)
											: new Date()
									}
									end_date={
										project.project
											? new Date(project.project.end_date)
											: new Date()
									}
									description={
										project.project
											? project.project.description
											: ''
									}
									color={numberToColor(project.project.color)}
								/>
							</div>

							<div className='DernierTicket'>
								<div className='entetedernierticket'>
									<h2>Derniers tickets</h2>
								</div>
								{project.ticket.count > 0 ? (
									project.ticket.ticket
										.filter(
											(task: any, idx: number) => idx < 3
										)
										.map((task: any) => (
											<TaskCard
												id={task.id}
												title={task.title}
												urgenceId={task.status}
												date={task.start_date}
												color={project.project.color}
												key={task.id}
											/>
										))
								) : (
									<> Aucun ticket n&apos;est ouvert</>
								)}
							</div>
						</div>
						<div className='BlocDouble second_line'>
							<div className='DernierTicket'>
								<h2>Derniers retours d&apos;expériences</h2>
								<RexForm
									userData={userData}
									RexData={project.rex}
									idProject={project.project.id}
									color={project.project.color}
								/>
							</div>
						</div>
					</div>

					<div className='MyTeam'>
						<div className='Entete'>
							<div className='TitleProjetCards'>
								<h2>Membres de l&apos;équipe</h2>
								<ButtonBase>
									<AddIcon
										fontSize='medium'
										sx={{ color: '#000000' }}
									/>
								</ButtonBase>
							</div>
							<div className='fleches'>
								<Image
									src='/assets/chevron-left.svg'
									alt=''
									width={20}
									height={20}
									className='swiper-button-prev swiper-button-prev-2 fleche'
								></Image>
								<Image
									src='/assets/chevron-right.svg'
									alt=''
									width={20}
									height={20}
									className='swiper-button-next swiper-button-next-2 fleche'
								></Image>
							</div>
						</div>
						<CustomSwiper swiperId={2}>
							<div className='ProjetCards'>
								{project?.userTeam
									? project?.userTeam.map((item: any) => (
											<SwiperSlide key={item.id}>
												<TeamMateCard
													avatar={item.avatar}
													firstName={
														item.user_firstname
													}
													lastName={
														item.user_lastname
													}
													bio={item.user_bio}
													grade={0}
												/>
											</SwiperSlide>
										))
									: null}
							</div>
						</CustomSwiper>
					</div>
				</>
			</div>
		</>
	);
}
