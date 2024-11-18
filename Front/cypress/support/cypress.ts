import { mount, MountOptions, MountReturn } from 'cypress/react18';
import { MemoryRouterProps } from 'react-router-dom';

export type UserType = 'unknown' | 'user';

export type UserConfigType = {
	email: string;
	password: string;
	expireAt: number;
};

declare global {
	namespace Cypress {
		interface Chainable {
			mount: typeof mount;
			/**
			 * Mounts a React node
			 * @param component React Node to mount
			 * @param options Additional options to pass into mount
			 */
			mountWithRouter(
				component: React.ReactNode,
				options?: MountOptions & { routerProps?: MemoryRouterProps }
			): Cypress.Chainable<MountReturn>;
		}
		interface Chainable {
			// cleanType(
			// 	inputName: string,
			// 	value: string,
			// 	selector?: 'name' | 'id'
			// ): Chainable<JQuery<HTMLElement>>

			/**
			 * Custom command to select DOM element by data-cy attribute.
			 * @example cy.centralizedGet('greeting')
			 */
			centralizedGet(value: string): Chainable<JQuery<HTMLElement>>;

			/**
			 * Custom command to select DOM element by data-cy attribute and data-cy-value attribute
			 * @example cy.centralizedGetValue('greeting', 'abc')
			 */
			centralizedGetValue(
				dataCy: string,
				dataCyValue: string
			): Chainable<JQuery<HTMLElement>>;

			/**
			 * Custom command to login
			 * @example cy.loginJdc()
			 */
			loginJdc(): void;

			/**
			 * Custom command to login
			 * @example cy.loginMathieu()
			 */
			loginMathieu(): void;

			/**
			 * Custom command to login
			 * @example cy.loginAdmin()
			 */
			loginAdmin(): void;

			/**
			 * Custom command to logout
			 * @example cy.logout()
			 */
			logout(): void;

			/**
			 * Custom command to select a project
			 * @example cy.selectProject(value)
			 */
			selectProject(value: string): void;
		}
	}
}
