import {
	mockGetProjectByIdHttpCall,
	mockGetProjectByUserIdHttpCall,
	mockGetRexByProjectIdHttpCall,
	mockGetSpecificationByUserHttpCall,
	mockGetTeamUserByUserIdHttpCall,
	mockGetTicketByProjectIdHttpCall,
	mockGetUserByIdHttpCall } from '../../support/helper'
import {
	ButtonNewTicketCy,
	CalendarCy,
} from '../../../src/pages/planning/const'

// Collection de tests
describe('PlanningPage', () => {
	beforeEach(() => {
		cy.login()
		cy.selectProject('24411468-8707-4773-9af0-0e483cbaa459')
		cy.visit('http://localhost:3000/planning')
		mockGetUserByIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		mockGetProjectByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		mockGetSpecificationByUserHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		mockGetTeamUserByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		mockGetRexByProjectIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		mockGetRexByProjectIdHttpCall('c896afae-0532-4ee5-8385-110ccecf72d0')
		mockGetTicketByProjectIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		mockGetTicketByProjectIdHttpCall('c896afae-0532-4ee5-8385-110ccecf72d0')
	})
	afterEach(() => {
		cy.logout()
	})
	// Test pour vérifier que la page de l'utilisateur s'affiche correctement
	it('should display all page elements', () => {
		;[
			ButtonNewTicketCy,
			CalendarCy
		].forEach((element) => {
			cy.centralizedGet(element).should('exist').should('be.visible')
		})
		cy.visit('http://localhost:3000/planning')
	})

	// TODO verifier que c'est une fonctionnalité bien enlevé
	// it('should display 2 projects', () => {
	// 	cy.centralizedGet(ProjectCardPlanningCy).should('have.length', 2)
	// 	cy.centralizedGet(ProjectCardPlanningTicketCy).first().should('contain', "3 tickets");
	// 	cy.centralizedGet(ProjectCardPlanningTicketCy).last().should('contain', "2 tickets");
	// 	cy.centralizedGet(ProjectCardPlanningCy).first().click().location('pathname')
	// 	.should('eq', '/planning')
	// 	cy.visit('http://localhost:3000/planning')
	// })

	it('should can redirect to create ticket', () => {
		cy.centralizedGet(ButtonNewTicketCy).should('exist').should('be.visible').click()
		cy.location('pathname').should('eq', '/ticket/create')
		cy.visit('http://localhost:3000/planning')
	})

	// TODO verifier que c'est une fonctionnalité bien enlevé
	// it('should change project', () => {
	// 	;[
	// 		{name: 'Taverne des citations', other_id: 'c896afae-0532-4ee5-8385-110ccecf72d0', other_name: 'GPE', index: 0},
	// 		{name: 'GPE', other_id: '24411468-8707-4773-9af0-0e483cbaa459', other_name: 'Taverne des citations', index: 1}
	// 	].forEach((element) => {
	// 		cy.selectProject(element.other_id)
	// 		cy.visit('http://localhost:3000/planning')
	// 		cy.centralizedGet(ProjectNameCy).should('exist').should('be.visible').should('contain', element.other_name);
	// 		cy.centralizedGet(ProjectCardPlanningCy).eq(element.index).click();
	// 		cy.location('pathname').should('eq', '/planning');
	// 		cy.centralizedGet(ProjectNameCy).should('exist').should('be.visible').should('contain', element.name);
	// 	})
	// 	cy.visit('http://localhost:3000/planning')
	// })

	// it('Should display ticket', () => {
	// 	//TODO afficher les tickets sur le planning
	// })
})
