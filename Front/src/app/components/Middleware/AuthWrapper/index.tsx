import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AuthWrapperProps } from './type';

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true); // Ajout d'un état de chargement

	const checkToken = () => {
		const token = localStorage.getItem("token");

		if (router.pathname !== '/login') {
			if (token) {
				try {
					const decodedToken: any = jwtDecode(token);

					if (decodedToken.exp) {
						const expirationDate = new Date(decodedToken.exp * 1000);
						const currentDate = new Date();

						if (expirationDate < currentDate) {
							console.log('Token expired');
							router.push('/login');
							return;
						}
					} else {
						console.log('Invalid token');
						router.push('/login');
						return;
					}
				} catch (error) {
					console.log('Error decoding token');
					router.push('/login');
					return;
				}
			} else {
				console.log('No token, please login');
				router.push('/login');
				return;
			}
		}
		setIsLoading(false); // Fin du chargement une fois la vérification effectuée
	};

	useEffect(() => {
		checkToken();
	}, [router.pathname]); // Ajouter pathname pour relancer la vérification à chaque changement de page

	// Si en cours de vérification, afficher un message de chargement
	if (isLoading) {
		return <div>Chargement...</div>; // Affichage temporaire pendant la vérification
	}

	return <>{children}</>; // Rendu des composants seulement après la vérification
};

export default AuthWrapper;