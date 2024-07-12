import axios from 'axios';
import { useRouter } from 'next/router';
import { useTypedSelector } from '../store/index';

const api = axios.create({
	baseURL: process.env.API_URL ?? '',
});

// Intercepteur pour tous les appels sortants, sauf sur "/login"
api.interceptors.request.use((config) => {
	const router = useRouter();
	if (router.pathname !== '/login') {
		const token = useTypedSelector((state) => state.auth.token);
		// Ajout du token dans l'en-tête
		// const token = localStorage.getItem('token');
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// Dans un  premier temps on va se concentrer sur les requêtes sortantes, et vérifier que le retour correspond à ce qui est attendu.
//  On verra les intercepteurs de réponses/télémétriques plus tard.

// api.interceptors.response.use(
// 	(response) => {
// 		const { config, status } = response
// 		const milliseconds = getDurationApi(config)
// 		const msg = buildLogMessage(
// 			'Response',
// 			config,
// 			false,
// 			status,
// 			milliseconds
// 		)
// 		console.info(msg)
// 		return response
// 	},
// 	(httpError: AxiosError<ErrorType>) => {
// 		if (!httpError.response) {
// 			throw httpError
// 		}

// 		const { config, status, data } = httpError.response
// 		const milliseconds = getDurationApi(config)
// 		const msg = buildLogMessage(
// 			'Response',
// 			config,
// 			true,
// 			status,
// 			milliseconds,
// 			data
// 		)
// 		console.error(msg)
// 		throw httpError
// 	}
// )

export default api;
