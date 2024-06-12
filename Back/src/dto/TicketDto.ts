import { StatusEnum } from "../enum";

export interface TicketDto {
	id: string;
	title: string;
	description: string;
	urgenceId: number;
	status: StatusEnum;
	start_date: Date;
	end_date: Date;
	planningId: string;
	userId: string;
}
export interface CreateTicketDto {}
export interface UpdateTicketDto {}
