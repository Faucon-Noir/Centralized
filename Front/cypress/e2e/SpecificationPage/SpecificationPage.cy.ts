import { mockGetSpecificationByProjectHttpCall, mockPatchUpdateSpecificationHttpCall } from '../../support/helper'
import { ButtonSubmitSpecificationCy, EditorCy, TextareaSpecificationCy } from '../../../src/pages/specification/const';

// Collection de tests
// TODO On a un problème connu avec l'editeur
describe('SpecificationPage', () => {
	// beforeEach(() => {
	// 	cy.login()
	// 	cy.selectProject('24411468-8707-4773-9af0-0e483cbaa459')
	//  	mockGetSpecificationByProjectHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
	// 	cy.visit('http://localhost:3000/specification/24411468-8707-4773-9af0-0e483cbaa459')
	// })
	// // Test pour vérifier que la page d'édition de cahier des charges s'affiche correctement
	// it('should display all page elements except debug', () => {
	// 	;[
	// 		EditorCy,
	// 		ButtonSubmitSpecificationCy,
	// 		TextareaSpecificationCy
	// 	].forEach((element) => {
	// 		if (element === TextareaSpecificationCy) {
	// 			cy.centralizedGet(element).should('exist').should('not.visible')
	// 		} else {
	// 			cy.centralizedGet(element).should('exist').should('be.visible')
	// 		}
	// 	})
	// })

	// // TODO Test compliqué car bloqué et pas de input prévu
	// it('should update specification', () => {
	// 	mockPatchUpdateSpecificationHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')

	// })
})
