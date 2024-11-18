// /api/user/{id} Get

// {
//   "id": "string",
//   "lastname": "string",
//   "firstname": "string",
//   "mail": "string",
//   "password": "string"
// }
export const mockGetUserByIdHttpCall = (id: string) => {
	cy.intercept('GET', `http://localhost:8000/api/user/${id}`, {
		fixture: `user/${id}.json`,
	}).as('getUserById')
}

export const mockPatchUpdateUserHttpCall = (id: string) => {
	cy.intercept('PATCH', `http://localhost:8000/api/user/${id}`, {
		statusCode: 200,
		body: {
			success: "User updated",
		},
	}).as('patchUpdateUser')
}

export const mockGetProjectByIdHttpCall = (id: string) => {
	cy.intercept('GET', `http://localhost:8000/api/project/${id}`, {
		fixture: `project/${id}.json`,
	}).as('getProjectById')
}

export const mockGetProjectByUserIdHttpCall = (id: string) => {
	cy.intercept('GET', `http://localhost:8000/api/project/user/${id}`, {
		fixture: `project/user/${id}.json`,
	}).as('getProjectByUserId')
}

export const mockGetTicketByProjectIdHttpCall = (id: string) => {
	cy.intercept('GET', `http://localhost:8000/api/ticket/project/${id}`, {
		fixture: `ticket/project/${id}.json`,
	}).as('getTicketByProjectId')
}

export const mockGetTicketByUserAndProjectdHttpCall = (id_user: string, id_project: string) => {
	cy.intercept('GET', `http://localhost:8000/api/ticket/user/${id_user}/project/${id_project}`, {
		fixture: `ticket/project/${id_user}/${id_project}.json`,
	}).as('getTicketByUserAndProjectId')
}

export const mockGetTicketByUserdHttpCall = (id: string) => {
	cy.intercept('GET', `http://localhost:8000/api/ticket/user/${id}`, {
		fixture: `ticket/user/${id}.json`,
	}).as('getTicketByUserId')
}

export const mockGetCountTicketByUserdHttpCall = (id: string) => {
	cy.intercept('GET', `http://localhost:8000/api/ticket/user/${id}/count`, {
		fixture: `ticket/count/user/${id}.json`,
	}).as('getTicketByUserId')
}

export const mockGetTeamUserByUserIdHttpCall = (id: string) => {
	cy.intercept('GET', `http://localhost:8000/api/teamuser/user/${id}`, {
		fixture: `teamuser/user/${id}.json`,
	}).as('getTeamuserByUserId')
}

export const mockGetRexByProjectIdHttpCall = (id: string) => {
	cy.intercept('GET', `http://localhost:8000/api/rex/project/${id}`, {
		fixture: `rex/project/${id}.json`,
	}).as('getRexByProjectId')
}

export const mockGetRexEmptyByProjectIdHttpCall = (id: string) => {
	cy.intercept('GET', `http://localhost:8000/api/rex/project/${id}`, {
		body: {
			error: "Rex not found",
		},
	}).as('getRexEmptyByProjectId')
}

export const mockGetPlanningByUserIdHttpCall = (id: string) => {
	cy.intercept('GET', `http://localhost:8000/api/planning/user/${id}`, {
		fixture: `planning/user/${id}.json`,
	}).as('getPlanningByUserId')
}

export const mockPostCreateTicketHttpCall = () => {
	cy.intercept('POST', `http://localhost:8000/api/ticket`, {
		statusCode: 200,
		body: {
			success: "Ticket created",
		},
	}).as('postCreateTicket')
}

export const mockPatchUpdateTicketHttpCall = (id: string) => {
	cy.intercept('PATCH', `http://localhost:8000/api/ticket/${id}`, {
		statusCode: 200,
		body: {
			success: "Ticket updated",
		},
	}).as('patchUpdateTicket')
}

export const mockGetSpecificationByProjectHttpCall = (id: string) => {
	cy.intercept('GET', `http://localhost:8000/api/cdc/project/${id}`, {
		fixture: `specification/project/${id}.json`,
	}).as('getCdcByProjectId')
}

export const mockGetSpecificationByUserHttpCall = (id: string) => {
	cy.intercept('GET', `http://localhost:8000/api/cdc/user/${id}`, {
		fixture: `specification/user/${id}.json`,
	}).as('getCdcByUserId')
}

export const mockPatchUpdateSpecificationHttpCall = (id: string) => {
	cy.intercept('PATCH', `http://localhost:8000/api/cdc/${id}`, {
		statusCode: 200,
		body: {
			success: "Cdc updated",
		},
	}).as('patchUpdateCdc')
}

export const mockPostCreateRextHttpCall = () => {
	cy.intercept('POST', `http://localhost:8000/api/rex`, {
		statusCode: 200,
		body: {
			success: "Rex created",
		},
	}).as('postCreateRex')
}

export const mockPostCreateRexErrortHttpCall = () => {
	cy.intercept('POST', `http://localhost:8000/api/rex`, {
		statusCode: 400,
		body: {
			error: "Rex not created",
		},
	}).as('postCreateRexError')
}