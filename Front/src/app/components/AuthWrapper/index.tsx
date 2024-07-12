import { useTypedSelector } from '@/app/store';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AuthWrapperProps } from './type';

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
	const router = useRouter();
	const token = useTypedSelector((state) => state.auth.token);

	useEffect(() => {
		const checkToken = () => {
			if (router.pathname !== 'login') {
				if (token) {
					const decodedToken = jwtDecode(token);

					if (decodedToken.exp) {
						const expirationDate = new Date(
							decodedToken.exp * 1000
						);
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
		};
		checkToken();
	}, [token]);
	return <>{children}</>;
};

export default AuthWrapper;
