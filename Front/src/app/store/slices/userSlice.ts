import { User } from '@/app/models/user';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StatusEnum } from '../enum';
import api from '@/app/api';
import {
	replaceSingleUserByIdRouteParam,
	replaceSingleUserByMailRouteParam,
} from '@/app/api/apiRouteHelper';
// Initial state
interface UserState {
	Users: User[];
	User: User | null;
	loading: boolean;
	error: string | undefined;
	status: StatusEnum;
}

const initialState: UserState = {
	Users: [],
	User: null,
	loading: false,
	error: undefined,
	status: StatusEnum.Idle,
};

const getUserById = createAsyncThunk('user/getUserById', async (id: string) => {
	const response = await api.get(replaceSingleUserByIdRouteParam(id));
	return response.data;
});

const getUserByMail = createAsyncThunk(
	'user/getUserByMail',
	async (mail: string): Promise<User> => {
		const response = await api.get(replaceSingleUserByMailRouteParam(mail));
		return response.data;
	}
);

const update = createAsyncThunk('user/update', async (user: User) => {
	const response = await api.put(
		replaceSingleUserByIdRouteParam(user.id),
		user
	);
	return response.data;
});

const deleteUser = createAsyncThunk('user/delete', async (id: string) => {
	const response = await api.delete(replaceSingleUserByIdRouteParam(id));
	return response.data;
});

const UserSlice = createSlice({
	name: 'User',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// GET USER BY ID
		builder
			.addCase(getUserById.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Pending;
			})
			.addCase(getUserById.fulfilled, (state, action) => {
				state.loading = false;
				state.User = action.payload;
				state.status = StatusEnum.Succeeded;
			})
			.addCase(getUserById.rejected, (state, action) => {
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
			.addCase(update.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Pending;
			})
			.addCase(update.fulfilled, (state, action) => {
				state.loading = false;
				state.User = action.payload;
				state.status = StatusEnum.Succeeded;
			})
			.addCase(update.rejected, (state, action) => {
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
				state.User = null;
				state.status = StatusEnum.Succeeded;
			})
			.addCase(deleteUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});
	},
});

export { getUserById, getUserByMail, update, deleteUser };
export default UserSlice.reducer;
