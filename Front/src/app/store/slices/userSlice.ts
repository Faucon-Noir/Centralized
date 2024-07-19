import { User } from '@/app/models/user';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StatusEnum } from '../enum';
import api from '@/app/api';
import {
	formatUserByIdRouteParam,
	formatUserByMailRouteParam,
} from '@/app/api/apiRouteHelper';

// La définition d'un store

// Initial state
interface UserState {
	User: User;
	loading: boolean;
	error: string | undefined;
	status: StatusEnum;
}

const initialState: UserState = {
	User: {} as User,
	loading: false,
	error: undefined,
	status: StatusEnum.Idle,
};

// Thunks (async actions)
const getUserById = createAsyncThunk('user/getUserById', async (id: string) => {
	const response = await api.get(formatUserByIdRouteParam(id));
	return response.data;
});

const getUserByMail = createAsyncThunk(
	'user/getUserByMail',
	async (mail: string): Promise<User> => {
		const response = await api.get(formatUserByMailRouteParam(mail));
		return response.data;
	}
);

const updateUser = createAsyncThunk('user/update', async (user: User) => {
	const response = await api.put(formatUserByIdRouteParam(user.id), user);
	return response.data;
});

const deleteUser = createAsyncThunk('user/delete', async (id: string) => {
	const response = await api.delete(formatUserByIdRouteParam(id));
	return response.data;
});

// Slice
const UserSlice = createSlice({
	name: 'User',
	initialState,
	reducers: {}, // For simple actions only
	extraReducers: (builder) => {
		// For async actions & more specific reducers. Each thunk has 3 types of actions: pending, fulfilled, rejected.

		// GET USER BY ID
		builder
			.addCase(getUserById.pending, (state) => {
				// pending: en cours => chargement à vrai, reset de l'erreur à indéfini, status sur pending
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Pending;
			})
			.addCase(getUserById.fulfilled, (state, action) => {
				// fulfilled: réussi => chargement à faux, User à l'action.payload, status sur succeeded
				state.loading = false;
				state.User = action.payload;
				state.status = StatusEnum.Succeeded;
			})
			.addCase(getUserById.rejected, (state, action) => {
				// rejected: rejeté => chargement à faux, erreur à action.error.message, status sur failed
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});
		// GET USER BY MAIL
		builder
			.addCase(getUserByMail.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Pending;
			})
			.addCase(getUserByMail.fulfilled, (state, action) => {
				state.loading = false;
				state.User = action.payload;
				state.status = StatusEnum.Succeeded;
			})
			.addCase(getUserByMail.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});
		// UPDATE
		builder
			.addCase(updateUser.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Pending;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.loading = false;
				state.User = action.payload;
				state.status = StatusEnum.Succeeded;
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});
		// DELETE
		builder
			.addCase(deleteUser.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Pending;
			})
			.addCase(deleteUser.fulfilled, (state, action) => {
				state.loading = false;
				state.User = {} as User; // Reset User
				state.status = StatusEnum.Succeeded;
			})
			.addCase(deleteUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});
	},
});

export { getUserById, getUserByMail, updateUser, deleteUser };
export default UserSlice.reducer;
