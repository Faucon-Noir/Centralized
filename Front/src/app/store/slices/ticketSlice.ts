import { Ticket } from '@/app/models/ticket';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StatusEnum } from '../enum';
import api from '@/app/api';
import { TICKET } from '@/app/api/apiRoute';
import {
	replaceSingleTicketByIdRouteParam,
	replaceTicketByPlanningIdRouteParam,
	replaceTicketByProjectIdRouteParam,
	replaceTicketByUserIdRouteParam,
} from '@/app/api/apiRouteHelper';

// Initial state
interface TicketState {
	Tickets: Ticket[];
	Ticket: Ticket | null;
	loading: boolean;
	error: string | undefined;
	status: StatusEnum;
}

const initialState: TicketState = {
	Tickets: [],
	Ticket: null,
	loading: false,
	error: undefined,
	status: StatusEnum.Idle,
};

const createTicket = createAsyncThunk(
	'ticket/createTicket',
	async (ticket: Ticket) => {
		const response = await api.post(TICKET, ticket);
		return ticket;
	}
);

const getTicketById = createAsyncThunk(
	'ticket/getTicketById',
	async (id: string) => {
		const response = await api.get(replaceSingleTicketByIdRouteParam(id));
		return response.data;
	}
);

const getAllTicketByPlanningId = createAsyncThunk(
	'ticket/getAllTicketByPlanningId',
	async (id: string) => {
		const response = await api.get(replaceTicketByPlanningIdRouteParam(id));
		return response.data;
	}
);

const getAllTicketByProjectId = createAsyncThunk(
	'ticket/getAllTicketByProjectId',
	async (id: string) => {
		const response = await api.get(replaceTicketByProjectIdRouteParam(id));
		return response.data;
	}
);

const getAllTicketByUserId = createAsyncThunk(
	'ticket/getAllTicketByUserId',
	async (id: string) => {
		const response = await api.get(replaceTicketByUserIdRouteParam(id));
		return response.data;
	}
);

const updateTicketById = createAsyncThunk(
	'ticket/updateTicketById',
	async (ticket: Ticket) => {
		const response = await api.patch(
			replaceSingleTicketByIdRouteParam(ticket.id),
			ticket
		);
		return response.data;
	}
);

const deleteTicketById = createAsyncThunk(
	'ticket/deleteTicketById',
	async (id: string) => {
		const response = await api.delete(
			replaceSingleTicketByIdRouteParam(id)
		);
		return response.data;
	}
);

const TicketSlice = createSlice({
	name: 'Ticket',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// CREATE
		builder
			.addCase(createTicket.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Loading;
			})
			.addCase(createTicket.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.error = undefined;
				state.status = StatusEnum.Succeeded;
				state.Tickets.push(payload);
			})
			.addCase(createTicket.rejected, (state, { error }) => {
				state.loading = false;
				state.error = error.message;
				state.status = StatusEnum.Failed;
			});

		// GET BY ID
		builder
			.addCase(getTicketById.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Loading;
			})
			.addCase(getTicketById.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.error = undefined;
				state.status = StatusEnum.Succeeded;
				state.Ticket = payload;
			})
			.addCase(getTicketById.rejected, (state, { error }) => {
				state.loading = false;
				state.error = error.message;
				state.status = StatusEnum.Failed;
			});
		// GET BY PLANNING ID
		builder
			.addCase(getAllTicketByPlanningId.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Loading;
			})
			.addCase(
				getAllTicketByPlanningId.fulfilled,
				(state, { payload }) => {
					state.loading = false;
					state.error = undefined;
					state.status = StatusEnum.Succeeded;
					state.Tickets = payload;
				}
			)
			.addCase(getAllTicketByPlanningId.rejected, (state, { error }) => {
				state.loading = false;
				state.error = error.message;
				state.status = StatusEnum.Failed;
			});
		// GET BY PROJECT ID
		builder
			.addCase(getAllTicketByProjectId.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Loading;
			})
			.addCase(
				getAllTicketByProjectId.fulfilled,
				(state, { payload }) => {
					state.loading = false;
					state.error = undefined;
					state.status = StatusEnum.Succeeded;
					state.Tickets = payload;
				}
			)
			.addCase(getAllTicketByProjectId.rejected, (state, { error }) => {
				state.loading = false;
				state.error = error.message;
				state.status = StatusEnum.Failed;
			});
		// GET BY USER ID
		builder
			.addCase(getAllTicketByUserId.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Loading;
			})
			.addCase(getAllTicketByUserId.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.error = undefined;
				state.status = StatusEnum.Succeeded;
				state.Tickets = payload;
			})
			.addCase(getAllTicketByUserId.rejected, (state, { error }) => {
				state.loading = false;
				state.error = error.message;
				state.status = StatusEnum.Failed;
			});
		// UPDATE
		builder
			.addCase(updateTicketById.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Loading;
			})
			.addCase(updateTicketById.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.error = undefined;
				state.status = StatusEnum.Succeeded;
				state.Tickets = state.Tickets.map((ticket) =>
					ticket.id === payload.id ? payload : ticket
				);
				state.Ticket = payload;
			})
			.addCase(updateTicketById.rejected, (state, { error }) => {
				state.loading = false;
				state.error = error.message;
				state.status = StatusEnum.Failed;
			});
		// DELETE
		builder
			.addCase(deleteTicketById.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Loading;
			})
			.addCase(deleteTicketById.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.error = undefined;
				state.status = StatusEnum.Succeeded;
				state.Ticket = null;
			})
			.addCase(deleteTicketById.rejected, (state, { error }) => {
				state.loading = false;
				state.error = error.message;
				state.status = StatusEnum.Failed;
			});
	},
});

export default TicketSlice.reducer;
