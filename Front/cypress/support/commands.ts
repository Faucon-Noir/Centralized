/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// Cypress.Commands.add(
// 	'cleanType',
// 	(
// 		inputName: string,
// 		value: string,
// 		selector = 'name'
// 	): Cypress.Chainable<JQuery<HTMLElement>> => {
// 		// Avoids a bug with quick inputs, from https://github.com/cypress-io/cypress/issues/5480#issuecomment-633660321
// 		return cy
// 			.get(`input[${selector}="${inputName}"]`)
// 			.clear()
// 			.type(value)
// 			.should('have.value', value)
// 	}
// )

Cypress.Commands.add(
	'centralizedGet',
	(name: string): Cypress.Chainable<JQuery<HTMLElement>> => {
		return cy.get(`[data-cy="${name}"]`);
	}
);

Cypress.Commands.add(
	'centralizedGetValue',
	(name: string, value: string): Cypress.Chainable<JQuery<HTMLElement>> => {
		return cy.get(`[data-cy="${name}"][data-cy-value="${value}"]`);
	}
);

Cypress.Commands.add('loginJdc', (): void => {
	cy.visit('localhost:3000/login');
	// Token valide 10 ans
	localStorage.clear();
	localStorage.setItem(
		'token',
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU4YTU0N2E2LTFkYTYtNDgyNC1hZjMwLTRiMWYyNmFjYmM1YyIsInJvbGVzIjpbIlVTRVIiXSwiaWF0IjoxNzMxOTE4NjEyLCJleHAiOjE3OTUwMzM4MTJ9.fBgyjbxyopRqsyCJ6QD5yzaXFN6dGvTb_1xoiOQChRY'
	);
	cy.visit('localhost:3000/');
	cy.viewport(1920, 1080);
});

Cypress.Commands.add('loginMathieu', (): void => {
	cy.visit('localhost:3000/login');
	// Token valide 10 ans
	localStorage.clear();
	localStorage.setItem(
		'token',
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRiNGRmNDgzLTE1YzgtNDc2MC1iMzM5LWVlN2EzOWI4ODM5OCIsInJvbGVzIjpbIlVTRVIiXSwiaWF0IjoxNzMxOTE4NzAzLCJleHAiOjE3OTUwMzM5MDN9.f7BwJqhGs7nvtn7kyHD2LTM6nms7AA1iNlFwWBuDQ0A'
	);
	cy.visit('localhost:3000/');
	cy.viewport(1920, 1080);
});

Cypress.Commands.add('loginAdmin', (): void => {
	cy.visit('localhost:3000/login');
	// Token valide 10 ans
	localStorage.clear();
	localStorage.setItem(
		'token',
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZkNzNkNjQ5LTRhZGMtNDA3Yi05YjI2LWU0NTYwMWMyNWE3MSIsInJvbGVzIjpbIlVTRVIiXSwiaWF0IjoxNzMxOTE4Nzg5LCJleHAiOjE3OTUwMzM5ODl9.4NQgWGsn7QLTN53MmdhSYehGuPGqZN_GsXJL7ImE6bA'
	);
	cy.visit('localhost:3000/');
	cy.viewport(1920, 1080);
});

Cypress.Commands.add('logout', (): void => {
	localStorage.removeItem('token');
	cy.clearLocalStorage();
	cy.visit('localhost:3000/login');
});

Cypress.Commands.add('selectProject', (id: string): void => {
	cy.visit('localhost:3000/');
	localStorage.removeItem('SelectedProject');
	localStorage.setItem('SelectedProject', id);
	cy.visit('localhost:3000/');
	cy.viewport(1920, 1080);
});
