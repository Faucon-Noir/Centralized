import { mockGetProjectByUserIdHttpCall, mockGetRexByProjectIdHttpCall, mockGetSpecificationByUserHttpCall, mockGetTeamUserByUserIdHttpCall, mockGetTicketByProjectIdHttpCall, mockGetUserByIdHttpCall, mockPatchUpdateUserHttpCall } from '../../support/helper'
import {
	AvartarImageCy,
	BioFielCy,
	BioLabelCy,
	EmailFielCy,
	EmailLabelCy,
	FirstNameFielCy,
	FirstNameLabelCy,
	LastNameFielCy,
	LastNameLabelCy,
	PhoneFielCy,
	PhoneLabelCy,
	SaveButtonCy,
} from '../../../src/pages/account/const'

// Collection de tests
describe('AccountPage', () => {
	beforeEach(() => {
		cy.login()
		mockGetUserByIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		mockGetProjectByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		mockGetSpecificationByUserHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		mockGetTeamUserByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		mockGetRexByProjectIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		mockGetRexByProjectIdHttpCall('c896afae-0532-4ee5-8385-110ccecf72d0')
		mockGetTicketByProjectIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		mockGetTicketByProjectIdHttpCall('c896afae-0532-4ee5-8385-110ccecf72d0')
		cy.visit('http://localhost:3000/account')
	})

	// Test pour vérifier que la page de l'utilisateur s'affiche correctement
	it('should display all page elements', () => {
		;[
			AvartarImageCy,
			FirstNameLabelCy,
			LastNameLabelCy,
			EmailLabelCy,
			PhoneLabelCy,
			BioLabelCy,
			FirstNameFielCy,
			LastNameFielCy,
			EmailFielCy,
			PhoneFielCy,
			BioFielCy,
			SaveButtonCy,
		].forEach((element) => {
			cy.centralizedGet(element).should('exist').should('be.visible')
			if (element === SaveButtonCy) {
				cy.centralizedGet(element)
					.should('exist')
					.should('not.be.disabled')
					.click()
					.location('pathname')
					.should('eq', '/account')
			}
		})
	})

	it('should display user information', () => {
		mockGetUserByIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		const fieldValues = [
			{ field: FirstNameFielCy, value: 'B JDC' },
			{ field: LastNameFielCy, value: 'M 2048' },
			{ field: EmailFielCy, value: 'beuret_m@etna-alternance.net' },
			{ field: PhoneFielCy, value: '+33 7 01 21 94 14' },
			{ field: BioFielCy, value: 'Je suis un petit suisse' },
		  ];
		  
		  fieldValues.forEach(({ field, value }) => {
			// On récupère le field a tester, on trouve la saisie et on vérifie que la valeur est bien celle attendue
			// Si on test un champ de saisie et qu'une erreur apparait, c'est une méthode de résolution
			if(field != BioFielCy)
				cy.centralizedGet(field).find('input').should('have.value', value);
			else
				cy.centralizedGet(field).find('input, textarea').should('have.value', value);
		  });
	})
	
	it('should can change user information', () => {
		mockGetUserByIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e');
		cy.wait(4000);
		const fieldValues = [
			{ field: FirstNameFielCy, value: 'C JDC' },
			{ field: LastNameFielCy, value: 'D 2048' },
			{ field: EmailFielCy, value: 'beuret_s@etna-alternance.net' },
			{ field: PhoneFielCy, value: '+33 2 01 21 94 14' },
			{ field: BioFielCy, value: 'Je suis un petit belge' },
		];
		  
		fieldValues.forEach(({ field, value }) => {
			// On récupère le field a tester, on trouve la saisie, on la clear et on écrit du texte avant de la vérifier
			if(field != BioFielCy)
				cy.centralizedGet(field).find('input').clear().type(value).should('have.value', value);
			else
				cy.centralizedGet(field).find('textarea').first().clear().type(value).should('have.value', value);
		});
	})
})
