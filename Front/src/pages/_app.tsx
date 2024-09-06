import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import './main_style.scss';
import { store } from '@/app/store';
import { Provider } from 'react-redux';
import UserData from '@/utils/User/UserData';

import AuthWrapper from '@/app/components/Middleware/AuthWrapper';

// Font files can be colocated inside of `pages`
const myFont = localFont({ src: './fonts/Poppins-Medium.ttf' });

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<AuthWrapper>
				<main className={myFont.className}>
					<Component {...pageProps} />
				</main>
			</AuthWrapper>
		</Provider>
	);
}
