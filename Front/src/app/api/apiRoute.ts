// AUTH
export const LOGIN = '/login';
export const REGISTER = '/register';

// PLANNING
export const PLANNING = '/planning';
export const SINGLE_PLANNING_BY_ID = `${PLANNING}/:id`;
export const ALL_PLANNING_BY_USER_ID = `${PLANNING}/user/:id`;
export const ALL_PLANNING_BY_PROJECT_ID = `${PLANNING}/project/:id`;

// PROJECT
export const PROJECT = '/project';
export const SINGLE_PROJECT_BY_ID = `${PROJECT}/:id`;
export const ALL_PROJECT_BY_USER_ID = `${PROJECT}/user/:id`;

// REX
export const REX = '/rex';
export const SINGLE_REX_BY_ID = `${REX}/:id`;
export const ALL_REX_BY_PROJECT_ID = `${REX}/project/:id`;

// SPECIFICATION
export const SPECIFICATION = '/cdc';
export const SINGLE_SPECIFICATION_BY_ID = `${SPECIFICATION}/:id`;
export const ALL_SPECIFICATION_BY_USER_ID = `${SPECIFICATION}/user/:id`;
export const ALL_SPECIFICATION_BY_PROJECT_ID = `${SPECIFICATION}${SINGLE_PROJECT_BY_ID}`;

// --- A traiter ---
// TEAM
export const TEAM = '/team';
export const SINGLE_TEAM = `/${TEAM}/:id`;
export const TEAM_USER = '/teamuser';
export const SINGLE_TEAM_USER_BY_ID = `${TEAM_USER}/:id`;
export const TEAM_BY_USER_ID = `/${TEAM}/user/:id`;
// ---  ---

// TICKET
export const TICKET = '/ticket';
export const SINGLE_TICKET_BY_ID = `${TICKET}/:id`;
export const TICKET_BY_PLANNING_ID = `${TICKET}/planning/:id`;
export const TICKET_BY_PROJECT_ID = `${TICKET}/project/:id`;
export const TICKET_BY_USER_ID = `${TICKET}/user/:id`;

// USER
export const USER = '/user';
export const SINGLE_USER_BY_ID = `/${USER}/:id`;
export const SINGLE_USER_BY_MAIL = `${USER}/mail/:mail`;
export const REQUEST_RESET_PASSWORD = '/requestResetPassword';
export const RESET_PASSWORD = '/resetPassword';
