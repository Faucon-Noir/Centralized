export interface CreateTeamDto {
	name: string;
	avatar: string;
}

export interface TeamDto extends CreateTeamDto {
	id: string;
}

export interface UpdateTeamDto extends Partial<TeamDto> {}
