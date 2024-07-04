export interface CreateProjectDto {
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
export interface ProjectDto extends CreateProjectDto {
	id: string;
}

export interface UpdateProjectDto extends Partial<ProjectDto> {}
