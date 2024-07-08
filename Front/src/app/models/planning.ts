import { Common } from './common';
import { Project } from './project';

export type CreatePlanning = {
	start_date: Date;
	end_date: Date;
	project: Project;
};

export type Planning = Common & CreatePlanning;

export type UpdatePlanning = Partial<Planning>;
