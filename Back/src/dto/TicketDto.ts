import { StatusEnum } from "../enum";

export interface TicketDto {
  id: string;
  title: string;
  description: string;
  urgenceId: number;
  status: StatusEnum;
  planningId: string;
}
