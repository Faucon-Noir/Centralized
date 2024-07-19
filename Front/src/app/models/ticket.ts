import { Common } from './common';

export type CreateTicket = {
	title: string;
	description: string;
	urgenceId: number;
	status: string;
	start_date: string;
	end_date: string;
	planningId: string;
	userId: string;
};
export type Ticket = Common & CreateTicket;
export type UpdateTicket = Partial<Ticket>;
