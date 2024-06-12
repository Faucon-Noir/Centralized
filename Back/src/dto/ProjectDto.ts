export interface ProjectDto {
	id: string;
	name: string;
	description: string;
	functionality: string;
	forecast: string;
	start_date: Date;
	end_date: Date;
	budget: string;
	technology: string;
	constraints: string;
	validation: string;
	template: string;
	status: boolean;
	color: number;
}

export interface CreateProjectDto {}
export interface UpdateProjectDto {}
