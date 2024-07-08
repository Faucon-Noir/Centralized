import { Common } from './common';
import CreateSpecification from '../../pages/specification/create';
import { Project } from './project';
import { Team } from './team';
import { User } from './user';

export type CreateSpecification = {
	team: string;
	user: string;
	name: string;
	description: string;
	functionality: string;
	forecast: string;
	start_date: string;
	end_date: string;
	budget: string;
	technology: string;
	constraints: string;
	validation: string;
	team_user: string;
	constraint: string;
	template: number;
	status: boolean;
	[keys: string]: string | boolean | undefined | number;
};
export type Specification = Common & {
	cdc: string;
	project: Project[];
	user: User;
	team: Team;
	color?: string;
};
export type UpdateSpecification = Partial<Specification>;
