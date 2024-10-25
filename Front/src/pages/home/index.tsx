/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import SpecificationCard from '@/app/components/Card/SpecificationCard';
import TaskCard from '@/app/components/Card/TaskCard';
import CalendarBox from '@/app/components/CalendarBox';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import 'swiper/css';
import { SwiperSlide } from 'swiper/react';
import { ButtonBase } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import AddIcon from '@mui/icons-material/Add';
import './style.scss';
import ProjetCard from '@/app/components/Card/ProjectCard';
import 'swiper/css/pagination';
import Image from 'next/image';
import TeamCard from '@/app/components/Card/TeamCard';
import RexCard from '@/app/components/Card/rexCard';
import CustomSwiper from '@/app/components/Swiper/customSwiper';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import GraphiquePie from '@/app/components/GraphiquePie';
import GraphiqueLine from '@/app/components/GraphiqueLine';
import React from 'react';

export default function HomePage({
	userData,
	updateUserData,
}: {
	userData: any;
	updateUserData: any;
}) {
	const [lastP, setLastP] = useState({
		name: '',
		start_date: '',
		end_date: '',
		description: '',
		color: 0,
		ticket: {
			count: 0,
			ticket: [{}],
		},
		rex: {
			answer1: '',
			answer2: '',
			answer3: '',
		},
	});

	const router = useRouter();
	const [windowWidth, setWindowWidth] = useState<number>(0);

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	useEffect(() => {
		let tmp_lastP = {
			name: '',
			start_date: '',
			end_date: '',
			description: '',
			color: 0,
			ticket: {
				count: 0,
				ticket: [{}],
			},
			rex: {
				answer1: '',
				answer2: '',
				answer3: '',
			},
		};
		for (let i = 0; i < userData?.project?.length; i++) {
			if (i == 0) tmp_lastP = userData.project[i];
			if (tmp_lastP.end_date < userData.project[i].end_date)
				tmp_lastP = userData.project[i];
		}
		setLastP(tmp_lastP);
	}, [userData]);
	console.log(userData);
	return (
		<>
			<div className='right_container'>
				{userData?.project?.length > 0 ? (
					<>
						<div className='Presentation'>
							<h1>
								Hello{' '}
								{userData?.user
									? userData?.user.firstname
									: 'test'}{' '}
								😎
							</h1>
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
									{userData?.project &&
									Array.isArray(userData?.project) &&
									userData?.project.length > 0
										? userData?.project.map((item: any) => (
												<SwiperSlide key={item.id}>
													<ProjetCard
														name={item.name}
														totalTickets={
															item.ticket?.count
														}
														key={item.id}
														id={item.color}
														projectId={item.id}
														updateUserData={
															updateUserData
														}
														userData={userData}
													/>
												</SwiperSlide>
											))
										: null}
								</div>
							</CustomSwiper>
						</div>
						{windowWidth >= 660 ? (
							<Grid
								container
								sx={{
									display: 'flex',
									flexDirection: 'column',
									gap: '50px',
								}}
							>
								{userData?.stat?.error ? (
									<></>
								) : (
									<div className='stat'>
										<h2>Statistique du dernier projet</h2>
                                        <div className='graph_div'>
											{userData?.stat?.nbrTicketByUser ? (
												<GraphiquePie
													labels={userData.stat.nbrTicketByUser.map(
														(x: {
															userName: any;
														}) => x.userName
													)}
													data={userData.stat.nbrTicketByUser.map(
														(row: {
															nbr_ticket: any;
														}) => row.nbr_ticket
													)}
													title='Nombre de ticket non fini par utilisateur'
													hover='Nombre de ticket'
												/>
											) : null}
											{userData?.stat?.nbrTicketByUser ? (
												<GraphiqueLine
													labels={
														userData.stat
															.nbrTicketPerWeek
															.week
													}
													data={
														userData.stat
															.nbrTicketPerWeek
															.nbr_ticket
													}
													title='Nombre de tickets ouverts par semaine'
													hover='Nombre de tickets'
												/>
											) : null}
											<div className='text_stat'>
												<div className="stat_container">
													<p>Vous avez</p>
													<h3>{userData?.stat?.nbrTicket  ? userData.stat.nbrTicket : 0 }</h3>
													<p>tickets ouverts sur ce projet</p>
												</div>
												<div className="stat_container">
													<p>Vous avez</p>
													<h3>{userData?.stat?.nbrAllTicket  ? userData.stat.nbrAllTicket : 0 }</h3>
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
												lastP
													? new Date(lastP.start_date)
													: new Date()
											}
											end_date={
												lastP
													? new Date(lastP.end_date)
													: new Date()
											}
											description={
												lastP ? lastP.description : ''
											}
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
													.filter(
														(
															task: any,
															idx: number
														) => idx < 3
													)
													.map((task: any) => (
														<TaskCard
															id={task.id}
															title={task.title}
															urgenceId={
																task.urgence
															}
															date={
																task.start_date
															}
															color={lastP.color}
															key={task.id}
														/>
													))
											: null}
									</div>
								</div>
								<div className='BlocDouble second_line'>
									<div className='DernierTicket'>
										<h2>
											Mes derniers cahiers des charges
										</h2>
										{userData?.project
											.filter(
												(value: any, idx: number) =>
													idx < 3
											)
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
										<h2>
											Derniers retours d&apos;expériences
										</h2>
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
							</Grid>
						) : (
							<div className='mobile'>
								{userData?.stat?.error ? (
									<></>
								) : (
									<div className='stat'>
										<h2>Statistique du dernier projet</h2>
                                        <div className='graph_div'>
											{userData?.stat?.nbrTicketByUser ? (
												<GraphiquePie
													labels={userData.stat.nbrTicketByUser.map(
														(x: {
															userName: any;
														}) => x.userName
													)}
													data={userData.stat.nbrTicketByUser.map(
														(row: {
															nbr_ticket: any;
														}) => row.nbr_ticket
													)}
													title='Nombre de ticket non fini par utilisateur'
													hover='Nombre de ticket'
												/>
											) : null}
											{userData?.stat?.nbrTicketByUser ? (
												<GraphiqueLine
													labels={
														userData.stat
															.nbrTicketPerWeek
															.week
													}
													data={
														userData.stat
															.nbrTicketPerWeek
															.nbr_ticket
													}
													title='Nombre de tickets ouverts par semaine'
													hover='Nombre de tickets'
												/>
											) : null}
											<div className='text_stat'>
												<div className="stat_container">
													<p>Vous avez</p>
													<h3>{userData?.stat?.nbrTicket  ? userData.stat.nbrTicket : 0 }</h3>
													<p>tickets ouverts sur ce projet</p>
												</div>
												<div className="stat_container">
													<p>Vous avez</p>
													<h3>{userData?.stat?.nbrAllTicket  ? userData.stat.nbrAllTicket : 0 }</h3>
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
												lastP
													? new Date(lastP.start_date)
													: new Date()
											}
											end_date={
												lastP
													? new Date(lastP.end_date)
													: new Date()
											}
											description={
												lastP ? lastP.description : ''
											}
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
													.filter(
														(
															task: any,
															idx: number
														) => idx < 3
													)
													.map((task: any) => (
														<TaskCard
															id={task.id}
															title={task.title}
															urgenceId={
																task.urgence
															}
															date={
																task.start_date
															}
															color={lastP.color}
															key={task.id}
														/>
													))
											: null}
									</div>
								</div>
								<div className='BlocDouble second_line'>
									<div className='DernierTicket'>
										<h2>
											Mes derniers cahiers des charges
										</h2>
										{userData?.project
											.filter(
												(value: any, idx: number) =>
													idx < 3
											)
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
										<h2>
											Derniers retours d&apos;expériences
										</h2>
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
							</div>
						)}

						<div className='MyTeam'>
							<div className='Entete'>
								<div className='TitleProjetCards'>
									<h2>Mes équipes</h2>
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
									{userData?.team
										? userData?.team.map((item: any) => (
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
					</>
				) : (
					<>
						<div className='no_project'>
							<h1>
								Bonjour{' '}
								{userData?.user ? (
									<>
										{userData?.user.lastname}{' '}
										{userData?.user.firstname}
									</>
								) : (
									'test'
								)}
							</h1>
							<h2>
								Vous n&apos;avez pas encore de projets, ni
								d&apos;équipe, ni meme de planning, vous
								n&apos;êtes rien !
							</h2>
							<p>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit. Integer odio tortor, blandit a
								eleifend et, bibendum non justo. Donec commodo
								turpis augue, id ultrices libero consectetur
								quis. Duis varius elementum bibendum. Etiam
								ligula mi, sagittis ac est at, tristique
								volutpat neque. Ut non erat diam. Aenean
								ullamcorper pharetra quam eget ultrices.
								Maecenas blandit venenatis aliquam. Sed sit amet
								augue quis metus rhoncus cursus at et elit.
								Curabitur aliquet aliquam erat vel vehicula. In
								efficitur id sapien id efficitur. Quisque
								hendrerit, nisi a venenatis condimentum, leo
								ante convallis urna, vel venenatis lorem ipsum
								in enim. Praesent consectetur ultricies
								tristique. Nunc porttitor vulputate dui,
								sollicitudin eleifend sem pellentesque in. Fusce
								maximus malesuada dui a tincidunt. Donec sit
								amet nulla vitae metus elementum consequat.
							</p>
							<button
								className='create_project'
								onClick={() =>
									router.push('/specification/create')
								}
							>
								Laissez vous guider
							</button>
						</div>
					</>
				)}
			</div>
		</>
	);
}
