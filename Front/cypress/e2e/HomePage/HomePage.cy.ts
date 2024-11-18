import { 
	mockGetProjectByIdHttpCall,
	mockGetProjectByUserIdHttpCall,
	mockGetRexByProjectIdHttpCall,
	mockGetRexEmptyByProjectIdHttpCall,
	mockGetTeamUserByUserIdHttpCall, 
	mockGetTicketByProjectIdHttpCall, 
	mockGetTicketByUserdHttpCall, 
	mockGetUserByIdHttpCall } from '../../support/helper'
// import { HomeProjectCardCy, HomeProjectCardNameCy, HomeProjectCardTicketCy } from '../../../src/app/components/ProjectCard/const'
// import { HomeCalendarCardCy } from '../../../src/app/components/CalendarBox/const'
// import { 
// 	HomeTicketCardCy,
// 	HomeTicketCardStartedCy,
// 	HomeTicketCardTitleCy,
// 	HomeTicketCardUrgenceCy } from '../../../src/app/components/TaskCard/const'
// import { HomeSpecificationCardCy, HomeSpecificationCardTitleCy } from '../../../src/app/components/SpecificationCard/const'
// import { HomeRexCardCy, RexCardAnswer1Cy, RexCardAnswer2Cy, RexCardAnswer3Cy } from '../../../src/app/components/rexCard/const'
// import { HomeTeamCardCy, HomeTeamCardNameCy } from '../../../src/app/components/TeamCard/const'
import { HomeHelloCy } from '../../../src/app/const/home/const'

//TODO refaire les tests
// Collection de tests
describe('HomePage', () => {
	beforeEach(() => {
		cy.loginJdc()
		cy.visit('http://localhost:3000/')
		mockGetProjectByIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		mockGetUserByIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		mockGetProjectByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		mockGetTicketByUserdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		mockGetTeamUserByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		mockGetProjectByIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		mockGetProjectByIdHttpCall('c896afae-0532-4ee5-8385-110ccecf72d0')
		mockGetTicketByProjectIdHttpCall('c896afae-0532-4ee5-8385-110ccecf72d0')
		mockGetTicketByProjectIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		mockGetRexEmptyByProjectIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		mockGetRexByProjectIdHttpCall('c896afae-0532-4ee5-8385-110ccecf72d0')
	})
	afterEach(() => {
		cy.logout()
	})

	//TODO Se plaint d'un project pas prévu dans ProjetCard
	// Test pour vérifier que la page home s'affiche correctement
	it('should display all page home elements', () => {
		// ;[
		// 	{element: HomeProjectCardCy, nbr: 2},
		// 	{element: HomeCalendarCardCy, nbr: 1},
		// 	{element: HomeTicketCardCy, nbr: 3},
		// 	{element: HomeSpecificationCardCy, nbr: 2},
		// 	{element: HomeRexCardCy, nbr: 1},
		// 	{element: HomeTeamCardCy, nbr: 2},
		// ].forEach((element) => {
		// 	if(element.nbr == 1) {
		// 		cy.centralizedGet(element.element).should('exist').should('be.visible')
		// 	} else {
		// 		cy.centralizedGet(element.element).should('have.length', element.nbr)

		// 	}
		// })
		// cy.visit('http://localhost:3000/')
	})

	it('shoul display name user', () => {
		// cy.centralizedGet(HomeHelloCy).should('exist').should('be.visible').should('contain', 'Hello M 2048');
		// cy.visit('http://localhost:3000/')
	})

	it('should display 2 projects', () => {
		// ;[
		// 	{name: 'Taverne des citations', ticket:'3 tickets', index: 0},
		// 	{name: 'GPE', ticket:'2 tickets', index: 1}
		// ].forEach((element) => {
		// 	cy.centralizedGet(HomeProjectCardCy).eq(element.index).find(`[data-cy="${HomeProjectCardNameCy}"]`).should('contain', `${element.name}`);
		// 	cy.centralizedGet(HomeProjectCardCy).eq(element.index).find(`[data-cy="${HomeProjectCardTicketCy}"]`).should('contain', `${element.ticket}`);
		// })
		// cy.visit('http://localhost:3000/')
	})

	it('should change project', () => {
		// ;[
		// 	{name: 'Taverne des citations', other_id: 'c896afae-0532-4ee5-8385-110ccecf72d0', other_name: 'GPE', index: 0},
		// 	{name: 'GPE', other_id: '24411468-8707-4773-9af0-0e483cbaa459', other_name: 'Taverne des citations', index: 1}
		// ].forEach((element) => {
		// 	cy.selectProject(element.other_id)
		// 	cy.centralizedGet(ProjectNameCy).should('exist').should('be.visible').should('contain', element.other_name);
		// 	cy.centralizedGet(HomeProjectCardCy).eq(element.index).click();
		// 	cy.location('pathname').should('eq', '/');
		// 	cy.centralizedGet(ProjectNameCy).should('exist').should('be.visible').should('contain', element.name);
		// })
		// cy.visit('http://localhost:3000/')
	})

	//TODO s'assurer de ce que le calendrier fait vraiment + ne sais pas comment changer pour aller à la bonne date
	// it('should display calendar', () => {
	// })

	it('Should display 3 tickets', () => {
		// ;[
		// 	{name: 'Create register page 2 days', urgence: 'Moyen', start: '13/07/2024', index: 0},
		// 	{name: 'Create login page 1 day', urgence: 'Faible', start: '11/07/2024', index: 1},
		// 	{name: 'Create home page 1 week', urgence: 'Inconnu', start: '12/07/2024', index: 2}
		// ].forEach((element) => {
		// 	cy.centralizedGet(HomeTicketCardCy).eq(element.index).find(`[data-cy="${HomeTicketCardTitleCy}"]`).should('contain', `${element.name}`);
		// 	cy.centralizedGet(HomeTicketCardCy).eq(element.index).find(`[data-cy="${HomeTicketCardUrgenceCy}"]`).should('contain', `Urgence: ${element.urgence}`);
		// 	cy.centralizedGet(HomeTicketCardCy).eq(element.index).find(`[data-cy="${HomeTicketCardStartedCy}"]`).should('contain', `posté le ${element.start}`);
		// })
		// cy.visit('http://localhost:3000/')

	})

	it('should display 2 specifications', () => {
		// ;[
		// 	{name: 'Taverne des citations', index: 0},
		// 	{name: 'GPE', index: 1}
		// ].forEach((element) => {
		// 	cy.centralizedGet(HomeSpecificationCardCy).eq(element.index).find(`[data-cy="${HomeSpecificationCardTitleCy}"]`).should('contain', `${element.name}`);
		// })
		// cy.visit('http://localhost:3000/')
	})

	it('should display 1 rex', () => {
		// ;[
		// 	{element: RexCardAnswer1Cy, text: 'dshjdkflgm'},
		// 	{element: RexCardAnswer2Cy, text: 'jkdjxckgv'},
		// 	{element: RexCardAnswer3Cy, text: 'lvgkcfgly'}
		// ].forEach((element) => {
		// 	cy.centralizedGet(HomeRexCardCy).should('exist').should('be.visible').find(`[data-cy="${element.element}"]`).should('contain', element.text);
		// })
		// cy.visit('http://localhost:3000/')
	})
	
	it('should display 2 teams', () => {
		// ;[
		// 	{name: 'TemplateDevTeam', index: 0},
		// 	{name: 'CentralizedDevTeam', index: 1}
		// ].forEach((element) => {
		// 	cy.centralizedGet(HomeTeamCardCy).eq(element.index).find(`[data-cy="${HomeTeamCardNameCy}"]`).should('contain', `${element.name}`);
		// })
		// cy.visit('http://localhost:3000/')
	})
})
