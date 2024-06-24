import { TeamDto } from "./TeamDto";
import { UserDto } from "./UserDto";

export interface CreateTeamUserDto {
	team: TeamDto;
	user: UserDto;
}

export interface TeamUserDto extends CreateTeamUserDto {
	id: string;
}

export interface UpdateTeamUserDto extends Partial<TeamUserDto> {}
