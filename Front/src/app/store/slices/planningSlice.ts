import { Planning } from '@/app/models/planning';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PLANNING } from '../../api/apiRoute';
import api from '@/app/api';
import {
	replaceAllPlanningByProjectIdRouteParam,
	replaceAllPlanningByUserIdRouteParam,
	replaceSinglePlanningByIdRouteParam,
} from '@/app/api/apiRouteHelper';
import { StatusEnum } from '../enum';

// Initial state
interface PlanningState {
	Plannings: Planning[];
	Planning: Planning | null;
	loading: boolean;
	error: string | undefined;
	status: StatusEnum;
}

const initialState: PlanningState = {
	Plannings: [],
	Planning: null,
	loading: false,
	error: undefined,
	status: StatusEnum.Idle,
};

export const createPlanning = createAsyncThunk(
	'planning/createPlanning',
	async (planning: Planning) => {
		const response = await api.post(PLANNING, planning);
		return response.data;
	}
);

export const getPlanningById = createAsyncThunk(
	'planning/getPlanningById',
	async (id: string) => {
		const response = await api.get(replaceSinglePlanningByIdRouteParam(id));
		return response.data;
	}
);

export const getAllPlanningByProjectId = createAsyncThunk(
	'planning/getAllPlanningByProjectId',
	async (id: string) => {
		const response = await api.get(
			replaceAllPlanningByProjectIdRouteParam(id)
		);
		return response.data;
	}
);

export const getAllPlanningByUserId = createAsyncThunk(
	'planning/getAllPlanningByUserId',
	async (id: string) => {
		const response = await api.get(
			replaceAllPlanningByUserIdRouteParam(id)
		);
		return response.data;
	}
);

export const updatePlanningById = createAsyncThunk(
	'planning/updatePlanningById',
	async (planning: Planning) => {
		const response = await api.put(
			replaceSinglePlanningByIdRouteParam(planning.id),
			planning
		);
		return response.data;
	}
);

export const deletePlanningById = createAsyncThunk(
	'planning/deletePlanningById',
	async (id: string) => {
		const response = await api.delete(
			replaceSinglePlanningByIdRouteParam(id)
		);
		return response.data;
	}
);

const PlanningSlice = createSlice({
	name: 'Planning',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// CREATE
		builder
			.addCase(createPlanning.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Loading;
			})
			.addCase(createPlanning.fulfilled, (state, action) => {
				state.loading = false;
				state.Planning = action.payload;
				state.status = StatusEnum.Succeeded;
			})
			.addCase(createPlanning.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});

		// GET BY ID
		builder
			.addCase(getPlanningById.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Loading;
			})
			.addCase(getPlanningById.fulfilled, (state, action) => {
				state.loading = false;
				state.Planning = action.payload;
				state.status = StatusEnum.Succeeded;
			})
			.addCase(getPlanningById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});

		// GET ALL BY PROJECT ID
		builder
			.addCase(getAllPlanningByProjectId.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Loading;
			})
			.addCase(getAllPlanningByProjectId.fulfilled, (state, action) => {
				state.loading = false;
				state.Plannings = action.payload;
				state.status = StatusEnum.Succeeded;
			})
			.addCase(getAllPlanningByProjectId.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});

		// GET ALL BY USER ID
		builder
			.addCase(getAllPlanningByUserId.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Loading;
			})
			.addCase(getAllPlanningByUserId.fulfilled, (state, action) => {
				state.loading = false;
				state.Plannings = action.payload;
				state.status = StatusEnum.Succeeded;
			})
			.addCase(getAllPlanningByUserId.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});

		// UPDATE
		builder
			.addCase(updatePlanningById.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Loading;
			})
			.addCase(updatePlanningById.fulfilled, (state, action) => {
				state.loading = false;
				state.Planning = action.payload;
				state.status = StatusEnum.Succeeded;
			})
			.addCase(updatePlanningById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});

		// DELETE
		builder
			.addCase(deletePlanningById.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Loading;
			})
			.addCase(deletePlanningById.fulfilled, (state, action) => {
				state.loading = false;
				state.Planning = null;
				state.status = StatusEnum.Succeeded;
			})
			.addCase(deletePlanningById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});
	},
});

export default PlanningSlice.reducer;
