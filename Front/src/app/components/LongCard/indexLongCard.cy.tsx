import React from 'react';
import LongCard from './index';
/* eslint-disable react/no-children-prop */
describe('<LongCard />', () => {
	it('renders', () => {
		// see: https://on.cypress.io/mounting-react
		cy.mount(<LongCard children={undefined} />);
	});
});
