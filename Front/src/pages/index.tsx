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

export default function HomePage({ userData }: any) {
	const router = useRouter();

	async function c_project() {
		router.push('/specification/create');
	}

	return (
		<>
			<div className='right_container'>
				{userData.project.length > 0 ? <>
					<div className='Presentation'>
						<h1>Hello {userData.user ? userData.user.firstname : 'test'} 😎</h1>
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
								{userData.project && Array.isArray(userData.project) &&
									userData.project.length > 0
									? userData.project.map((item: any) => (
										<SwiperSlide key={item.id}>
											<ProjetCard
												name={item.name}
												totalTickets={item.ticket.count}
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
										userData.project[userData.project.length - 1] ? userData.project[userData.project.length - 1].name : ''
									}
									start_date={
										userData.project[userData.project.length - 1]
											? new Date(
												userData.project[userData.project.length - 1].start_date
											)
											: new Date()
									}
									end_date={
										userData.project[userData.project.length - 1]
											? new Date(userData.project[userData.project.length - 1].end_date)
											: new Date()
									}
									description={
										userData.project[userData.project.length - 1]
											? userData.project[userData.project.length - 1].description
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
								{userData.project && userData.project[userData.project.length - 1].ticket.ticket && Array.isArray(userData.project[userData.project.length - 1].ticket.ticket) && userData.project[userData.project.length - 1].ticket.ticket.length > 0
									? userData.project[userData.project.length - 1].ticket.ticket
										.filter(
											(task: any, idx: number) =>
												idx < 3
										)
										.map((task: any) => (
											<TaskCard
												id={task.id}
												title={
													task.title
												}
												urgenceId={
													task.urgence
												}
												date={
													task.start_date
												}
												key={task.id}
											/>
										))
									: null}
							</div>
						</div>
						<div className='DeuxEtapes second_line'>
							<div className='DernierTicket'>
								<h2>Cahiers des charges</h2>
								{userData.specification
									.filter(
										(value: any, idx: number) => idx < 3
									)
									.map((value: any) => (
										<SpecificationCard
											id={value.id}
											title="Specification"
											key={value.id}
										/>
									))}
							</div>
							<div className='DernierTicket'>
								<h2>Retours d&apos;expériences</h2>
								<RexCard
									answer1={userData.project[userData.project.length - 1].rex ? userData.project[userData.project.length - 1].rex.answer1 : ''}
									answer2={userData.project[userData.project.length - 1].rex ? userData.project[userData.project.length - 1].rex.answer2 : ''}
									answer3={userData.project[userData.project.length - 1].rex ? userData.project[userData.project.length - 1].rex.answer3 : ''}
									name="REX"
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
								{userData.team
									? userData.team.map((item: any) => (
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

				</> : <>
					<div className='no_project'>
						<h1>Bonjour {userData.user ? <>{userData.user.lastname} {userData.user.firstname}</> : 'test'}</h1>
						<h2>Vous n&apos;avez pas encore de projets, ni d&apos;équipe, ni meme de planning, vous n&apos;êtes rien !</h2>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer odio tortor, blandit a eleifend et, bibendum non justo. Donec commodo turpis augue, id ultrices libero consectetur quis. Duis varius elementum bibendum. Etiam ligula mi, sagittis ac est at, tristique volutpat neque. Ut non erat diam. Aenean ullamcorper pharetra quam eget ultrices. Maecenas blandit venenatis aliquam. Sed sit amet augue quis metus rhoncus cursus at et elit. Curabitur aliquet aliquam erat vel vehicula. In efficitur id sapien id efficitur. Quisque hendrerit, nisi a venenatis condimentum, leo ante convallis urna, vel venenatis lorem ipsum in enim. Praesent consectetur ultricies tristique. Nunc porttitor vulputate dui, sollicitudin eleifend sem pellentesque in. Fusce maximus malesuada dui a tincidunt. Donec sit amet nulla vitae metus elementum consequat.</p>
						<button className='create_project' onClick={() => c_project()}>Laissez vous guider</button>
					</div>
				</>}
			</div>
		</>
	);
}
