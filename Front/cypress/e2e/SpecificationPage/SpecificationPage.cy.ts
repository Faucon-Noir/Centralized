import { mockGetProjectByUserIdHttpCall, mockGetRexByProjectIdHttpCall, mockGetSpecificationByProjectHttpCall, mockGetSpecificationByUserHttpCall, mockGetTeamUserByUserIdHttpCall, mockGetTicketByProjectIdHttpCall, mockGetUserByIdHttpCall, mockPatchUpdateSpecificationHttpCall } from '../../support/helper'
import { ButtonSubmitSpecificationCy, EditorCy, PopUpSpecificationCy, TextareaSpecificationCy, TitleSpecificationCy } from '../../../src/pages/specification/const';

// Collection de tests
// TODO On a un problème connu avec l'editeur
describe('SpecificationPage', () => {
	beforeEach(() => {
		cy.loginJdc()
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
		cy.visit('http://localhost:3000/specification/create')
	})

	//TODO faire le test
	// Test pour vérifier que la page de création de cahier des charges s'affiche correctement
	it('should display all page elements except debug', () => {
	})

	// TODO ajouter le test
	it('should create specification', () => {
	})
})
