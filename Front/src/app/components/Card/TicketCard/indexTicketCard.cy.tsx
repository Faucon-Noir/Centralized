import React from 'react';
import TicketCard from './index';
import { parse } from 'date-fns';
import { fr } from 'date-fns/locale';
/* eslint-disable react/no-children-prop */
describe('<TicketCard />', () => {
	it('renders', () => {
		// see: https://on.cypress.io/mounting-react
		cy.mount(
			<TicketCard
				id={'grvvef'}
				title={'test'}
				start={'12/12/2024'}
				end={'12/12/2024'}
				urgence={1}
				updated_at='12/12/2024'
			/>
		);
	});

	it('Vérifier titre', () => {
		var titre = 'test';
		// see: https://on.cypress.io/mounting-react
		cy.mount(
			<TicketCard
				id={'grvvef'}
				title={titre}
				start={'12/12/2024'}
				end={'12/12/2024'}
				urgence={1}
				updated_at='12/12/2024'
			/>
		);
		cy.get('h3').should('contain.text', titre);
	});

	it('Vérifier Date', () => {
		var start = '12/01/2024';
		var end = '12/12/2024';
		// see: https://on.cypress.io/mounting-react
		cy.mount(
			<TicketCard
				id={'grvvef'}
				title={'test'}
				start={start}
				end={end}
				urgence={1}
				updated_at='12/12/2024'
			/>
		);
		cy.get('#date').should('contain.text', start + ' - ' + end);
	});

	it('Vérifier Urgence', () => {
		// see: https://on.cypress.io/mounting-react
		cy.mount(
			<TicketCard
				id={'grvvef'}
				title={'test'}
				start={'12/12/2024'}
				end={'12/12/2024'}
				urgence={1}
				updated_at='12/12/2024'
			/>
		);
		cy.get('#urgence').should('contain.text', 'Urgence : Faible');
	});

	it('Vérifier dernier MAJ', () => {
		var updated_at = '12/05/2024';
		const date1 = new Date();
		const date2 = parse(updated_at, 'dd/MM/yyyy', new Date(), {
			locale: fr,
		});
		let lastUpdate = Number(date1) - Number(date2);
		const millisecondsInOneDay = 1000 * 60 * 60 * 24;
		const differenceInDays = lastUpdate / millisecondsInOneDay;
		var nb_jour = differenceInDays.toString().split('.')[0];
		// see: https://on.cypress.io/mounting-react
		cy.mount(
			<TicketCard
				id={'grvvef'}
				title={'test'}
				start={'12/12/2024'}
				end={'12/12/2024'}
				urgence={1}
				updated_at={updated_at}
			/>
		);
		cy.get('.card_date').should(
			'contain.text',
			'Dernier maj : il y a ' + nb_jour + ' jours'
		);
	});

	it('Vérifier Couleur', () => {
		// see: https://on.cypress.io/mounting-react
		cy.mount(
			<TicketCard
				id={'grvvef'}
				title={'test'}
				start={'12/12/2024'}
				end={'12/12/2024'}
				urgence={2}
				updated_at='12/12/2024'
			/>
		);
		cy.get('.card')
			.should('have.css', 'border-left')
			.and('eq', '7px solid rgb(0, 131, 225)');
	});
});
