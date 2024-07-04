import { ProjectDto } from "./ProjectDto";

export interface CreatePlanningDto {
	start_date: Date;
	end_date: Date;
	project: ProjectDto;
}

export interface PlanningDto extends CreatePlanningDto {
	id: string;
}

export interface UpdatePlanningDto extends Partial<PlanningDto> {}
