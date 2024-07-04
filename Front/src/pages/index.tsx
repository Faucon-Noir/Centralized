/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import SpecificationCard from '@/app/components/SpecificationCard'
import TaskCard from '@/app/components/TaskCard'
import CalendarBox from '@/app/components/CalendarBox'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

// Import Swiper
import 'swiper/css'
import { SwiperSlide } from 'swiper/react'

import { ButtonBase } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import AddIcon from '@mui/icons-material/Add'
import './style.scss'
import ProjetCard from '@/app/components/ProjectCard'
import 'swiper/css/pagination'
import Image from 'next/image'
import TeamCard from '@/app/components/TeamCard'
import RexCard from '@/app/components/rexCard'
import Dashboard from '../app/components/Dashboard/Dashboard'
import CustomSwiper from '@/app/components/customSwiper'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home(): JSX.Element {
	const [user, setUser] = useState(null)
	const [project, setProject] = useState<any[]>([])
	const [team, setTeam] = useState(null)
	const [teamuser, setTeamUser] = useState(null)
	const [rex, setRex] = useState([])
	const [ticket, setTicket] = useState([])
	const [specification, setSpecification] = useState([])
	const [teams, setTeams] = useState([])
	const [ticketproject, setTicketProject] = useState<any>({})
	let lastproject: any
	let lastrex: any = null
	if (typeof window !== 'undefined') {
		const isAuth: boolean = !!localStorage.getItem('token')
		let user_id: string = ''
		let ticket_liste = {}
		let rex_liste: any = []
		if (isAuth) {
			const token: any = localStorage.getItem('token')
			const decodeToken: any = jwtDecode(token)
			user_id = decodeToken['id']

			useEffect(() => {
				//GET USER INFO
				try {
					axios
						.get(`http://localhost:8000/api/user/${user_id}`, {
							headers: { Authorization: `Bearer ${token}` },
						})
						.then((res) => {
							setUser(res.data)
							console.log('user', res.data)
						})
				} catch (error) {
					console.log(error)
				}

				//GET PROJECT OF USER
				try {
					axios
						.get(
							`http://localhost:8000/api/project/user/${user_id}`,
							{
								headers: { Authorization: `Bearer ${token}` },
							}
						)
						.then((res) => {
							setProject(res.data)
							//GET TICKET FROM PROJET
							res.data.forEach(
								(element: { id: any; name: string }) => {
									try {
										axios
											.get(
												`http://localhost:8000/api/ticket/project/${element.id}`,
												{
													headers: {
														Authorization: `Bearer ${token}`,
													},
												}
											)
											.then(function (res) {
												ticket_liste = {
													...ticket_liste,
													[element.id]:
														res.data.length,
												}
												setTicketProject(ticket_liste)
												console.log(
													`ticket from project[${element.id}]`,
													res.data
												)
											})
									} catch (error) {
										console.log(error)
									}
									//GET REX INFO
									try {
										axios
											.get(
												`http://localhost:8000/api/rex/project/${element.id}`,
												{
													headers: {
														Authorization: `Bearer ${token}`,
													},
												}
											)
											.then((res) => {
												if (!res.data.error) {
													res.data.name = element.name
													rex_liste.push(res.data)
													setRex(rex_liste)
													console.log('rex', res.data)
												}
											})
									} catch (error) {
										console.log(error)
									}
								}
							)
						})
				} catch (error) {
					console.log(error)
				}

				//GET TEAM OF USER
				// try {
				//   axios.get(`http://localhost:8000/api/team/${user_id}`, {
				//     headers: { Authorization: `Bearer ${token}` }
				//   }).then(res => {
				//     setTeam(res.data.team);
				//     if (team) {
				//       try {
				//         axios.get(`http://localhost:8000/api/teamuser/${team.id}`, {
				//           headers: { Authorization: `Bearer ${token}` }
				//         }).then(res => {
				//           setTeamUser(res.data);
				//         })
				//       } catch (error) {
				//         console.log(error);
				//       }
				//     }
				//   })
				// } catch (error) {
				//   console.log(error);
				// }

				//GET TICKET INFO
				try {
					axios
						.get(
							`http://localhost:8000/api/ticket/user/${user_id}`,
							{
								headers: { Authorization: `Bearer ${token}` },
							}
						)
						.then((res) => {
							setTicket(res.data)
							console.log('ticket info', res.data)
						})
				} catch (error) {
					console.log(error)
				}

				//GET Specification INFO
				try {
					axios
						.get(
							`http://localhost:8000/api/project/user/${user_id}`,
							{
								headers: { Authorization: `Bearer ${token}` },
							}
						)
						.then((res) => {
							setSpecification(res.data)
							console.log('project', res.data)
						})
				} catch (error) {
					console.log(error)
				}

				//GET Team user INFO
				try {
					axios
						.get(
							`http://localhost:8000/api/teamuser/user/${user_id}`,
							{
								headers: { Authorization: `Bearer ${token}` },
							}
						)
						.then((res) => {
							setTeams(res.data)
							console.log('teamuser info', res.data)
						})
				} catch (error) {
					console.log(error)
				}
			}, [])
		}

		if (project) {
			lastproject = project[project.length - 1]
		}
		if (rex.length > 0) {
			lastrex = rex[0]
		}
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
							<h1>Hello {user ? user.lastname : 'test'} 😎</h1>
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
										? project.map((item: any) => (
												<SwiperSlide key={item.id}>
													<ProjetCard
														name={item.name}
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
														project={item.id}
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
	)
}
