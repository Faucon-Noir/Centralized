import { Rex } from '@/app/models/rex';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StatusEnum } from '../enum';
import { REX } from '@/app/api/apiRoute';
import api from '@/app/api';
import { CreateRex } from '../../models/rex';
import {
	replaceAllRexByProjectIdRouteParam,
	replaceSingleRexByIdRouteParam,
} from '@/app/api/apiRouteHelper';

// Initial state
interface RexState {
	AllRexs: Rex[];
	Rex: Rex | null;
	CreateRex: CreateRex | null;
	loading: boolean;
	error: string | undefined;
	status: StatusEnum;
}

const initialState: RexState = {
	AllRexs: [],
	Rex: null,
	CreateRex: null,
	loading: false,
	error: undefined,
	status: StatusEnum.Idle,
};

const createRex = createAsyncThunk('rex/createRex', async (rex: CreateRex) => {
	const response = await api.post(REX, rex);
	return response.data;
});

const getRexById = createAsyncThunk(
	'rex/getRexById',
	async (id: string): Promise<Rex> => {
		const response = await api.get(replaceSingleRexByIdRouteParam(id));
		return response.data;
	}
);

const getAllRexByProjectId = createAsyncThunk(
	'rex/getAllRexByProjectId',
	async (id: string): Promise<Rex[]> => {
		const response = await api.get(replaceAllRexByProjectIdRouteParam(id));
		return response.data;
	}
);

const updateRexById = createAsyncThunk(
	'rex/updateRexById',
	async (rex: Rex) => {
		const response = await api.patch(
			replaceSingleRexByIdRouteParam(rex.id),
			rex
		);
		return response.data;
	}
);

const deleteRexById = createAsyncThunk(
	'rex/deleteRexById',
	async (id: string) => {
		const response = await api.delete(replaceSingleRexByIdRouteParam(id));
		return response.data;
	}
);

const RexSlice = createSlice({
	name: 'Rex',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		//  CREATE
		builder
			.addCase(createRex.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Pending;
			})
			.addCase(createRex.fulfilled, (state, action) => {
				state.loading = false;
				state.error = undefined;
				state.Rex = action.payload;
				state.status = StatusEnum.Succeeded;
			})
			.addCase(createRex.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});

		// GET BY ID
		builder
			.addCase(getRexById.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Pending;
			})
			.addCase(getRexById.fulfilled, (state, action) => {
				state.loading = false;
				state.Rex = action.payload;
				state.status = StatusEnum.Succeeded;
			})
			.addCase(getRexById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});

		// GET ALL BY PROJECT ID
		builder
			.addCase(getAllRexByProjectId.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Pending;
			})
			.addCase(getAllRexByProjectId.fulfilled, (state, action) => {
				state.loading = false;
				state.AllRexs = action.payload;
				state.status = StatusEnum.Succeeded;
			})
			.addCase(getAllRexByProjectId.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});

		// UPDATE BY ID
		builder
			.addCase(updateRexById.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Pending;
			})
			.addCase(updateRexById.fulfilled, (state, action) => {
				state.loading = false;
				state.error = undefined;
				state.Rex = action.payload;
				state.status = StatusEnum.Succeeded;
			})
			.addCase(updateRexById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});

		// DELETE BY ID
		builder
			.addCase(deleteRexById.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Pending;
			})
			.addCase(deleteRexById.fulfilled, (state, action) => {
				state.loading = false;
				state.error = undefined;
				state.Rex = null;
				state.AllRexs = state.AllRexs.filter(
					(rex) => rex.id !== action.payload.id
				);
				state.status = StatusEnum.Succeeded;
			})
			.addCase(deleteRexById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});
	},
});

export {
	createRex,
	getRexById,
	getAllRexByProjectId,
	updateRexById,
	deleteRexById,
};
export default RexSlice.reducer;
