import type { AppProps } from 'next/app';
import React, { useEffect, useState } from "react";
import localFont from 'next/font/local';
import './main_style.scss';
import { store } from '@/app/store';
import { Provider } from 'react-redux';
import { BarLoader } from "react-spinners"
import AuthWrapper from '@/app/components/Middleware/AuthWrapper';
import axios from 'axios';
import UserData from '@/utils/User/UserData';

// Font files can be colocated inside of `pages`
const myFont = localFont({ src: './fonts/Poppins-Medium.ttf' });

export default function App({ Component, pageProps }: AppProps) {
	const [isRequesting, setIsRequesting] = useState<String | null>("false");
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
		setIsRequesting(localStorage.getItem("isREQ") === null ? "false" : localStorage.getItem("isREQ"));
	}, [])


	// async function sleep(ms: number) {
	// 	return new Promise((resolve, reject) => {
	// 		setTimeout(resolve, ms);
	// 	})
	// }

	// function checkReq() {
	// 	sleep(10000).then(() => {
	// 		axios.get(`http://localhost:8000/api/specification/check-status`, { headers: { Authorization: `Bearer ${userData.user.token}` } }).then((responseStatus) => {
	// 			if (responseStatus.data.status === true) return true;
	// 		})
	// 		return false
	// 	})
	// }

	return (
		<Provider store={store}>
			<AuthWrapper>
				<main className={myFont.className}>
					{isRequesting === "true" ? <div className='reqLoad'>
						<p>Création de votre cahier des charges...</p>
						<p style={{ fontSize: "10px" }}>La page cahier des charges est temporairement désactivé</p>
						<BarLoader
							color="white"
							loading={true}
							speedMultiplier={1}
							width={200}
						/>
					</div> : null}
					{Component.name === "CreateSpecification" ? <Component {...pageProps} setIsRequesting={setIsRequesting} /> : <Component {...pageProps} />}
				</main>
			</AuthWrapper>
		</Provider>
	);
}
