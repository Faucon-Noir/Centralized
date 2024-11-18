import { mockGetCountTicketByUserdHttpCall, mockGetProjectByUserIdHttpCall, mockGetRexByProjectIdHttpCall, mockGetSpecificationByUserHttpCall, mockGetTeamUserByUserIdHttpCall, mockGetTicketByProjectIdHttpCall, mockGetTicketByUserAndProjectdHttpCall, mockGetUserByIdHttpCall, mockPatchUpdateUserHttpCall } from '../../support/helper'
import {
	AvartarImageCy,
	AvatarFieldCy,
	BioFielCy,
	BioLabelCy,
	CameraButtonCy,
	CloseModalButtonCy,
	EmailFielCy,
	EmailLabelCy,
	FirstNameFielCy,
	FirstNameLabelCy,
	LastNameFielCy,
	LastNameLabelCy,
	ModalAvatarCy,
	PhoneFielCy,
	PhoneLabelCy,
	SaveButtonCy,
} from '../../../src/app/const/account/const'

// Collection de tests
describe('AccountPage', () => {
	beforeEach(() => {
		cy.loginJdc()
		mockGetUserByIdHttpCall('e8a547a6-1da6-4824-af30-4b1f26acbc5c')
		mockGetProjectByUserIdHttpCall('e8a547a6-1da6-4824-af30-4b1f26acbc5c')
		mockGetSpecificationByUserHttpCall('e8a547a6-1da6-4824-af30-4b1f26acbc5c')
		mockGetTeamUserByUserIdHttpCall('e8a547a6-1da6-4824-af30-4b1f26acbc5c')
		mockGetCountTicketByUserdHttpCall('e8a547a6-1da6-4824-af30-4b1f26acbc5c')
		mockGetRexByProjectIdHttpCall('0dfd13bc-e1a4-4be2-876b-2223de262b26')
		mockGetRexByProjectIdHttpCall('3c213199-257b-444b-aad9-4ff88357a9f3')
		mockGetRexByProjectIdHttpCall('4c020328-1060-4ba6-8d75-ba1cf51326d3')
		mockGetRexByProjectIdHttpCall('07bed089-b764-4c26-a3dc-00bf7aa42f10')
		mockGetRexByProjectIdHttpCall('8b0cbbcc-b5a1-4f34-921e-9b0a098fbc61')
		mockGetRexByProjectIdHttpCall('8f282a0c-c7a4-4eda-96b4-71ddc8b002c2')
		mockGetRexByProjectIdHttpCall('44d8fa72-d0bc-4a6f-9ee4-c5869c94b7e2')
		mockGetRexByProjectIdHttpCall('9837714d-03f6-4ba7-b750-8f973e8f301a')
		mockGetRexByProjectIdHttpCall('32825337-0288-4cd6-b7a5-1ac7f4ebf389')
		mockGetRexByProjectIdHttpCall('b01be757-e3f2-4c10-8b33-1b516cc4964a')
		mockGetRexByProjectIdHttpCall('c7dd4544-c901-4e90-8475-992c8e631194')
		mockGetRexByProjectIdHttpCall('efa1c9a7-4ee2-48d3-8e45-051a52956e58')
		mockGetTicketByProjectIdHttpCall('0dfd13bc-e1a4-4be2-876b-2223de262b26')
		mockGetTicketByProjectIdHttpCall('3c213199-257b-444b-aad9-4ff88357a9f3')
		mockGetTicketByProjectIdHttpCall('4c020328-1060-4ba6-8d75-ba1cf51326d3')
		mockGetTicketByProjectIdHttpCall('07bed089-b764-4c26-a3dc-00bf7aa42f10')
		mockGetTicketByProjectIdHttpCall('8b0cbbcc-b5a1-4f34-921e-9b0a098fbc61')
		mockGetTicketByProjectIdHttpCall('8f282a0c-c7a4-4eda-96b4-71ddc8b002c2')
		mockGetTicketByProjectIdHttpCall('44d8fa72-d0bc-4a6f-9ee4-c5869c94b7e2')
		mockGetTicketByProjectIdHttpCall('9837714d-03f6-4ba7-b750-8f973e8f301a')
		mockGetTicketByProjectIdHttpCall('32825337-0288-4cd6-b7a5-1ac7f4ebf389')
		mockGetTicketByProjectIdHttpCall('b01be757-e3f2-4c10-8b33-1b516cc4964a')
		mockGetTicketByProjectIdHttpCall('c7dd4544-c901-4e90-8475-992c8e631194')
		mockGetTicketByProjectIdHttpCall('efa1c9a7-4ee2-48d3-8e45-051a52956e58')
		mockGetTicketByUserAndProjectdHttpCall('e8a547a6-1da6-4824-af30-4b1f26acbc5c', 'efa1c9a7-4ee2-48d3-8e45-051a52956e58')
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
			CameraButtonCy
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

		;[
			AvatarFieldCy,
			CloseModalButtonCy,
			ModalAvatarCy
		].forEach((element) => {
			cy.centralizedGet(element).should('not.exist')
		})
	})

	it('should display pop-up', () => {
		cy.centralizedGet(CameraButtonCy)
			.should('exist')
			.should('not.be.disabled')
			.click()
		;[
			AvatarFieldCy,
			CloseModalButtonCy,
			ModalAvatarCy
		].forEach((element) => {
			cy.centralizedGet(element).should('exist').should('be.visible')
		})

		cy.centralizedGet(CloseModalButtonCy)
			.should('exist')
			.should('not.be.disabled')
			.click()

		;[
			AvatarFieldCy,
			CloseModalButtonCy,
			ModalAvatarCy
		].forEach((element) => {
			cy.centralizedGet(element).should('not.exist')
		})
	})

	//TODO tester l'importation d'image
	it('should display user information', () => {
		mockGetUserByIdHttpCall('e8a547a6-1da6-4824-af30-4b1f26acbc5c')
		const fieldValues = [
			{ field: FirstNameFielCy, value: 'Da Cruz' },
			{ field: LastNameFielCy, value: 'Jérémy' },
			{ field: EmailFielCy, value: 'lowog32348@edectus.com' },
			{ field: PhoneFielCy, value: '33781981249' },
			{ field: BioFielCy, value: 'Jérémy Da Cruz, 22 ans' },
		  ];
		  
		  fieldValues.forEach(({ field, value }) => {
			// On récupère le field a tester, on trouve la saisie et on vérifie que la valeur est bien celle attendue
			// Si on test un champ de saisie et qu'une erreur apparait, c'est une méthode de résolution
			cy.centralizedGet(field).should('have.value', value);
		  });
	})
	
	it('should can change user information', () => {
		mockGetUserByIdHttpCall('e8a547a6-1da6-4824-af30-4b1f26acbc5c');
		cy.wait(4000);
		const fieldValues = [
			{ field: FirstNameFielCy, value: 'C JDC' },
			{ field: LastNameFielCy, value: 'D 2048' },
			{ field: EmailFielCy, value: 'lowog32318@edectus.com' },
			{ field: PhoneFielCy, value: '+33 2 01 21 94 14' },
			{ field: BioFielCy, value: 'Je suis un petit belge' },
		];
		  
		fieldValues.forEach(({ field, value }) => {
			// On récupère le field a tester, on trouve la saisie, on la clear et on écrit du texte avant de la vérifier
			cy.centralizedGet(field).clear().type(value).should('have.value', value);
		});
	})
})
