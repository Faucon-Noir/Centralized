// /api/user/{id} Get

// {
//   "id": "string",
//   "lastname": "string",
//   "firstname": "string",
//   "mail": "string",
//   "password": "string"
// }
export const mockGetUserByIdHttpCall = (id: string) => {
	cy.intercept('GET', `http://localhost:3000/api/user/${id}`, {
		fixture: `user/${id}.json`,
	}).as('user')
}
