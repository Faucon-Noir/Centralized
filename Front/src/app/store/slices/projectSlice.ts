import api from '@/app/api';
import { PROJECT } from '@/app/api/apiRoute';
import {
	replaceAllProjectByUserIdRouteParam,
	replaceSingleProjectByIdRouteParam,
} from '@/app/api/apiRouteHelper';
import { Project } from '@/app/models/project';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StatusEnum } from '../enum';
import {
	createPlanning,
	getPlanningById,
	getAllPlanningByProjectId,
	getAllPlanningByUserId,
	updatePlanningById,
	deletePlanningById,
} from './planningSlice';

// Initial state
export interface ProjectState {
	Projects: Project[];
	Project: Project | null;
	loading: boolean;
	error: string | undefined;
	status: StatusEnum;
}

const initialState: ProjectState = {
	Projects: [],
	Project: null,
	loading: false,
	error: undefined,
	status: StatusEnum.Idle,
};

const createProject = createAsyncThunk(
	'project/createProject',
	async (project: Project) => {
		const response = await api.post(PROJECT, project);
		return response.data;
	}
);

const getProjectById = createAsyncThunk(
	'project/getProjectById',
	async (id: string) => {
		const response = await api.get(replaceSingleProjectByIdRouteParam(id));
		return response.data;
	}
);

const getAllProjectByUserId = createAsyncThunk(
	'project/getAllProjectByUserId',
	async (id: string) => {
		const response = await api.get(replaceAllProjectByUserIdRouteParam(id));
		return response.data;
	}
);

const updateProjectById = createAsyncThunk(
	'project/updateProjectById',
	async (project: Project) => {
		const response = await api.patch(
			replaceSingleProjectByIdRouteParam(project.id),
			project
		);
		return response.data;
	}
);

const deleteProjectById = createAsyncThunk(
	'project/deleteProjectById',
	async (id: string) => {
		const response = await api.delete(
			replaceSingleProjectByIdRouteParam(id)
		);
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
				state.status = StatusEnum.Loading;
			})
			.addCase(createProject.fulfilled, (state, action) => {
				state.loading = false;
				state.error = undefined;
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
				state.status = StatusEnum.Loading;
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
				state.status = StatusEnum.Loading;
			})
			.addCase(getAllProjectByUserId.fulfilled, (state, action) => {
				state.loading = false;
				state.Projects = action.payload;
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
				state.status = StatusEnum.Loading;
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
				state.status = StatusEnum.Loading;
			})
			.addCase(deleteProjectById.fulfilled, (state, action) => {
				state.loading = false;
				state.Project = null;
				state.status = StatusEnum.Succeeded;
			})
			.addCase(deleteProjectById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});
	},
});

export default ProjectSlice.reducer;
