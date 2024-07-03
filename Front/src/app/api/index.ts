import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { buildLogMessage, getDurationApi } from './helpers'
import { ErrorType } from './types'

const api = axios.create({
	baseURL: process.env.API_URL ?? '',
})

// Intercepteur pour tous les appels sortants, sauf sur "/login"
api.interceptors.request.use((config) => {
	const router = useRouter()
	if (router.pathname !== '/login') {
		// Ajout du token dans l'en-tête
		const token = localStorage.getItem('token')
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

api.interceptors.response.use(
	(response) => {
		const { config, status } = response
		const milliseconds = getDurationApi(config)
		const msg = buildLogMessage(
			'Response',
			config,
			false,
			status,
			milliseconds
		)
		console.info(msg)
		return response
	},
	(httpError: AxiosError<ErrorType>) => {
		if (!httpError.response) {
			throw httpError
		}

		const { config, status, data } = httpError.response
		const milliseconds = getDurationApi(config)
		const msg = buildLogMessage(
			'Response',
			config,
			true,
			status,
			milliseconds,
			data
		)
		console.error(msg)
		throw httpError
	}
)

export default api
