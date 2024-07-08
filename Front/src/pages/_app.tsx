import { jwtDecode } from 'jwt-decode';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import localFont from 'next/font/local';
import './main_style.scss';
import { store, useTypedSelector } from '@/app/store';
import src from '@emotion/styled';
import { log } from 'console';
import exp from 'constants';
import { Provider } from 'react-redux';

// Font files can be colocated inside of `pages`
const myFont = localFont({ src: './fonts/Poppins-Medium.ttf' });

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const token = useTypedSelector((state) => state.auth.token);
	useEffect(() => {
		if (router.pathname !== '/login') {
			if (token) {
				const decodedToken = jwtDecode(token);
				if (decodedToken.exp) {
					const expirationDate = new Date(decodedToken.exp * 1000);
					const currentDate = new Date();
					if (expirationDate < currentDate) {
						console.log('Token expired');
						router.push('/login');
					}
				} else {
					console.log('Invalid token');
					router.push('/login');
				}
			} else {
				console.log('No token, please login');
				router.push('/login');
			}
		}
	}, [router, token]);
	return (
		<Provider store={store}>
			<main className={myFont.className}>
				<Component {...pageProps} />
			</main>
		</Provider>
	);
}
