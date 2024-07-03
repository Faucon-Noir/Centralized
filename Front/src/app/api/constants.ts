export const REQUEST_START_TIME_KEY = '__requestStartTime'

export type HttpConfigType = {
	headers: { [id: string]: string }
}

export const getHttpConfig = (): HttpConfigType => ({
	headers: {
		'Content-Type': 'application/json',
		__requestStartTime: new Date().getTime().toString(),
	},
})
