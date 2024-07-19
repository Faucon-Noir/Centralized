import { CreateSpecification, Specification } from '@/app/models/specification';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StatusEnum } from '../enum';
import api from '@/app/api';
import { SPECIFICATIONS } from '@/app/api/apiRoute';
import {
	formatSpecificationsByProjectIdRouteParam,
	formatSpecificationsByUserIdRouteParam,
	formatSpecificationByIdRouteParam,
} from '@/app/api/apiRouteHelper';

// Initial state
interface SpecificationState {
	AllSpecifications: Specification[];
	Specification: Specification | null;
	CreateSpecification: CreateSpecification | null;
	loading: boolean;
	error: string | undefined;
	status: StatusEnum;
}

const initialState: SpecificationState = {
	AllSpecifications: [],
	Specification: null,
	CreateSpecification: null,
	loading: false,
	error: undefined,
	status: StatusEnum.Idle,
};

const createSpecification = createAsyncThunk(
	'specification/createSpecification',
	async (specification: CreateSpecification) => {
		const response = await api.post(SPECIFICATIONS, specification);
		return response.data;
	}
);

const getSpecificationById = createAsyncThunk(
	'specification/getSpecificationById',
	async (id: string): Promise<Specification> => {
		const response = await api.get(formatSpecificationByIdRouteParam(id));
		return response.data;
	}
);

const getAllSpecificationByUserId = createAsyncThunk(
	'specification/getAllSpecificationByUserId',
	async (id: string): Promise<Specification[]> => {
		const response = await api.get(
			formatSpecificationsByUserIdRouteParam(id)
		);
		return response.data;
	}
);

const getAllSpecificationByProjectId = createAsyncThunk(
	'specification/getAllSpecificationByProjectId',
	async (id: string): Promise<Specification[]> => {
		const response = await api.get(
			formatSpecificationsByProjectIdRouteParam(id)
		);
		return response.data;
	}
);

const updateSpecificationById = createAsyncThunk(
	'specification/updateSpecificationById',
	async (specification: Specification) => {
		const response = await api.patch(
			formatSpecificationByIdRouteParam(specification.id),
			specification
		);
		return response.data;
	}
);

const deleteSpecificationById = createAsyncThunk(
	'specification/deleteSpecificationById',
	async (id: string) => {
		const response = await api.delete(
			formatSpecificationByIdRouteParam(id)
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
				state.status = StatusEnum.Pending;
			})
			.addCase(createSpecification.fulfilled, (state, action) => {
				state.loading = false;
				state.Specification = action.payload;
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
				state.status = StatusEnum.Pending;
			})
			.addCase(getSpecificationById.fulfilled, (state, action) => {
				state.loading = false;
				state.Specification = action.payload;
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
				state.status = StatusEnum.Pending;
			})
			.addCase(getAllSpecificationByUserId.fulfilled, (state, action) => {
				state.loading = false;
				state.AllSpecifications = action.payload;
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
				state.status = StatusEnum.Pending;
			})
			.addCase(
				getAllSpecificationByProjectId.fulfilled,
				(state, action) => {
					state.loading = false;
					state.AllSpecifications = action.payload;
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
				state.status = StatusEnum.Pending;
			})
			.addCase(updateSpecificationById.fulfilled, (state, action) => {
				state.loading = false;
				state.Specification = action.payload;
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
				state.status = StatusEnum.Pending;
			})
			.addCase(deleteSpecificationById.fulfilled, (state, action) => {
				state.loading = false;
				state.Specification = null;
				state.AllSpecifications = state.AllSpecifications.filter(
					(specification) => specification.id !== action.payload.id
				);
				state.status = StatusEnum.Succeeded;
			})
			.addCase(deleteSpecificationById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});
	},
});

export {
	createSpecification,
	getSpecificationById,
	getAllSpecificationByUserId,
	getAllSpecificationByProjectId,
	updateSpecificationById,
	deleteSpecificationById,
};
export default SpecificationSlice.reducer;
