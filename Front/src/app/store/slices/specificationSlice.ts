import { Specification } from '@/app/models/specification';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StatusEnum } from '../enum';
import api from '@/app/api';
import { SPECIFICATION } from '@/app/api/apiRoute';
import {
	replaceAllSpecificationByProjectIdRouteParam,
	replaceAllSpecificationByUserIdRouteParam,
	replaceSingleSpecificationByIdRouteParam,
} from '@/app/api/apiRouteHelper';
import {
	createPlanning,
	getPlanningById,
	getAllPlanningByProjectId,
	getAllPlanningByUserId,
	updatePlanningById,
	deletePlanningById,
} from './planningSlice';

// Initial state
interface SpecificationState {
	specifications: Specification[];
	specification: Specification | null;
	loading: boolean;
	error: string | undefined;
	status: StatusEnum;
}

const initialState: SpecificationState = {
	specifications: [],
	specification: null,
	loading: false,
	error: undefined,
	status: StatusEnum.Idle,
};

const createSpecification = createAsyncThunk(
	'specification/createSpecification',
	async (specification: Specification) => {
		const response = await api.post(SPECIFICATION, specification);
		return response.data;
	}
);

const getSpecificationById = createAsyncThunk(
	'specification/getSpecificationById',
	async (id: string) => {
		const response = await api.get(
			replaceSingleSpecificationByIdRouteParam(id)
		);
		return response.data;
	}
);

const getAllSpecificationByUserId = createAsyncThunk(
	'specification/getAllSpecificationByUserId',
	async (id: string) => {
		const response = await api.get(
			replaceAllSpecificationByUserIdRouteParam(id)
		);
		return response.data;
	}
);

const getAllSpecificationByProjectId = createAsyncThunk(
	'specification/getAllSpecificationByProjectId',
	async (id: string) => {
		const response = await api.get(
			replaceAllSpecificationByProjectIdRouteParam(id)
		);
		return response.data;
	}
);

const updateSpecificationById = createAsyncThunk(
	'specification/updateSpecificationById',
	async (specification: Specification) => {
		const response = await api.patch(
			replaceSingleSpecificationByIdRouteParam(specification.id),
			specification
		);
		return response.data;
	}
);

const deleteSpecificationById = createAsyncThunk(
	'specification/deleteSpecificationById',
	async (id: string) => {
		const response = await api.delete(
			replaceSingleSpecificationByIdRouteParam(id)
		);
		return response.data;
	}
);

const SpecificationSlice = createSlice({
	name: 'specification',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// CREATE
		builder
			.addCase(createSpecification.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Loading;
			})
			.addCase(createSpecification.fulfilled, (state, action) => {
				state.loading = false;
				state.specification = action.payload;
				state.status = StatusEnum.Succeeded;
			})
			.addCase(createSpecification.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});

		// GET BY ID
		builder
			.addCase(getSpecificationById.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Loading;
			})
			.addCase(getSpecificationById.fulfilled, (state, action) => {
				state.loading = false;
				state.specification = action.payload;
				state.status = StatusEnum.Succeeded;
			})
			.addCase(getSpecificationById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});

		// GET ALL BY USER ID
		builder
			.addCase(getAllSpecificationByUserId.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Loading;
			})
			.addCase(getAllSpecificationByUserId.fulfilled, (state, action) => {
				state.loading = false;
				state.specifications = action.payload;
				state.status = StatusEnum.Succeeded;
			})
			.addCase(getAllSpecificationByUserId.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});

		// GET ALL BY PROJECT ID
		builder
			.addCase(getAllSpecificationByProjectId.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Loading;
			})
			.addCase(
				getAllSpecificationByProjectId.fulfilled,
				(state, action) => {
					state.loading = false;
					state.specifications = action.payload;
					state.status = StatusEnum.Succeeded;
				}
			)
			.addCase(
				getAllSpecificationByProjectId.rejected,
				(state, action) => {
					state.loading = false;
					state.error = action.error.message;
					state.status = StatusEnum.Failed;
				}
			);

		// UPDATE BY ID
		builder
			.addCase(updateSpecificationById.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Loading;
			})
			.addCase(updateSpecificationById.fulfilled, (state, action) => {
				state.loading = false;
				state.specification = action.payload;
				state.status = StatusEnum.Succeeded;
			})
			.addCase(updateSpecificationById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});

		// DELETE BY ID
		builder
			.addCase(deleteSpecificationById.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Loading;
			})
			.addCase(deleteSpecificationById.fulfilled, (state, action) => {
				state.loading = false;
				state.specification = action.payload;
				state.status = StatusEnum.Succeeded;
			})
			.addCase(deleteSpecificationById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});
	},
});

export default SpecificationSlice.reducer;
