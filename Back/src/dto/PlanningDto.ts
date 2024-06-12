import { ProjectDto } from "./ProjectDto";
import { TicketDto } from "./TicketDto";

export interface PlanningDto {
	id: string;
	start_date: Date;
	end_date: Date;
	project: ProjectDto;
}

export interface CreatePlanningDto {}
export interface UpdatePlanningDto {}
