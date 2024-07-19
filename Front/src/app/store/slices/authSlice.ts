import api from '@/app/api';
import {
	LOGIN,
	REGISTER,
	REQUEST_RESET_PASSWORD,
	RESET_PASSWORD,
} from '@/app/api/apiRoute';
import { Login, Register } from '@/app/models/auth';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StatusEnum } from '../enum';
import { jwtDecode } from 'jwt-decode';

// Initial state
interface AuthState {
	token: string | null;
	loading: boolean;
	error: any | undefined;
	status: StatusEnum;
	userId: string;
}

const initialState: AuthState = {
	token: null,
	loading: false,
	error: undefined,
	status: StatusEnum.Idle,
	userId: '',
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

const postResetPassword = createAsyncThunk(
	'auth/resetPassword',
	async (data: { password: string; token: string }) => {
		const response = await api.post(RESET_PASSWORD, data);
		return response.data;
	}
);

const AuthSlice = createSlice({
	name: 'Auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// LOGIN
		builder
			.addCase(postLogin.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Pending;
			})
			.addCase(postLogin.fulfilled, (state, action) => {
				state.loading = false;
				state.token = action.payload;
				// TODO: Trouver pourquoi le jwtDecode ne fonctionne pas (base64 have incorrect length)
				// Probablement lié au problème d'intercepteur
				state.userId = jwtDecode<{ id: string }>(action.payload).id;
				console.log('userId', state.userId); // On peut faire des const et des log mais aucun intérêt pour autre chose que du debug
				state.status = StatusEnum.Succeeded;
			})
			.addCase(postLogin.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});

		// REGISTER
		builder
			.addCase(postRegister.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Pending;
			})
			.addCase(postRegister.fulfilled, (state, action) => {
				state.loading = false;
				state.token = action.payload;
				state.userId = jwtDecode<{ id: string }>(action.payload).id;
				state.status = StatusEnum.Succeeded;
			})
			.addCase(postRegister.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});

		// REQUEST RESET PASSWORD
		builder
			.addCase(postRequestResetPassword.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Pending;
			})
			.addCase(postRequestResetPassword.fulfilled, (state, action) => {
				state.loading = false;
				state.status = StatusEnum.Succeeded;
			})
			.addCase(postRequestResetPassword.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});

		// RESET PASSWORD
		builder
			.addCase(postResetPassword.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Pending;
			})
			.addCase(postResetPassword.fulfilled, (state, action) => {
				state.loading = false;
				state.status = StatusEnum.Succeeded;
			})
			.addCase(postResetPassword.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});
	},
});

export { postLogin, postRegister, postRequestResetPassword, postResetPassword };
export default AuthSlice.reducer;
