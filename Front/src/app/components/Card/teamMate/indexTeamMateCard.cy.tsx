import React from 'react';
import TeamMateCard from './index';
/* eslint-disable react/no-children-prop */
describe('<TeamMateCard />', () => {
	it('renders', () => {
		// see: https://on.cypress.io/mounting-react
		cy.mount(
			<TeamMateCard
				firstName={'Dorian'}
				lastName={'FERNANDES'}
				bio={'Je suis une bio'}
				avatar='assets/avatar_team.png'
			/>
		);
	});

	it('Verifier avatar', () => {
		var avatar = 'assets/avatar_team.png';
		// see: https://on.cypress.io/mounting-react
		cy.mount(
			<TeamMateCard
				firstName={'Dorian'}
				lastName={'FERNANDES'}
				bio={'Je suis une bio'}
				avatar={avatar}
			/>
		);
		cy.get('#avatar img').should('have.attr', 'src', avatar);
	});

	it('Verifier prénom et nom', () => {
		var prenom = 'Dorian';
		var nom = 'FERNANDES';
		// see: https://on.cypress.io/mounting-react
		cy.mount(
			<TeamMateCard
				firstName={prenom}
				lastName={nom}
				bio={'Je suis une bio'}
				avatar={'assets/avatar_team.png'}
			/>
		);
		cy.get('#name').should('contain.text', prenom + ' ' + nom);
	});

	it('Verifier bio', () => {
		var bio = 'Je suis une bio';
		// see: https://on.cypress.io/mounting-react
		cy.mount(
			<TeamMateCard
				firstName={'Dorian'}
				lastName={'FERNANDES'}
				bio={bio}
				avatar={'assets/avatar_team.png'}
			/>
		);
		cy.get('#bio').should('contain.text', bio);
	});
});
