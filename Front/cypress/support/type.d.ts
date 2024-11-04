/// <reference types="cypress" />
declare namespace Cypress {
	interface Chainable<Subject> {
		/**
		 * Custom command to select DOM element by data-cy attribute.
		 * @example cy.centralizedGet('greeting')
		 */
		centralizedGet(value: string): Chainable<any>;

		/**
		 * Custom command to select DOM element by data-cy attribute and data-cy-value attribute
		 * @example cy.centralizedGetValue('greeting', 'abc')
		 */
		centralizedGetValue(
			dataCy: string,
			dataCyValue: string
		): Chainable<any>;

		// cleanType(inputName: string, value: string): Chainable<any>
	}
}
