import api from '@/app/api';
import { PROJECTS } from '@/app/api/apiRoute';
import { formatProjectByUserIdRouteParam } from '@/app/api/apiRouteHelper';
import { CreateProject, Project, UpdateProject } from '@/app/models/project';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StatusEnum } from '../enum';

// Initial state
interface ProjectState {
	AllProjects: Project[];
	Project: Project | UpdateProject | null;
	CreateProject: CreateProject | null;
	SelectedProject: string;
	loading: boolean;
	error: string | undefined;
	status: StatusEnum;
}

const initialState: ProjectState = {
	AllProjects: [],
	Project: null,
	CreateProject: null,
	SelectedProject: '',
	loading: false,
	error: undefined,
	status: StatusEnum.Idle,
};

const createProject = createAsyncThunk(
	'project/createProject',
	async (project: CreateProject) => {
		const response = await api.post(PROJECTS, project);
		return response.data;
	}
);

const getProjectById = createAsyncThunk(
	'project/getProjectById',
	async (id: string): Promise<Project> => {
		const response = await api.get(formatProjectByIdRouteParam(id));
		return response.data;
	}
);

const getAllProjectByUserId = createAsyncThunk(
	'project/getAllProjectByUserId',
	async (id: string): Promise<Project[]> => {
		const response = await api.get(formatProjectByUserIdRouteParam(id));
		return response.data;
	}
);

const updateProjectById = createAsyncThunk(
	'project/updateProjectById',
	async (project: Project) => {
		const response = await api.patch(
			formatProjectByIdRouteParam(project.id),
			project
		);
		return response.data;
	}
);

const deleteProjectById = createAsyncThunk(
	'project/deleteProjectById',
	async (id: string) => {
		const response = await api.delete(formatProjectByIdRouteParam(id));
		return response.data;
	}
);

const ProjectSlice = createSlice({
	name: 'Project',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// CREATE
		builder
			.addCase(createProject.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Pending;
			})
			.addCase(createProject.fulfilled, (state, action) => {
				state.loading = false;
				state.error = undefined;
				state.Project = action.payload;
				state.status = StatusEnum.Succeeded;
			})
			.addCase(createProject.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});

		// GET BY ID
		builder
			.addCase(getProjectById.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Pending;
			})
			.addCase(getProjectById.fulfilled, (state, action) => {
				state.loading = false;
				state.Project = action.payload;
				state.status = StatusEnum.Succeeded;
			})
			.addCase(getProjectById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});

		// GET ALL BY USER ID
		builder
			.addCase(getAllProjectByUserId.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Pending;
			})
			.addCase(getAllProjectByUserId.fulfilled, (state, action) => {
				state.loading = false;
				state.AllProjects = action.payload;
				state.status = StatusEnum.Succeeded;
			})
			.addCase(getAllProjectByUserId.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});

		// UPDATE BY ID
		builder
			.addCase(updateProjectById.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Pending;
			})
			.addCase(updateProjectById.fulfilled, (state, action) => {
				state.loading = false;
				state.Project = action.payload;
				state.status = StatusEnum.Succeeded;
			})
			.addCase(updateProjectById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});

		// DELETE BY ID
		builder
			.addCase(deleteProjectById.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Pending;
			})
			.addCase(deleteProjectById.fulfilled, (state, action) => {
				state.loading = false;
				state.Project = null;
				state.AllProjects = state.AllProjects.filter(
					(project) => project.id !== action.payload.id
				);
				state.status = StatusEnum.Succeeded;
			})
			.addCase(deleteProjectById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});
	},
});

export {
	createProject,
	getProjectById,
	getAllProjectByUserId,
	updateProjectById,
	deleteProjectById,
};
export default ProjectSlice.reducer;
function formatProjectByIdRouteParam(id: string): string {
	throw new Error('Function not implemented.');
}
