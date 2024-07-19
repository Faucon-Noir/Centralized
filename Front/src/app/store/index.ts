import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import planningReducer from './slices/planningSlice';
import projectReducer from './slices/projectSlice';
import rexReducer from './slices/rexSlice';
import specificationReducer from './slices/specificationSlice';
import teamReducer from './slices/teamSlice';
import ticketReducer from './slices/ticketSlice';
import userReducer from './slices/userSlice';

// Ici on configure le store redux avec l'ensemble des slices
export const store = configureStore({
	reducer: {
		auth: authReducer,
		planning: planningReducer,
		project: projectReducer,
		rex: rexReducer,
		specification: specificationReducer,
		team: teamReducer,
		ticket: ticketReducer,
		user: userReducer, // Cf le slice userSlice pour savoir comment c'est fait
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use `AppThunk` for actions that return a function
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
