import React from 'react';
import SpecificationCard from './index';
/* eslint-disable react/no-children-prop */
describe('SpecificationCard', () => {
	it('renders', () => {
		// see: https://on.cypress.io/mounting-react
		cy.mount(
			<SpecificationCard
				id={12557}
				title={'test'}
				color={2}
				key={'8532865'}
			/>
		);
	});

	it('Verifier titre', () => {
		var titre = 'Je suis un test';
		// see: https://on.cypress.io/mounting-react
		cy.mount(
			<SpecificationCard
				id={12557}
				title={titre}
				color={2}
				key={'8532865'}
			/>
		);
		cy.get('p').should('contain.text', titre);
	});

	it('Verifier Couleur', () => {
		var titre = 'Je suis un test';
		// see: https://on.cypress.io/mounting-react
		cy.mount(
			<SpecificationCard
				id={12557}
				title={titre}
				color={2}
				key={'8532865'}
			/>
		);
		cy.get('span')
			.should('have.css', 'color')
			.and('eq', 'rgb(139, 199, 41)');
	});
});
