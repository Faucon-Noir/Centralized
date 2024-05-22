export type userProps = {
	lastname: string
	firstname: string
	mail: string
	password: string
}

export type useDataProps = {
	user: userProps
}

export type LastRexType = {
	lastrex: [
		{ answer1: string; answer2: string; answer3: string; name: string },
	]
}
