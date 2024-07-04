import { ProjectDto } from "./ProjectDto";
import { TeamDto } from "./TeamDto";
import { UserDto } from "./UserDto";

export interface SpecificationDto {
	id: string;
	cdc: string;
	project: ProjectDto[];
	user: UserDto;
	team: TeamDto;
}

export interface CreateSpecificationDto {}
export interface UpdateSpecificationDto extends Partial<SpecificationDto> {}
