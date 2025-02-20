import {
	PLANNING_BY_PROJECT,
	PLANNING_BY_USER,
	PROJECT_BY_USER,
	REX_BY_PROJECT,
	SPECIFICATION_BY_PROJECT,
	SPECIFICATION_BY_USER,
	PLANNING_BY_ID,
	PROJECT_BY_ID,
	REX_BY_ID,
	SPECIFICATION_BY_ID,
	TEAMUSER_BY_ID as TEAMUSER_BY_ID,
	TICKET_BY_ID,
	USER_BY_ID,
	USER_BY_MAIL,
	TICKETS_BY_PLANNING,
	TICKETS_BY_PROJECT,
	TICKETS_BY_USER,
	TEAM_BY_ID,
	CREATE_TEAM_WITH_USER_ID,
	TEAMUSER_BY_USER_ID,
} from './apiRoute';

// Ici on gère toutes les urls de l'api. On remplace les :id par les valeurs correspondantes

// PLANNING
export const formatPlanningByIdRouteParam = (planningId: string): string =>
	PLANNING_BY_ID.replace(':id', planningId);

export const formatPlanningsByUserIdRouteParam = (userId: string): string =>
	PLANNING_BY_USER.replace(':id', userId);

export const formatPlanningByProjectIdRouteParam = (
	projectId: string
): string => PLANNING_BY_PROJECT.replace(':id', projectId);

// PROJECT
export const formatProjectByIdRouteParam = (projectId: string): string =>
	PROJECT_BY_ID.replace(':id', projectId);

export const formatProjectByUserIdRouteParam = (userId: string): string =>
	PROJECT_BY_USER.replace(':id', userId);

// REX
export const formatRexByIdRouteParam = (rexId: string): string =>
	REX_BY_ID.replace(':id', rexId);

export const formatRexByProjectIdRouteParam = (userId: string): string =>
	REX_BY_PROJECT.replace(':id', userId);

// SPECIFICATION
export const formatSpecificationByIdRouteParam = (
	specificationId: string
): string => SPECIFICATION_BY_ID.replace(':id', specificationId);

export const formatSpecificationsByUserIdRouteParam = (
	userId: string
): string => SPECIFICATION_BY_USER.replace(':id', userId);

export const formatSpecificationsByProjectIdRouteParam = (
	projectId: string
): string => SPECIFICATION_BY_PROJECT.replace(':id', projectId);

// TEAM
export const formatCreateTeam = (userId: string): string =>
	CREATE_TEAM_WITH_USER_ID.replace(':id', userId);

export const formatGetAllTeamsByUserId = (userId: string): string =>
	TEAMUSER_BY_USER_ID.replace(':id', userId);

export const formatGetAllUsersByTeamId = (teamId: string): string =>
	TEAMUSER_BY_ID.replace(':id', teamId);

export const formatGetTeamById = (teamId: string): string =>
	TEAM_BY_ID.replace(':id', teamId);

export const formatDeleteTeamById = (teamId: string): string =>
	TEAM_BY_ID.replace(':id', teamId);

export const formatDeleteUserFromTeam = (userId: string): string =>
	TEAMUSER_BY_ID.replace(':id', userId);

export const formatUpdateTeamById = (teamId: string): string =>
	TEAM_BY_ID.replace(':id', teamId);

// TICKET
export const formatTicketByIdRouteParam = (ticketId: string): string =>
	TICKET_BY_ID.replace(':id', ticketId);

export const formatTicketsByPlanningIdRouteParam = (
	planningId: string
): string => TICKETS_BY_PLANNING.replace(':id', planningId);

export const formatTicketsByProjectIdRouteParam = (projectId: string): string =>
	TICKETS_BY_PROJECT.replace(':id', projectId);

export const formatTicketsByUserIdRouteParam = (userId: string): string =>
	TICKETS_BY_USER.replace(':id', userId);

// USER
export const formatUserByIdRouteParam = (userId: string): string =>
	USER_BY_ID.replace(':id', userId);

export const formatUserByMailRouteParam = (mail: string): string =>
	USER_BY_MAIL.replace(':mail', mail);
