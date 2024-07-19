import { AxiosRequestConfig } from 'axios';
import { ErrorType, HttpInterceptorsType } from './types';
import { REQUEST_START_TIME_KEY } from './constants';

// Pour le moment on s'en sert pas, mais ça sera utile à terme

export const buildLogMessage = (
	interceptorType: HttpInterceptorsType,
	config: AxiosRequestConfig,
	isError: boolean,
	status?: number,
	time?: number,
	data?: ErrorType
): string => {
	if (isError) {
		return `Error - code: ${status} on ${config.baseURL}${
			config.url
		} with response: ${JSON.stringify(data)}`;
	}
	return interceptorType === 'Request'
		? `⬆️ Request -> ${config.baseURL}${config.url}`
		: `⬇️ Response(${time} ms) -> ${status} : ${config.baseURL}${config.url}`;
};

export const getDurationApi = (config: AxiosRequestConfig): number => {
	const start = config.headers ? config.headers[REQUEST_START_TIME_KEY] : 0;
	const end = new Date().getTime();
	const milliseconds = start ? end - start : 0;

	return milliseconds;
};
