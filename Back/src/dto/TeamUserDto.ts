import { TeamDto } from "./TeamDto";
import { UserDto } from "./UserDto";

export interface TeamUserDto {
	id: string;
	team: TeamDto;
	user: UserDto;
}

export interface CreateTeamUserDto {}
export interface UpdateTeamUserDto {}
