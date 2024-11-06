import React from 'react';
import PermanentDrawerLeft from './index';
/* eslint-disable react/no-children-prop */
describe('<PermanentDrawerLeft />', () => {
	it('renders', () => {
		// see: https://on.cypress.io/mounting-react
		cy.mount(<PermanentDrawerLeft />);
	});
});
