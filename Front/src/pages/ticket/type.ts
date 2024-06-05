export type TicketProps = {
	start_date?: string
	end_date?: string
	planningId?: string // Possiblement ça sers à rien (edit du ticket)
	user_id?: string // Possiblement ça sers à rien (edit du ticket)
	title?: string
	urgenceId?: number
	description?: string
	status?: string
}

export type TicketType = {
	projectId: string
	ticket_description: string
	ticket_end_date: string
	ticket_id: string
	ticket_planningId: string
	ticket_start_date: string
	ticket_status: string
	ticket_title: string
	ticket_urgenceId: number
	ticket_userId: string
}
