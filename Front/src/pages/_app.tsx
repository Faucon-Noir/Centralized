import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import './main_style.scss';
import AuthWrapper from '@/app/components/Middleware/AuthWrapper';
import { TaskProvider } from "../app/contexts/isReq"; // Importation du contexte
import GlobalPollingComponent from '@/app/components/Polling/GlobalPollingComponent';
import UserData from '@/utils/User/UserData';
import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import Dashboard from '@/app/components/Dashboard/Dashboard';

// Font files can be colocated inside of `pages`
const myFont = localFont({ src: './fonts/Poppins-Medium.ttf' });

export default function App({ Component, pageProps }: AppProps) {
	const [userData, setUserData] = useState<any>({
		project: [{
			rex: [],
			ticket: []
		}],
		team: [],
		user: [],
		specification: []
	});

	useEffect(() => {
		UserData().then(result => {
			setUserData(result)
		})
	}, [])

	return (
		<TaskProvider>
			<AuthWrapper>
				<main className={myFont.className}>
					{Component.name === "LoginPage" ? <>
						<Component {...pageProps} userData={userData} />
						<GlobalPollingComponent />
					</> : <Grid container>
						<Grid xs={2} item={true}>
							<Dashboard page={Component.name} userData={userData} />
						</Grid>
						<Grid xs={10} item={true}>
							<Component {...pageProps} userData={userData} />
							<GlobalPollingComponent />
						</Grid>
					</Grid>}
				</main>
			</AuthWrapper >
		</TaskProvider >

	);
}
