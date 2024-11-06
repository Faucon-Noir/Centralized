import React from 'react';
import RegistrationForm from './index';
/* eslint-disable react/no-children-prop */
describe('<RegistrationForm />', () => {
	it('renders', () => {
		// see: https://on.cypress.io/mounting-react
		cy.mount(<RegistrationForm />);
	});
});
