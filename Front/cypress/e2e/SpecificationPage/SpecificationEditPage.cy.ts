import { mockGetProjectByUserIdHttpCall, mockGetRexByProjectIdHttpCall, mockGetSpecificationByProjectHttpCall, mockGetSpecificationByUserHttpCall, mockGetTeamUserByUserIdHttpCall, mockGetTicketByProjectIdHttpCall, mockGetUserByIdHttpCall, mockPatchUpdateSpecificationHttpCall } from '../../support/helper'
import { ButtonSubmitSpecificationCy, EditorCy, PopUpSpecificationCy, TextareaSpecificationCy, TitleSpecificationCy } from '../../../src/pages/specification/const';

// Collection de tests
// TODO On a un problème connu avec l'editeur
describe('SpecificationEditPage', () => {
	beforeEach(() => {
		cy.login()
		cy.selectProject('24411468-8707-4773-9af0-0e483cbaa459')
		mockGetUserByIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		mockGetProjectByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		mockGetSpecificationByUserHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		mockGetTeamUserByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		mockGetRexByProjectIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		mockGetRexByProjectIdHttpCall('c896afae-0532-4ee5-8385-110ccecf72d0')
		mockGetTicketByProjectIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		mockGetTicketByProjectIdHttpCall('c896afae-0532-4ee5-8385-110ccecf72d0')
		mockGetSpecificationByProjectHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		mockGetSpecificationByProjectHttpCall('c896afae-0532-4ee5-8385-110ccecf72d0')
		mockGetUserByIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
	 	mockGetSpecificationByProjectHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		cy.visit('http://localhost:3000/specification/24411468-8707-4773-9af0-0e483cbaa459')
	})
	// Test pour vérifier que la page d'édition de cahier des charges s'affiche correctement
	it('should display all page elements except debug', () => {
		;[
			ButtonSubmitSpecificationCy,
			TitleSpecificationCy
		].forEach((element) => {
			cy.centralizedGet(element).should('exist').should('be.visible')
		})
		;[
			TextareaSpecificationCy,
			PopUpSpecificationCy
		].forEach((element) => {
			cy.centralizedGet(element).should('not.exist')
		})
		
		;[
			'.rdw-storybook-toolbar',
			'.rdw-storybook-wrapper',
			'.rdw-storybook-editor'
		].forEach((element) => {
			cy.get(element).should('exist').should('be.visible')
		})
		// TODO Bloqué car donnée mal ciblé, en attente de correction
		// cy.get('.rdw-storybook-editor').should('contain', 'Cahier des charges: Taverne des citations');
	})

	// TODO Bloqué car donnée mal ciblé, en attente de correction
	it('should update specification', () => {
		// mockPatchUpdateSpecificationHttpCall('623e3bbf-5650-45f2-b06c-f673d08e4c0a')
		// cy.get('.rdw-storybook-editor').should('contain', 'Cahier des charges: Taverne des citations');
		// cy.get('.rdw-storybook-editor').find('span').first().clear().type('value').should('contain', 'value');
		// cy.centralizedGet(ButtonSubmitSpecificationCy).click();
		// cy.centralizedGet(PopUpSpecificationCy).should('exist').should('be.visible');
		// cy.centralizedGet(PopUpSpecificationCy).click();
		// cy.centralizedGet(PopUpSpecificationCy).should('not.exist');
		
		// cy.centralizedGet(ButtonSubmitSpecificationCy).click();
		// cy.centralizedGet(PopUpSpecificationCy).should('exist').should('be.visible');
		// cy.wait(10001);
		// cy.centralizedGet(PopUpSpecificationCy).should('not.exist');
	})
})
