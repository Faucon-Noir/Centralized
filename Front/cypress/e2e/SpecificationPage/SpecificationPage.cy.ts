import { mockGetProjectByUserIdHttpCall, mockGetRexByProjectIdHttpCall, mockGetSpecificationByProjectHttpCall, mockGetSpecificationByUserHttpCall, mockGetTeamUserByUserIdHttpCall, mockGetTicketByProjectIdHttpCall, mockGetUserByIdHttpCall, mockPatchUpdateSpecificationHttpCall } from '../../support/helper'
import { ButtonSubmitSpecificationCy, EditorCy, TextareaSpecificationCy } from '../../../src/pages/specification/const';

// Collection de tests
// TODO On a un problème connu avec l'editeur
describe('SpecificationPage', () => {
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
		mockGetUserByIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
	 	mockGetSpecificationByProjectHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		cy.visit('http://localhost:3000/specification/24411468-8707-4773-9af0-0e483cbaa459')
	})
	// Test pour vérifier que la page d'édition de cahier des charges s'affiche correctement
	it('should display all page elements except debug', () => {
		;[
			ButtonSubmitSpecificationCy,
			TextareaSpecificationCy
		].forEach((element) => {
			if (element === TextareaSpecificationCy) {
				cy.centralizedGet(element).should('not.exist')
			} else {
				cy.centralizedGet(element).should('exist').should('be.visible')
			}
		})
		;[
			'.rdw-storybook-toolbar',
			'.rdw-storybook-wrapper',
			'.rdw-storybook-editor'
		].forEach((element) => {
			cy.get(element).should('exist').should('be.visible')
		})
		cy.get('.rdw-storybook-editor').should('have.value', '<h1>&nbsp;Cahier des charges: Template generator</h1>');
	})

	// TODO Test compliqué car bloqué et pas de input prévu
	it('should update specification', () => {
		mockPatchUpdateSpecificationHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')

	})
})
