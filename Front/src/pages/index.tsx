/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import SpecificationCard from '@/app/components/SpecificationCard';
import TaskCard from '@/app/components/TaskCard';
import CalendarBox from '@/app/components/CalendarBox';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// Import Swiper
import 'swiper/css';
import { SwiperSlide } from 'swiper/react';

import { ButtonBase } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import AddIcon from '@mui/icons-material/Add';
import './style.scss';
import ProjetCard from '@/app/components/ProjectCard';
import 'swiper/css/pagination';
import Image from 'next/image';
import TeamCard from '@/app/components/TeamCard';
import RexCard from '@/app/components/rexCard';
import Dashboard from '../app/components/Dashboard/Dashboard';
import CustomSwiper from '@/app/components/customSwiper';
import { useEffect, useState } from 'react';
import { AppDispatch, useTypedSelector } from '@/app/store';
import { useDispatch } from 'react-redux';
import { getAllProjectByUserId } from '@/app/store/slices/projectSlice';
import { getUserById } from '@/app/store/slices/userSlice';
import {
	getAllTicketByProjectId,
	getAllTicketByUserId,
} from '@/app/store/slices/ticketSlice';
import { getAllSpecificationByProjectId } from '@/app/store/slices/specificationSlice';
import { Project } from '@/app/models/project';
import { getAllRexByProjectId } from '@/app/store/slices/rexSlice';
import { Ticket } from '@/app/models/ticket';
import { Rex } from '@/app/models/rex';
import { Specification } from '@/app/models/specification';
import { User } from '@/app/models/user';

export default function Home(): JSX.Element {
	const dispatch: AppDispatch = useDispatch();

	// Typed Selector
	const project = useTypedSelector(
		(state): Project[] => state.project.AllProjects
	);
	const { userId } = useTypedSelector((state) => state.auth);
	const user = useTypedSelector((state): User | null => state.user.User);
	const specification = useTypedSelector(
		(state): Specification[] => state.specification.AllSpecifications
	);
	const rex = useTypedSelector((state): Rex[] => state.rex.AllRexs);
	const ticket = useTypedSelector(
		(state): Ticket[] => state.ticket.AllTickets
	);

	useEffect(() => {
		try {
			// Besoin de:
			// - User ✨
			// - Rex ✨
			// - Ticket ✨
			// - Project ✨
			// - Specification ✨
			// - Teams

			// By User ID
			dispatch(getUserById(userId)).then((res) => {
				if (res.meta.requestStatus) {
					console.log('User', res.meta.requestStatus);
				}
			});
			dispatch(getAllProjectByUserId(userId));
			dispatch(getAllTicketByUserId(userId));

			// By Project ID
			if (project != null) {
				project.forEach((project) => {
					dispatch(getAllSpecificationByProjectId(project.id));
					dispatch(getAllRexByProjectId(project.id));
				});
			}

			// TODO
			// dispatch(getAllTeamByUserId(userId));

			// LOGS
			console.log('User', user);
		} catch (error) {
			console.log(error);
		}
	}, [dispatch, project, user, userId]);

	// TODO: Ajouter les slices pour teams
	const [teams, setTeams] = useState([]); // Liste de toutes les équipes de l'utilisateur

	// Nombre de ticket par projet => A enregistrer en base
	// => A la base on appelait tous les tickets de chaque projet pour les compter
	// TODO
	const [ticketproject, setTicketProject] = useState<any>({});

	let lastproject: any;
	let lastrex: any = null;

	// Affichage de la dernière rex disponible
	if (project) {
		lastproject = project[project.length - 1];
	}
	if (rex.length > 0) {
		lastrex = rex[0];
	}

	return (
		<>
			<Grid container>
				<Grid xs={2}>
					<Dashboard page='home' />
				</Grid>
				<Grid xs={10}>
					<div className='right_container'>
						<div className='Presentation'>
							<h1>Hello {user ? user.firstname : 'test'} 😎</h1>
						</div>
						<div className='MonProjet'>
							<div className='Entete'>
								<div className='TitleProjetCards'>
									<h2>Mes projets</h2>
									<ButtonBase href='/specification/create'>
										<AddIcon
											fontSize='medium'
											sx={{ color: '#000000' }}
										/>
									</ButtonBase>
								</div>
								<div className='fleches'>
									<ChevronLeftIcon className='swiper-button-prev swiper-button-prev-1 fleche' />
									<ChevronRightIcon className='swiper-button-next swiper-button-next-1 fleche' />
								</div>
							</div>
							<CustomSwiper swiperId={1}>
								<div className='ProjetCards'>
									{/* mesprojets => liste des projets */}
									{project
										? project.map((item: Project) => (
												<SwiperSlide key={item.id}>
													<ProjetCard
														name={item.name}
														//  Calcul du nombre total de tickets par projet
														totalTickets={
															ticketproject[
																item.id
															]
																? ticketproject[
																		item.id
																	]
																: 0
														}
														key={item.id}
														id={item.color}
														projectId={item.id}
													/>
												</SwiperSlide>
											))
										: null}
								</div>
							</CustomSwiper>
						</div>
						<Grid
							container
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: '50px',
							}}
						>
							<div className='DeuxEtapes'>
								<div className='calendar_container'>
									<CalendarBox
										name={
											lastproject ? lastproject.name : ''
										}
										start_date={
											lastproject
												? new Date(
														lastproject.start_date
													)
												: new Date()
										}
										end_date={
											lastproject
												? new Date(lastproject.end_date)
												: new Date()
										}
										description={
											lastproject
												? lastproject.description
												: ''
										}
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
									{ticket
										.filter(
											(task: any, idx: number) => idx < 3
										)
										.map((task: any) => (
											<TaskCard
												id={task.ticket_id}
												title={task.ticket_title}
												urgenceId={task.ticket_urgence}
												date={task.ticket_start_date}
												key={task.ticket_id}
											/>
										))}
								</div>
							</div>
							<div className='DeuxEtapes second_line'>
								<div className='DernierTicket'>
									<h2>Cahiers des charges</h2>
									{specification
										.filter(
											(value: any, idx: number) => idx < 3
										)
										.map((value: any) => (
											<SpecificationCard
												id={value.id}
												title={value.name}
												key={value.id}
											/>
										))}
								</div>
								<div className='DernierTicket'>
									<h2>Retours d&apos;expériences</h2>
									<RexCard
										answer1={lastrex ? lastrex.answer1 : ''}
										answer2={lastrex ? lastrex.answer2 : ''}
										answer3={lastrex ? lastrex.answer3 : ''}
										name={lastrex ? lastrex.name : ''}
									/>
								</div>
							</div>
						</Grid>
						<div className='MyTeam'>
							<div className='Entete'>
								<div className='TitleProjetCards'>
									<h2>Mon équipe</h2>
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
									{/* equipe => a récupérer depuis l'api => liste d'équipe ou détail de l'équipe ?*/}
									{teams
										? teams.map((item: any) => (
												<SwiperSlide key={item.id}>
													<TeamCard
														key={item.id}
														id={item.team.id}
														prenom={item.team.name}
													/>
												</SwiperSlide>
											))
										: null}
								</div>
							</CustomSwiper>
						</div>
					</div>
				</Grid>
			</Grid>
		</>
	);
}
