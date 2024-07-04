import api from '@/app/api';
import { LOGIN, REGISTER, REQUEST_RESET_PASSWORD } from '@/app/api/apiRoute';
import { Login, Register } from '@/app/models/auth';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StatusEnum } from '../enum';
import { stat } from 'fs';

// Initial state
interface AuthState {
	token: string | null;
	loading: boolean;
	error: string | undefined;
	status: StatusEnum;
}

const initialState: AuthState = {
	token: null,
	loading: false,
	error: undefined,
	status: StatusEnum.Idle,
};

const postLogin = createAsyncThunk('auth/login', async (login: Login) => {
	const response = await api.post(LOGIN, login);
	return response.data;
});

const postRegister = createAsyncThunk(
	'auth/register',
	async (register: Register) => {
		const response = await api.post(REGISTER, register);
		return response.data;
	}
);

const postRequestResetPassword = createAsyncThunk(
	'auth/requestResetPassword',
	async (mail: string) => {
		const response = await api.post(REQUEST_RESET_PASSWORD, mail);
		return response.data;
	}
);

const AuthSlice = createSlice({
	name: 'Auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// Login
		builder
			.addCase(postLogin.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Loading;
			})
			.addCase(postLogin.fulfilled, (state, action) => {
				state.loading = false;
				state.token = action.payload;
				state.status = StatusEnum.Succeeded;
				state.token = action.payload;
			})
			.addCase(postLogin.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});

		// Register
		builder
			.addCase(postRegister.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Loading;
			})
			.addCase(postRegister.fulfilled, (state, action) => {
				state.loading = false;
				state.token = action.payload;
				state.status = StatusEnum.Succeeded;
				state.token = action.payload;
			})
			.addCase(postRegister.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});
		// Request Reset Password
		builder
			.addCase(postRequestResetPassword.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Loading;
			})
			.addCase(postRequestResetPassword.fulfilled, (state, action) => {
				state.loading = false;
				state.token = action.payload;
				state.status = StatusEnum.Succeeded;
				state.token = action.payload;
			})
			.addCase(postRequestResetPassword.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});
	},
});

export default AuthSlice.reducer;
