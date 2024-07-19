import { Team } from '@/app/models/team';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StatusEnum } from '../enum';
import api from '@/app/api';
import { TEAMUSER } from '@/app/api/apiRoute';
import {
	formatDeleteTeamById,
	formatDeleteUserFromTeam,
} from '../../api/apiRouteHelper';
import {
	formatCreateTeam,
	formatGetAllTeamsByUserId,
	formatGetAllUsersByTeamId,
	formatGetTeamById,
} from '@/app/api/apiRouteHelper';
import { User } from '@/app/models/user';

// Initial state
interface TeamState {
	Teams: Team[];
	Team: Team | null;
	UserList: User[];
	loading: boolean;
	error: string | undefined;
	status: StatusEnum;
}

const initialState: TeamState = {
	Teams: [],
	Team: null,
	UserList: [],
	loading: false,
	error: undefined,
	status: StatusEnum.Idle,
};

const postCreateTeam = createAsyncThunk(
	'Team/postCreateTeam',
	async (userId: string) => {
		const response = await api.post(formatCreateTeam(userId));
		return response.data;
	}
);

const postAddUserToTeam = createAsyncThunk(
	'Team/postAddUserToTeam',
	async () => {
		const response = await api.post(TEAMUSER);
		return response.data;
	}
);

const getAllTeamsByUserId = createAsyncThunk(
	'Team/getAllTeamsByUserId',
	async (userId: string) => {
		const response = await api.get(formatGetAllTeamsByUserId(userId));
		return response.data;
	}
);

const getAllUsersByTeamId = createAsyncThunk(
	'Team/getAllUsersByTeamId',
	async (teamId: string) => {
		const response = await api.get(formatGetAllUsersByTeamId(teamId));
		return response.data;
	}
);

const getTeamById = createAsyncThunk(
	'Team/getTeamById',
	async (teamId: string) => {
		const response = await api.get(formatGetTeamById(teamId));
		return response.data;
	}
);

const deleteTeamById = createAsyncThunk(
	'Team/deleteTeamById',
	async (teamId: string) => {
		await api.delete(formatDeleteTeamById(teamId));
		return teamId;
	}
);

const deleteUserFromTeam = createAsyncThunk(
	'Team/deleteUserFromTeam',
	async (teamId: string) => {
		await api.delete(formatDeleteUserFromTeam(teamId));
		return teamId;
	}
);

const TeamSlice = createSlice({
	name: 'Team',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// CREATE
		builder
			.addCase(postCreateTeam.pending, (state) => {
				state.loading = true;
			})
			.addCase(postCreateTeam.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.status = StatusEnum.Succeeded;
				state.Teams.push(payload);
			})
			.addCase(postCreateTeam.rejected, (state, { error }) => {
				state.loading = false;
				state.status = StatusEnum.Failed;
				state.error = error.message;
			});

		// ADD USER
		builder
			.addCase(postAddUserToTeam.pending, (state) => {
				state.loading = true;
				state.status = StatusEnum.Loading;
				state.error = undefined;
			})
			.addCase(postAddUserToTeam.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.status = StatusEnum.Succeeded;
				state.Teams.push(payload);
			})
			.addCase(postAddUserToTeam.rejected, (state, { error }) => {
				state.loading = false;
				state.status = StatusEnum.Failed;
				state.error = error.message;
			});

		// GET ALL TEAMS BY USER ID
		builder
			.addCase(getAllTeamsByUserId.pending, (state) => {
				state.loading = true;
				state.status = StatusEnum.Loading;
				state.error = undefined;
			})
			.addCase(getAllTeamsByUserId.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.status = StatusEnum.Succeeded;
				state.Teams = payload;
			})
			.addCase(getAllTeamsByUserId.rejected, (state, { error }) => {
				state.loading = false;
				state.status = StatusEnum.Failed;
				state.error = error.message;
			});

		// GET ALL USERS BY TEAM ID
		builder
			.addCase(getAllUsersByTeamId.pending, (state) => {
				state.loading = true;
				state.status = StatusEnum.Loading;
				state.error = undefined;
			})
			.addCase(getAllUsersByTeamId.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.status = StatusEnum.Succeeded;
				state.UserList = payload;
			})
			.addCase(getAllUsersByTeamId.rejected, (state, { error }) => {
				state.loading = false;
				state.status = StatusEnum.Failed;
				state.error = error.message;
			});

		// GET TEAM BY ID
		builder
			.addCase(getTeamById.pending, (state) => {
				state.loading = true;
				state.status = StatusEnum.Loading;
				state.error = undefined;
			})
			.addCase(getTeamById.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.status = StatusEnum.Succeeded;
				state.Team = payload;
			})
			.addCase(getTeamById.rejected, (state, { error }) => {
				state.loading = false;
				state.status = StatusEnum.Failed;
				state.error = error.message;
			});

		// DELETE TEAM BY ID
		builder
			.addCase(deleteTeamById.pending, (state) => {
				state.loading = true;
				state.status = StatusEnum.Loading;
				state.error = undefined;
			})
			.addCase(deleteTeamById.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.status = StatusEnum.Succeeded;
				state.Teams = state.Teams.filter((team) => team.id !== payload);
			})
			.addCase(deleteTeamById.rejected, (state, { error }) => {
				state.loading = false;
				state.status = StatusEnum.Failed;
				state.error = error.message;
			});

		// DELETE USER FROM TEAM
		builder
			.addCase(deleteUserFromTeam.pending, (state) => {
				state.loading = true;
				state.status = StatusEnum.Loading;
				state.error = undefined;
			})
			.addCase(deleteUserFromTeam.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.status = StatusEnum.Succeeded;
				state.UserList = state.UserList.filter(
					(user) => user.id !== payload
				);
			})
			.addCase(deleteUserFromTeam.rejected, (state, { error }) => {
				state.loading = false;
				state.status = StatusEnum.Failed;
				state.error = error.message;
			});
	},
});

export {
	postCreateTeam,
	postAddUserToTeam,
	getAllTeamsByUserId,
	getAllUsersByTeamId,
	getTeamById,
	deleteTeamById,
	deleteUserFromTeam,
};

export default TeamSlice.reducer;
