// AUTH
export const LOGIN = '/login';
export const REGISTER = '/register';

// PLANNING
export const PLANNINGS = '/planning';
export const PLANNING_BY_ID = `${PLANNINGS}/:id`;
export const PLANNING_BY_USER = `${PLANNINGS}/user/:id`;
export const PLANNING_BY_PROJECT = `${PLANNINGS}/project/:id`;

// PROJECT
export const PROJECTS = '/project';
export const PROJECT_BY_ID = `${PROJECTS}/:id`;
export const PROJECT_BY_USER = `${PROJECTS}/user/:id`;

// REX
export const REXS = '/rex';
export const REX_BY_ID = `${REXS}/:id`;
export const REX_BY_PROJECT = `${REXS}/project/:id`;

// SPECIFICATION
export const SPECIFICATIONS = '/specification';
export const SPECIFICATION_BY_ID = `${SPECIFICATIONS}/:id`;
export const SPECIFICATION_BY_USER = `${SPECIFICATIONS}/user/:id`;
export const SPECIFICATION_BY_PROJECT = `${SPECIFICATIONS}${PROJECT_BY_ID}`;

// --- A traiter ---
// TEAM
export const TEAMS = '/team';
export const TEAM_BY_ID = `${TEAMS}/:id`;
export const CREATE_TEAM_WITH_USER_ID = TEAM_BY_ID;
export const TEAM_USER = '/teamuser';
export const TEAM_USER_BY_ID = `${TEAM_USER}/:id`;
export const TEAM_BY_USER = `${TEAMS}/user/:id`;
// ---  ---

// TICKET
export const TICKETS = '/ticket';
export const TICKET_BY_ID = `${TICKETS}/:id`;
export const TICKETS_BY_PLANNING = `${TICKETS}/planning/:id`;
export const TICKETS_BY_PROJECT = `${TICKETS}/project/:id`;
export const TICKETS_BY_USER = `${TICKETS}/user/:id`;

// USER
export const USER = '/user';
export const USER_BY_ID = `${USER}/:id`;
export const USER_BY_MAIL = `${USER}/mail/:mail`;
export const REQUEST_RESET_PASSWORD = '/requestResetPassword';
export const RESET_PASSWORD = '/resetPassword';
