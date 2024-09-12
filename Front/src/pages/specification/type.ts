import { UserType } from '../account/type'

export type ProjectType = {
	id?: string
	color?: number
	team: string
	user: string
	name: string
	description: string
	functionality: string
	forecast: string
	start_date: string
	end_date: string
	budget: string
	technology: string
	constraints: string
	validation: string
	team_user: string
	constraint: string
	template: string
	status: boolean
	[keys: string]: string | boolean | undefined | number
}

export type TeamType = {
	created_at: string
	id: string
	team: {
		id: string
		name: string
		avatar: string
		created_at: string
	}
	user: UserType
}
