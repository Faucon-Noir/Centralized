/* eslint-disable react-hooks/rules-of-hooks */
'use client';
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
import CustomSwiper from '@/app/components/Swiper/customSwiper';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import React from 'react';
import FirstStep from '@/app/components/Form/firstStep';
import SecondStep from '@/app/components/Form/secondStep';
import ThirdStep from '@/app/components/Form/thirdStep';
import HomeData from '@/app/components/HomeData';

export default function HomePage({
	userData,
	updateUserData,
}: {
	userData: any;
	updateUserData: any;
}) {
	const router = useRouter();

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
	const [userStep, setUserStep] = useState(1);

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

		if (userData?.team?.length == 0) {
			setUserStep(1);
		} else {
			setUserStep(2);
		}
	}, [userData]);

	const handleClickCreateTeam = () => {
		router.push('/team?create=true');
	};
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
						<Grid
							container
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: '50px',
							}}
						>
							<HomeData userData={userData} lastP={lastP} />
						</Grid>
						<div className='MyTeam'>
							<div className='Entete'>
								<div className='TitleProjetCards'>
									<h2>Mes équipes</h2>
									<ButtonBase
										onClick={() => handleClickCreateTeam()}
									>
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
									{userData?.team
										? userData?.team.map((item: any) => (
												<SwiperSlide key={item.id}>
													<TeamCard
														team={item?.team}
														userData={userData}
														key={item?.team?.id}
														clickable={false}
													/>
												</SwiperSlide>
											))
										: null}
								</div>
							</CustomSwiper>
						</div>
					</>
				) : (
					<div className='no_project'>
						<div className='main_modal'>
							<div className='main_modal_header'>
								<h1>
									Hello{' '}
									{userData?.user
										? userData?.user.firstname
										: 'test'}
								</h1>
								<p>Laissez-nous vous guider</p>
							</div>
							<div className='main_modal_form'>
								<div className='main_modal_form_idx'>
									{userStep >= 1 ? (
										<img
											className='fade-in-image firstStep'
											src='/assets/nbr1on.png'
											alt=''
											onClick={() => setUserStep(1)}
											style={{ cursor: 'pointer' }}
										/>
									) : (
										<img
											src='/assets/nbr1off.png'
											alt=''
											onClick={() => setUserStep(1)}
										/>
									)}
									<div className='dotted_line'></div>
									{userStep >= 2 ? (
										<img
											className='fade-in-image'
											src='/assets/nbr2on.png'
											alt=''
											onClick={() => setUserStep(2)}
											style={{ cursor: 'pointer' }}
										/>
									) : (
										<img src='/assets/nbr2off.png' alt='' />
									)}
									<div className='dotted_line2'></div>
									{userStep >= 3 ? (
										<img
											className='fade-in-image'
											src='/assets/nbr3on.png'
											alt=''
											onClick={() => setUserStep(3)}
											style={{ cursor: 'pointer' }}
										/>
									) : (
										<img src='/assets/nbr3off.png' alt='' />
									)}
								</div>
								<div className='main_modal_form_component'>
									{userStep == 1 ? (
										<FirstStep
											userData={userData}
											setUserStep={setUserStep}
										/>
									) : userStep == 2 ? (
										<SecondStep
											userData={userData}
											setUserStep={setUserStep}
										/>
									) : userStep == 3 ? (
										<ThirdStep />
									) : null}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}
