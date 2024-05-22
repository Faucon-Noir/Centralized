import { MouseEventHandler } from 'react'

export type ProjetCardPlanningProps = {
	name: string
	id: number
	totalTickets: number
	color: number
	onClick: () => void
}
