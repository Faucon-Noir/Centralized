import React from 'react';
import Dashboard from './Dashboard';
/* eslint-disable react/no-children-prop */
describe('<Dashboard />', () => {
	it('renders', () => {
		// see: https://on.cypress.io/mounting-react
		cy.mount(
			<Dashboard
				page={undefined}
				userData={undefined}
				updateUserData={undefined}
			/>
		);
	});
});
