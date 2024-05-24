import { UserType } from '../account/type'

export type TeamProps = {
	avatar: File | null
	name: string
}
export type CreateTeamProps = TeamProps & {
	users: string[]
}
export type TeamType = TeamProps & {
	id: string
	created_at: string
	users: UserType[]
	[key: string]: any
}
