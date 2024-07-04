import { StatusEnum } from "../enum";

export interface CreateTicketDto {
	title: string;
	description: string;
	urgenceId: number;
	status: StatusEnum;
	start_date: Date;
	end_date: Date;
	planningId: string;
}

export interface TicketDto extends CreateTicketDto {
	id: string;
	userId: string;
}

export interface UpdateTicketDto extends Partial<TicketDto> {}
