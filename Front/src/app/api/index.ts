import axios from 'axios';
import { useRouter } from 'next/router';

const api = axios.create({
	baseURL: 'http://localhost:8000/api',
});

// Intercepteur pour tous les appels sortants, sauf sur "/login"

// TODO: Invalid Hook Call coté Front qui empeche la connexion
// Le problème viendrait du useTypedSelector qui est unhook
// Une solution serait de déplacer le useTypedSelector dans un composant react et serait entre le main et le AutWrapper dans _app.tx
// Le composant pourrait ressembler voir intégrer le AuthWrapper
// ça incluerait de modifier ce fichier pour l'englober dans un const createApi qui serait utilisé dans le composant

// Un résultgat possible de cette modif dans le composant:
// const token = useTypedSelector((state) => state.auth.token);
// const api = createApi(token);

api.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	config.headers.Authorization = `Bearer ${token}`;
	return config;
});

// Dans un  premier temps on va se concentrer sur les requêtes sortantes, et vérifier que le retour correspond à ce qui est attendu.
//  On verra les intercepteurs de réponses/télémétriques plus tard.

// api.interceptors.response.use(
// 	(response) => {
// 		const { config, status } = response;
// 		const milliseconds = getDurationApi(config);
// 		const msg = buildLogMessage(
// 			'Response',
// 			config,
// 			false,
// 			status,
// 			milliseconds
// 		);
// 		console.info(msg);
// 		return response;
// 	},
// 	(httpError: AxiosError<ErrorType>) => {
// 		if (!httpError.response) {
// 			throw httpError;
// 		}

// 		const { config, status, data } = httpError.response;
// 		const milliseconds = getDurationApi(config);
// 		const msg = buildLogMessage(
// 			'Response',
// 			config,
// 			true,
// 			status,
// 			milliseconds,
// 			data
// 		);
// 		console.error(msg);
// 		throw httpError;
// 	}
// );

export default api;
