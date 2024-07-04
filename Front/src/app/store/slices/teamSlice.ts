import { Team } from '@/app/models/team';
import { createSlice } from '@reduxjs/toolkit';
import { StatusEnum } from '../enum';

// Initial state
interface TeamState {
	Teams: Team[];
	Team: Team | null;
	loading: boolean;
	error: string | undefined;
	status: StatusEnum;
}

const initialState: TeamState = {
	Teams: [],
	Team: null,
	loading: false,
	error: undefined,
	status: StatusEnum.Idle,
};

const TeamSlice = createSlice({
	name: 'Team',
	initialState,
	reducers: {},
	extraReducers: (builder) => {},
});

export default TeamSlice.reducer;
