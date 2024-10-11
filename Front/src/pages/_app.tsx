import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import './main_style.scss';
import AuthWrapper from '@/app/components/Middleware/AuthWrapper';
import { TaskProvider } from '../app/contexts/isReq'; // Importation du contexte
import GlobalPollingComponent from '@/app/components/Polling/GlobalPollingComponent';
import UserData from '@/utils/User/UserData';
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import Dashboard from '@/app/components/Dashboard/Dashboard';
import React from 'react';

// Font files can be colocated inside of `pages`
const myFont = localFont({ src: './fonts/Poppins-Medium.ttf' });

export default function App({ Component, pageProps }: AppProps) {
	const [loading, setLoading] = useState(true); // Ajouter un état de chargement
	const [userData, setUserData] = useState<any>({
		project: [
			{
				rex: [],
				ticket: [],
			},
		],
		team: [],
		user: [],
		specification: [],
		selectedProjects: [],
	});
	const [windowWidth, setWindowWidth] = useState<number>(0);

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		if (Component.name != "LoginPage") {
			UserData().then(result => {
				setUserData(result)
			setLoading(false); // Une fois que les données sont prêtes, on arrête le chargement
			})
		} else {
			setLoading(false);
		}
	}, [Component.name]);


	if (loading) {
		return <div>En attente</div>;
	}

	return (
		<>
			<main className={myFont.className}>
				{Component.name == 'LoginPage' ||
				Component.name == 'WelcomePage' ? (
					<Component {...pageProps} userData={userData} />
				) : (
					<AuthWrapper>
						<TaskProvider>
							{Component.name === 'LoginPage' ? (
								<>
									<Component
										{...pageProps}
										userData={userData}
									/>
								</>
							) : windowWidth >= 600 ? (
								<Grid container>
									{windowWidth >= 1080 ? (
										<Grid xs={2} item={true}>
											<Dashboard
												page={Component.name}
												userData={
													userData?.user
														? userData
														: {}
												}
												updateUserData={setUserData}
											/>
										</Grid>
									) : (
										<></>
									)}
									<Grid xs={10} item={true}>
										<Component
											{...pageProps}
											userData={
												userData?.user ? userData : {}
											}
											updateUserData={setUserData}
										/>
										<GlobalPollingComponent />
									</Grid>
								</Grid>
							) : (
								<>
									<Component
										{...pageProps}
										userData={
											userData?.user ? userData : {}
										}
										updateUserData={setUserData}
									/>
									<GlobalPollingComponent />
								</>
							)}
						</TaskProvider>
					</AuthWrapper>
				)}
			</main>
		</>
	);
}
