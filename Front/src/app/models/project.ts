import { Common } from './common';

export type CreateProject = {
	team: string;
	user: string;
	teamUser: string;
	name: string;
	description: string;
	functionality: string;
	forecast: string;
	start_date: Date;
	end_date: Date;
	budget: string;
	technology: string;
	constraints: string;
	constraint: string;
	validation: string;
	template: number;
	status: boolean;
};
export type Project = Common & CreateProject & { color: number };
export type UpdateProject = Partial<Project>;
