import {
	ALL_PLANNING_BY_PROJECT_ID,
	ALL_PLANNING_BY_USER_ID,
	ALL_PROJECT_BY_USER_ID,
	ALL_REX_BY_PROJECT_ID,
	ALL_SPECIFICATION_BY_PROJECT_ID,
	ALL_SPECIFICATION_BY_USER_ID,
	REX,
	SINGLE_PLANNING_BY_ID,
	SINGLE_PROJECT_BY_ID,
	SINGLE_REX_BY_ID,
	SINGLE_SPECIFICATION_BY_ID,
	SINGLE_TEAM_USER_BY_ID,
	SINGLE_TICKET_BY_ID,
	SINGLE_USER_BY_ID,
	SINGLE_USER_BY_MAIL,
	TEAM_BY_USER_ID,
	TICKET_BY_PLANNING_ID,
	TICKET_BY_PROJECT_ID,
	TICKET_BY_USER_ID,
} from './apiRoute';

// PLANNING
export const replaceSinglePlanningByIdRouteParam = (
	planningId: string
): string => SINGLE_PLANNING_BY_ID.replace(':id', planningId);

export const replaceAllPlanningByUserIdRouteParam = (userId: string): string =>
	ALL_PLANNING_BY_USER_ID.replace(':id', userId);

export const replaceAllPlanningByProjectIdRouteParam = (
	projectId: string
): string => ALL_PLANNING_BY_PROJECT_ID.replace(':id', projectId);

// PROJECT
export const replaceSingleProjectByIdRouteParam = (projectId: string): string =>
	SINGLE_PROJECT_BY_ID.replace(':id', projectId);

export const replaceAllProjectByUserIdRouteParam = (userId: string): string =>
	ALL_PROJECT_BY_USER_ID.replace(':id', userId);

// REX
export const replaceSingleRexByIdRouteParam = (rexId: string): string =>
	SINGLE_REX_BY_ID.replace(':id', rexId);

export const replaceAllRexByProjectIdRouteParam = (userId: string): string =>
	ALL_REX_BY_PROJECT_ID.replace(':id', userId);

// SPECIFICATION
export const replaceSingleSpecificationByIdRouteParam = (
	specificationId: string
): string => SINGLE_SPECIFICATION_BY_ID.replace(':id', specificationId);

export const replaceAllSpecificationByUserIdRouteParam = (
	userId: string
): string => ALL_SPECIFICATION_BY_USER_ID.replace(':id', userId);

export const replaceAllSpecificationByProjectIdRouteParam = (
	projectId: string
): string => ALL_SPECIFICATION_BY_PROJECT_ID.replace(':id', projectId);

// TEAM
export const replaceSingleTeamByIdRouteParam = (teamId: string): string =>
	SINGLE_TEAM_USER_BY_ID.replace(':id', teamId);

export const replaceSingleTeamUserRouteParam = (teamUserId: string): string =>
	SINGLE_TEAM_USER_BY_ID.replace(':id', teamUserId);

export const replaceUserTeamRouteParam = (teamId: string): string =>
	TEAM_BY_USER_ID.replace(':id', teamId);

// TICKET
export const replaceSingleTicketByIdRouteParam = (ticketId: string): string =>
	SINGLE_TICKET_BY_ID.replace(':id', ticketId);

export const replaceTicketByPlanningIdRouteParam = (
	planningId: string
): string => TICKET_BY_PLANNING_ID.replace(':id', planningId);

export const replaceTicketByProjectIdRouteParam = (projectId: string): string =>
	TICKET_BY_PROJECT_ID.replace(':id', projectId);

export const replaceTicketByUserIdRouteParam = (userId: string): string =>
	TICKET_BY_USER_ID.replace(':id', userId);

// USER
export const replaceSingleUserByIdRouteParam = (userId: string): string =>
	SINGLE_USER_BY_ID.replace(':id', userId);

export const replaceSingleUserByMailRouteParam = (mail: string): string =>
	SINGLE_USER_BY_MAIL.replace(':mail', mail);
