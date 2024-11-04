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

Cypress.Commands.add('login', (): void => {
	cy.visit('localhost:3000/login');
	// Token valide 10 ans
	localStorage.clear();
	localStorage.setItem(
		'token',
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNkMzQ1ZWEyLTJhNWYtNDJmMi1hNTg4LTU2MGZmNGVhYmE4ZSIsInJvbGVzIjpbIlVTRVIiXSwiaWF0IjoxNzE3NTk3MDkyLCJleHAiOjI0NzQ5Nzk0OTJ9.So-Ldq8l1g_hSG6Nz7SdoAhbvdM4WNCkqHGy-wl3IjY'
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
