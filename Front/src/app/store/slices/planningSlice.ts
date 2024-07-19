import { CreatePlanning, Planning } from '@/app/models/planning';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PLANNINGS } from '../../api/apiRoute';
import api from '@/app/api';
import {
	formatPlanningByProjectIdRouteParam,
	formatPlanningsByUserIdRouteParam,
	formatPlanningByIdRouteParam,
} from '@/app/api/apiRouteHelper';
import { StatusEnum } from '../enum';

// Initial state
interface PlanningState {
	AllPlannings: Planning[];
	Planning: Planning | null;
	CreatePlanning: CreatePlanning | null;
	loading: boolean;
	error: string | undefined;
	status: StatusEnum;
}

const initialState: PlanningState = {
	AllPlannings: [],
	Planning: null,
	CreatePlanning: null,
	loading: false,
	error: undefined,
	status: StatusEnum.Idle,
};

const createPlanning = createAsyncThunk(
	'planning/createPlanning',
	async (planning: CreatePlanning) => {
		const response = await api.post(PLANNINGS, planning);
		return response.data;
	}
);

const getPlanningById = createAsyncThunk(
	'planning/getPlanningById',
	async (id: string): Promise<Planning> => {
		const response = await api.get(formatPlanningByIdRouteParam(id));
		return response.data;
	}
);

const getAllPlanningByProjectId = createAsyncThunk(
	'planning/getAllPlanningByProjectId',
	async (id: string): Promise<Planning[]> => {
		const response = await api.get(formatPlanningByProjectIdRouteParam(id));
		return response.data;
	}
);

const getAllPlanningByUserId = createAsyncThunk(
	'planning/getAllPlanningByUserId',
	async (id: string): Promise<Planning[]> => {
		const response = await api.get(formatPlanningsByUserIdRouteParam(id));
		return response.data;
	}
);

const updatePlanningById = createAsyncThunk(
	'planning/updatePlanningById',
	async (planning: Planning) => {
		const response = await api.put(
			formatPlanningByIdRouteParam(planning.id),
			planning
		);
		return response.data;
	}
);

const deletePlanningById = createAsyncThunk(
	'planning/deletePlanningById',
	async (id: string) => {
		const response = await api.delete(formatPlanningByIdRouteParam(id));
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
				state.status = StatusEnum.Pending;
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
				state.status = StatusEnum.Pending;
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
				state.status = StatusEnum.Pending;
			})
			.addCase(getAllPlanningByProjectId.fulfilled, (state, action) => {
				state.loading = false;
				state.AllPlannings = action.payload;
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
				state.status = StatusEnum.Pending;
			})
			.addCase(getAllPlanningByUserId.fulfilled, (state, action) => {
				state.loading = false;
				state.AllPlannings = action.payload;
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
				state.status = StatusEnum.Pending;
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
				state.status = StatusEnum.Pending;
			})
			.addCase(deletePlanningById.fulfilled, (state, action) => {
				state.loading = false;
				state.Planning = null;
				state.AllPlannings = state.AllPlannings.filter(
					(planning) => planning.id !== action.payload.id
				);
				state.status = StatusEnum.Succeeded;
			})
			.addCase(deletePlanningById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});
	},
});

export {
	createPlanning,
	getPlanningById,
	getAllPlanningByProjectId,
	getAllPlanningByUserId,
	updatePlanningById,
	deletePlanningById,
};
export default PlanningSlice.reducer;
