import { UserType } from '@/pages/account/type'
import { TeamType } from '../type'

export type TeamDetails = {
	created_at: string
	id: number
	team: TeamType
	user: UserType[]
}
