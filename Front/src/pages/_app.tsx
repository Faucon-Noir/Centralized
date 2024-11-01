import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import './main_style.scss';
import "./global.scss"

import AuthWrapper from '@/app/components/Middleware/AuthWrapper';
import { TaskProvider } from '../app/contexts/isReq'; // Importation du contexte
import GlobalPollingComponent from '@/app/components/Polling/GlobalPollingComponent';
import UserData from '@/utils/User/UserData';
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import DesktopNavigation from '@/app/components/Navigation/Desktop/DesktopNavigation';
import MobileNavigation from '@/app/components/Navigation/Mobile/MobileNavigation';
import MenuIcon from '@mui/icons-material/Menu';

// Font files can be colocated inside of `pages`
const myFont = localFont({ src: './fonts/Poppins-Medium.ttf' });

export default function App({ Component, pageProps }: AppProps) {
	const [showMobileNav, setShowMobileNav] = useState(false);
	const [loading, setLoading] = useState(true); // Ajouter un état de chargement
	console.log('mobilenav', showMobileNav);
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
	const [windowWidth, setWindowWidth] = useState<number>(1440);

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		if (Component.name != 'LoginPage') {
			UserData().then((result) => {
				setUserData(result);
				setLoading(false); // Une fois que les données sont prêtes, on arrête le chargement
			});
		} else {
			setLoading(false);
		}
	}, [Component.name]);

	if (loading) {
		return <div>En attente</div>;
	}

	return (
		<main className={myFont.className} style={{ height: "100%" }}>
			{Component.name == 'LoginPage' ||
				Component.name == 'WelcomePage' ? (
				<Component {...pageProps} userData={userData} />
			) : (
				<AuthWrapper>
					<TaskProvider>
						{Component.name === 'LoginPage' ? (
							<Component {...pageProps} userData={userData} />
						) : windowWidth >= 1280 ? (
							<Grid container style={{ height: "100%" }}>
								<Grid xs={2} item={true}>
									<DesktopNavigation
										page={Component.name}
										userData={
											userData?.user ? userData : {}
										}
										updateUserData={setUserData}
									/>
								</Grid>
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
								<button
									className='burgerMenu'
									onClick={() => setShowMobileNav(true)}
								>
									<MenuIcon />
								</button>
								{showMobileNav ? (
									<>
										<MobileNavigation
											page={Component.name}
											userData={
												userData?.user ? userData : {}
											}
											updateUserData={setUserData}
											setShowMobileNav={setShowMobileNav}
										/>
										<button
											onClick={() =>
												setShowMobileNav(false)
											}
										>
											Close
										</button>
									</>
								) : (
									<></>
								)}
								<Component
									{...pageProps}
									userData={userData?.user ? userData : {}}
									updateUserData={setUserData}
								/>
								<GlobalPollingComponent />
							</>
						)}
					</TaskProvider>
				</AuthWrapper>
			)}
		</main>
	);
}
