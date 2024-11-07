// Comrponents
import AuthWrapper from '@/app/components/Middleware/AuthWrapper';
import { TaskProvider } from '../app/contexts/isReq'; // Importation du contexte
import DesktopNavigation from '@/app/components/Navigation/Desktop/DesktopNavigation';
import MobileNavigation from '@/app/components/Navigation/Mobile/MobileNavigation';

// Material	UI
import { Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// Next
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import { useRouter } from 'next/router';

// React
import { useEffect, useState } from 'react';

// Utils
import './main_style.scss';
import './global.scss';
import UserData from '@/utils/User/UserData';
import GlobalPollingComponent from '@/app/components/Polling/GlobalPollingComponent';

// Font files can be colocated inside of `pages`
const myFont = localFont({ src: './fonts/Poppins-Medium.ttf' });

export default function App({ Component, pageProps }: AppProps) {
	const [showMobileNav, setShowMobileNav] = useState(false);
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
	const [previousRoute, setPreviousRoute] = useState<string | null>(null);
	const router = useRouter();

	useEffect(() => {
		setWindowWidth(window.innerWidth);

		const handleResize = () => setWindowWidth(window.innerWidth);
		const handleRouteChange = () => setWindowWidth(window.innerWidth);

		window.addEventListener('resize', handleResize);
		router.events.on('routeChangeComplete', handleRouteChange);

		return () => {
			window.removeEventListener('resize', handleResize);
			router.events.off('routeChangeComplete', handleRouteChange);
		};
	}, [router.events]);

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

	useEffect(() => {
		const handleRouteChangeStart = (url: string) => {
			setPreviousRoute(router.pathname);
		};

		const handleRouteChangeComplete = (url: string) => {
			if (previousRoute === '/login' && url === '/') {
				window.location.reload();
			}
		};

		router.events.on('routeChangeStart', handleRouteChangeStart);
		router.events.on('routeChangeComplete', handleRouteChangeComplete);

		return () => {
			router.events.off('routeChangeStart', handleRouteChangeStart);
			router.events.off('routeChangeComplete', handleRouteChangeComplete);
		};
	}, [router, previousRoute]);

	if (loading) {
		return <div>En attente</div>;
	}

	return (
		<main className={myFont.className} style={{ height: '100%' }}>
			{Component.name == 'LoginPage' ||
			Component.name == 'WelcomePage' ? (
				<Component {...pageProps} userData={userData} />
			) : (
				<AuthWrapper>
					<TaskProvider>
						{Component.name === 'LoginPage' ? (
							<Component {...pageProps} userData={userData} />
						) : windowWidth >= 1280 ? (
							<Grid container style={{ height: '100%' }}>
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
								<MenuIcon
									className='burgerMenu'
									onClick={() => setShowMobileNav(true)}
								/>
								{/* </button> */}
								{showMobileNav ? (
									<MobileNavigation
										page={Component.name}
										userData={
											userData?.user ? userData : {}
										}
										setShowMobileNav={setShowMobileNav}
									/>
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
