import React from 'react';
import SpecificationForm from './index';
/* eslint-disable react/no-children-prop */
describe('<SpecificationForm />', () => {
	it('renders', () => {
		// see: https://on.cypress.io/mounting-react
		cy.mount(<SpecificationForm />);
	});
});
