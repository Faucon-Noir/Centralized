import { CreateTicket, Ticket, UpdateTicket } from '@/app/models/ticket';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StatusEnum } from '../enum';
import api from '@/app/api';
import { TICKETS } from '@/app/api/apiRoute';
import {
	formatTicketByIdRouteParam,
	formatTicketsByPlanningIdRouteParam,
	formatTicketsByProjectIdRouteParam,
	formatTicketsByUserIdRouteParam,
} from '@/app/api/apiRouteHelper';

// Initial state
interface TicketState {
	AllTickets: Ticket[];
	Ticket: Ticket | UpdateTicket | null;
	CreateTicket: CreateTicket | null;
	loading: boolean;
	error: string | undefined;
	status: StatusEnum;
}

const initialState: TicketState = {
	AllTickets: [],
	Ticket: null,
	CreateTicket: null,
	loading: false,
	error: undefined,
	status: StatusEnum.Idle,
};

const createTicket = createAsyncThunk(
	'ticket/createTicket',
	async (ticket: CreateTicket) => {
		const response = await api.post(TICKETS, ticket);
		return ticket;
	}
);

const getTicketById = createAsyncThunk(
	'ticket/getTicketById',
	async (id: string): Promise<Ticket> => {
		const response = await api.get(formatTicketByIdRouteParam(id));
		return response.data;
	}
);

const getAllTicketByPlanningId = createAsyncThunk(
	'ticket/getAllTicketByPlanningId',
	async (id: string): Promise<Ticket[]> => {
		const response = await api.get(formatTicketsByPlanningIdRouteParam(id));
		return response.data;
	}
);

const getAllTicketByProjectId = createAsyncThunk(
	'ticket/getAllTicketByProjectId',
	async (id: string): Promise<Ticket[]> => {
		const response = await api.get(formatTicketsByProjectIdRouteParam(id));
		return response.data;
	}
);

const getAllTicketByUserId = createAsyncThunk(
	'ticket/getAllTicketByUserId',
	async (id: string): Promise<Ticket[]> => {
		const response = await api.get(formatTicketsByUserIdRouteParam(id));
		return response.data;
	}
);

const updateTicketById = createAsyncThunk(
	'ticket/updateTicketById',
	async (ticket: UpdateTicket) => {
		const response = await api.patch(
			formatTicketByIdRouteParam(ticket.id!),
			ticket
		);
		return response.data;
	}
);

const resolveTicketById = createAsyncThunk(
	'ticket/archiveTicketById',
	async (id: string) => {
		const response = await api.patch(formatTicketByIdRouteParam(id), {
			status: 'résolu',
		});
		return response.data;
	}
);

const deleteTicketById = createAsyncThunk(
	'ticket/deleteTicketById',
	async (id: string) => {
		const response = await api.delete(formatTicketByIdRouteParam(id));
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
				state.status = StatusEnum.Pending;
			})
			.addCase(createTicket.fulfilled, (state, action) => {
				state.loading = false;
				state.status = StatusEnum.Succeeded;
				state.Ticket = action.payload;
			})
			.addCase(createTicket.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});

		// GET BY ID
		builder
			.addCase(getTicketById.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Pending;
			})
			.addCase(getTicketById.fulfilled, (state, action) => {
				state.loading = false;
				state.status = StatusEnum.Succeeded;
				state.Ticket = action.payload;
			})
			.addCase(getTicketById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});
		// GET BY PLANNING ID
		builder
			.addCase(getAllTicketByPlanningId.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Pending;
			})
			.addCase(getAllTicketByPlanningId.fulfilled, (state, action) => {
				state.loading = false;
				state.AllTickets = action.payload;
				state.status = StatusEnum.Succeeded;
			})
			.addCase(getAllTicketByPlanningId.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});
		// GET BY PROJECT ID
		builder
			.addCase(getAllTicketByProjectId.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Pending;
			})
			.addCase(getAllTicketByProjectId.fulfilled, (state, action) => {
				state.loading = false;
				state.AllTickets = action.payload;
				state.status = StatusEnum.Succeeded;
			})
			.addCase(getAllTicketByProjectId.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});
		// GET BY USER ID
		builder
			.addCase(getAllTicketByUserId.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Pending;
			})
			.addCase(getAllTicketByUserId.fulfilled, (state, action) => {
				state.loading = false;
				state.AllTickets = action.payload;
				state.status = StatusEnum.Succeeded;
			})
			.addCase(getAllTicketByUserId.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});
		// UPDATE
		builder
			.addCase(updateTicketById.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Pending;
			})
			.addCase(updateTicketById.fulfilled, (state, action) => {
				state.loading = false;
				state.AllTickets = state.AllTickets.map((ticket) =>
					ticket.id === action.payload.id ? action.payload : ticket
				);
				state.Ticket = action.payload;
				state.status = StatusEnum.Succeeded;
			})
			.addCase(updateTicketById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});
		// RESOLVE
		builder
			.addCase(resolveTicketById.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Pending;
			})
			.addCase(resolveTicketById.fulfilled, (state, action) => {
				state.loading = false;
				state.Ticket = action.payload;
				state.status = StatusEnum.Succeeded;
			})
			.addCase(resolveTicketById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});
		// DELETE
		builder
			.addCase(deleteTicketById.pending, (state) => {
				state.loading = true;
				state.error = undefined;
				state.status = StatusEnum.Pending;
			})
			.addCase(deleteTicketById.fulfilled, (state, action) => {
				state.loading = false;
				state.Ticket = null;
				state.AllTickets = state.AllTickets.filter(
					(ticket) => ticket.id !== action.payload.id
				);
				state.status = StatusEnum.Succeeded;
			})
			.addCase(deleteTicketById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
				state.status = StatusEnum.Failed;
			});
	},
});

export {
	createTicket,
	getTicketById,
	getAllTicketByPlanningId,
	getAllTicketByProjectId,
	getAllTicketByUserId,
	resolveTicketById,
	updateTicketById,
	deleteTicketById,
};
export default TicketSlice.reducer;
