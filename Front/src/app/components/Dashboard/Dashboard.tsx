/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { style } from '@mui/system';
import './Dashboard.scss';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import UserData from '@/utils/User/UserData';
// { userData, setIsRequesting }: { userData: any, setIsRequesting: (value: String) => void }
export default function Dashboard({ page = '', userData }: { page: String, userData: any }) {
	const router = useRouter();

	function logout() {
		localStorage.removeItem('token');
		localStorage.setItem('connected', 'false');
		router.push('/login');
	}

	return (
		<>
			<div className='dashboard'>
				<div className='centralized_logo'>
					<img
						src='/assets/logo/WhiteLogoLeft.png'
						alt='Logo'
						className='logo'
					/>
				</div>
				<div className='home_button'>
					<a href='/'>
						<button
							className={
								page == 'home'
									? 'dashboard_button active'
									: 'dashboard_button'
							}
						>
							<img src='/assets/icons/home_icon.svg' alt='' />
							Tableau de bord
						</button>
					</a>
				</div>
				<div className='dashboard_nav'>
					<a href='/planning'>
						<button
							className={
								page == 'planning'
									? 'dashboard_button active'
									: 'dashboard_button'
							}
						>
							<img src='/assets/icons/planning.svg' alt='' />
							Mon Planning
						</button>
					</a>
					<a href='/team'>
						<button
							className={
								page == 'team'
									? 'dashboard_button active'
									: 'dashboard_button'
							}
						>
							<img src='/assets/icons/teams.svg' alt='' />
							Équipes
						</button>
					</a>
					{userData.project && Object.keys(userData.project).length != 0 ? (
						<>
							<p className='project_name'>{userData.project?.name}</p>
							<a>
								<button
									className={
										page == 'specification'
											? 'dashboard_button active'
											: 'dashboard_button'
									}
									onClick={(e) =>
										router.push(
											`/specification/${userData.project?.id}`
										)
									}
								>
									<img
										src='/assets/icons/specification.svg'
										alt=''
									/>
									Cahier des charges
								</button>
							</a>
							<a href='/ticket'>
								<button
									className={
										page == 'ticket'
											? 'dashboard_button active'
											: 'dashboard_button'
									}
								>
									<img
										src='/assets/icons/tickets.svg'
										alt=''
									/>
									Tickets
								</button>
							</a>
							<a href={'/rex/' + userData.project?.id}>
								<button
									className={
										page == 'rex'
											? 'dashboard_button active'
											: 'dashboard_button'
									}
								>
									<img src='/assets/icons/rex.svg' alt='' />
									Rex
								</button>
							</a>
						</>
					) : null}
				</div>
				<div className='dashboard_profile'>
					<a href='/account'>
						<button
							className={
								page == 'account'
									? 'dashboard_button active'
									: 'dashboard_button'
							}
						>
							<img src='/assets/icons/user.svg' alt='' />
							Mon compte
						</button>
					</a>
					<button
						className='dashboard_button red'
						onClick={() => logout()}
					>
						<img src='/assets/icons/x.svg' alt='' />
						Déconnexion
					</button>
				</div>
			</div>
		</>
	);
}
