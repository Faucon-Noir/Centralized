import { Common } from './common';

export type CreateTeam = {
	name: string;
	avatar: string;
};
export type Team = Common & CreateTeam;
export type UpdateTeam = Partial<Team>;
