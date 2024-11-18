import { ButtonNewTicketCy } from '../../../src/app/const/planning/const'
import { 
	mockGetPlanningByUserIdHttpCall,
	mockGetProjectByIdHttpCall, 
	mockGetProjectByUserIdHttpCall, 
	mockGetRexByProjectIdHttpCall,
	mockGetTeamUserByUserIdHttpCall,
	mockGetTicketByProjectIdHttpCall,
	mockGetTicketByUserdHttpCall,
	mockGetUserByIdHttpCall 
} from '../../support/helper'
// import { ButtonCreateTeamCy } from '../../../src/pages/team/const'
// import { ButtonTeamHomeShowTeamCy } from '../../../src/app/components/LongCard/TeamItem/const'
// import { ButtonCreateTicketCy } from '../../../src/pages/ticket/const'
// import { ButtonRedirectSpecificationCy } from '../../../src/app/components/LongCard/TaskItem/const'
// import { HomeButtonSpecificationCy } from '../../../src/pages/const'
// import { HomeTeamCardButtonCy } from '../../../src/app/components/TeamCard/const'

// Collection de tests
describe('GlobalPage', () => {
	beforeEach(() => {
		cy.loginJdc()
	})
	afterEach(() => {
		cy.logout()
	})

	//TODO on corrige les tests
	//Test des redirections sans et avec un projet sélectionné
	/*========  PAGE HOME   ============*/
	it('should navigate since home page with no project selected ', () => {
		// ;[
		// 	ProjectNameCy,
		// 	SpecificationButtonCy,
		// 	TicketButtonCy,
		// 	RexButtonCy
		// ].forEach((element) => {
		// 	cy.visit('localhost:3000/')
		// 	cy.centralizedGet(element).should('not.exist');
		// })
		// mockGetProjectByIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetUserByIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetProjectByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetTicketByUserdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetTeamUserByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetProjectByIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetProjectByIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetTicketByProjectIdHttpCall('c896afae-0532-4ee5-8385-110ccecf72d0')
		// mockGetTicketByProjectIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetRexByProjectIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetRexByProjectIdHttpCall('c896afae-0532-4ee5-8385-110ccecf72d0')
		//TODO ajouter le bouton logout
		//TODO fleche a droite de dernier ticket?
		//TODO fleche a droite de rex?
		//TODO comment on gere les redirections des blocs de cahier des charges?
		//TODO le "+" a droite de mon équipe?
		// ;[
		// 	{'button': HomeButtonCy, 'url': '/'},
		// 	{'button': PlanningButtonCy, 'url': '/planning'},
		// 	{'button': TeamButtonCy, 'url': '/team'},
		// 	{'button': AccountButtonCy, 'url': '/account'},
		// 	{'button': HomeButtonSpecificationCy, 'url': '/specification/create'},
			// {'button': LogoutButtonCy, 'url': '/login'}
		// ].forEach((element) => {
		// 	cy.visit('localhost:3000/')
		// 	cy.log(`${element.button} ${element.url}`)
		// 	cy.centralizedGet(element.button).should('exist').should('be.visible').click()
		// 	cy.location('pathname').should('eq', element.url)
		// 	cy.centralizedGet(ProjectNameCy).should('not.exist')
		// 	if(element.button != HomeButtonSpecificationCy) {
		// 		cy.centralizedGet(element.button).should('exist').should('be.visible').should('have.class', 'active')
		// 	}
		// })
		
		// ;[
		// 	{'button': HomeTeamCardButtonCy, 'url': '/team/8327bda4-6bc5-4f2c-9b61-c6cfcc5df290', index:0},
		// 	{'button': HomeTeamCardButtonCy, 'url': '/team/72e46816-5ff4-42ef-a000-8c95e9c6c38b', index:1},
		// ].forEach((element) => {
		// 	cy.visit('localhost:3000/')
		// 	cy.log(`${element.button} ${element.url}`)
		// 	cy.centralizedGet(element.button).eq(element.index).should('exist').should('be.visible').click()
		// 	cy.location('pathname').should('eq', element.url)
		// 	cy.centralizedGet(ProjectNameCy).should('not.exist')
		// })
		// cy.visit('localhost:3000/')
	})

	it('should navigate since home page with project selected ', () => {
		// cy.selectProject('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetProjectByIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetUserByIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetProjectByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetTicketByUserdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetTeamUserByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetTicketByProjectIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetTicketByProjectIdHttpCall('c896afae-0532-4ee5-8385-110ccecf72d0')
		// mockGetRexByProjectIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetRexByProjectIdHttpCall('c896afae-0532-4ee5-8385-110ccecf72d0')
		// //TODO ajouter le bouton logout
		// ;[
		// 	{'button': HomeButtonCy, 'url': '/'},
		// 	{'button': PlanningButtonCy, 'url': '/planning'},
		// 	{'button': TeamButtonCy, 'url': '/team'},
		// 	{'button': AccountButtonCy, 'url': '/account'},
		// 	{'button': SpecificationButtonCy, 'url': '/specification/24411468-8707-4773-9af0-0e483cbaa459'},
		// 	{'button': TicketButtonCy, 'url': '/ticket'},
		// 	{'button': RexButtonCy, 'url': '/rex/24411468-8707-4773-9af0-0e483cbaa459'},
		// 	{'button': HomeButtonSpecificationCy, 'url': '/specification/create'},
		// 	// {'button': LogoutButtonCy, 'url': '/login'}
		// ].forEach((element) => {
		// 	cy.visit('localhost:3000/')
		// 	cy.log(`${element.button} ${element.url}`)
		// 	cy.wait('@getProjectById');
		// 	cy.centralizedGet(element.button).should('exist').should('be.visible').click()
		// 	cy.location('pathname').should('eq', element.url);
		// 	cy.wait('@getProjectById');
		// 	cy.centralizedGet(ProjectNameCy).should('exist').should('be.visible').should('contain', "Taverne des citations");
		// 	if(element.button != HomeButtonSpecificationCy) {
		// 		cy.centralizedGet(element.button).should('exist').should('be.visible').should('have.class', 'active')
		// 	}
		// })

		// ;[
		// 	{'button': HomeTeamCardButtonCy, 'url': '/team/8327bda4-6bc5-4f2c-9b61-c6cfcc5df290', index:0},
		// 	{'button': HomeTeamCardButtonCy, 'url': '/team/72e46816-5ff4-42ef-a000-8c95e9c6c38b', index:1},
		// ].forEach((element) => {
		// 	cy.visit('localhost:3000/')
		// 	cy.log(`${element.button} ${element.url}`)
		// 	cy.centralizedGet(element.button).eq(element.index).should('exist').should('be.visible').click()
		// 	cy.location('pathname').should('eq', element.url)
		// 	cy.wait('@getProjectById');
		// 	cy.centralizedGet(ProjectNameCy).should('exist').should('be.visible').should('contain', "Taverne des citations");
		// })
		// cy.visit('localhost:3000/')
	})

	/*========  PAGE PLANNING   ============*/
	it('should navigate since planning page with no project selected ', () => {
		// ;[
		// 	ProjectNameCy,
		// 	SpecificationButtonCy,
		// 	TicketButtonCy,
		// 	RexButtonCy
		// ].forEach((element) => {
		// 	cy.visit('localhost:3000/planning')
		// 	cy.centralizedGet(element).should('not.exist');
		// })
		// mockGetUserByIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetProjectByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetTicketByProjectIdHttpCall('c896afae-0532-4ee5-8385-110ccecf72d0')
		// mockGetTicketByProjectIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetTeamUserByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		//TODO ajouter le bouton logout
		// ;[
		// 	{'button': HomeButtonCy, 'url': '/'},
		// 	{'button': PlanningButtonCy, 'url': '/planning'},
		// 	{'button': TeamButtonCy, 'url': '/team'},
		// 	{'button': AccountButtonCy, 'url': '/account'},
		// 	{'button': ButtonNewTicketCy, 'url': '/ticket/create'}
			// {'button': LogoutButtonCy, 'url': '/login'}
		// ].forEach((element) => {
		// 	cy.visit('localhost:3000/planning')
		// 	cy.log(`${element.button} ${element.url}`)
		// 	cy.centralizedGet(element.button).should('exist').should('be.visible').click()
		// 	cy.location('pathname').should('eq', element.url)
		// 	cy.centralizedGet(ProjectNameCy).should('not.exist')
		// 	if(element.button != ButtonNewTicketCy) {
		// 		cy.centralizedGet(element.button).should('exist').should('be.visible').should('have.class', 'active')
		// 	}
		// })
		// cy.visit('localhost:3000/planning')
	})

	it('should navigate since project page with project selected ', () => {
		// cy.selectProject('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetProjectByIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetUserByIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetProjectByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetTicketByUserdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetTeamUserByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetTicketByProjectIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetTicketByProjectIdHttpCall('c896afae-0532-4ee5-8385-110ccecf72d0')
		//TODO ajouter le bouton logout
		// ;[
		// 	{'button': HomeButtonCy, 'url': '/'},
		// 	{'button': PlanningButtonCy, 'url': '/planning'},
		// 	{'button': TeamButtonCy, 'url': '/team'},
		// 	{'button': AccountButtonCy, 'url': '/account'},
		// 	{'button': SpecificationButtonCy, 'url': '/specification/24411468-8707-4773-9af0-0e483cbaa459'},
		// 	{'button': TicketButtonCy, 'url': '/ticket'},
		// 	{'button': RexButtonCy, 'url': '/rex/24411468-8707-4773-9af0-0e483cbaa459'},
		// 	{'button': ButtonNewTicketCy, 'url': '/ticket/create'}
			// {'button': LogoutButtonCy, 'url': '/login'}
		// ].forEach((element) => {
		// 	cy.visit('localhost:3000/planning')
		// 	cy.log(`${element.button} ${element.url}`)
		// 	cy.wait('@getProjectById');
		// 	cy.centralizedGet(element.button).should('exist').should('be.visible').click()
		// 	cy.location('pathname').should('eq', element.url);
		// 	cy.wait('@getProjectById');
		// 	cy.centralizedGet(ProjectNameCy).should('exist').should('be.visible').should('contain', "Taverne des citations");
		// 	if(element.button != ButtonNewTicketCy) {
		// 		cy.centralizedGet(element.button).should('exist').should('be.visible').should('have.class', 'active')
		// 	}
		// })
		// cy.visit('localhost:3000/planning')
	})

	/*========  PAGE EQUIPE   ============*/
	it('should navigate since team page with no project selected ', () => {
		// ;[
		// 	ProjectNameCy,
		// 	SpecificationButtonCy,
		// 	TicketButtonCy,
		// 	RexButtonCy
		// ].forEach((element) => {
		// 	cy.visit('localhost:3000/team')
		// 	cy.centralizedGet(element).should('not.exist');
		// })
		// mockGetTeamUserByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetUserByIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetProjectByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetTicketByProjectIdHttpCall('c896afae-0532-4ee5-8385-110ccecf72d0')
		// mockGetTicketByProjectIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		//TODO ajouter le bouton logout
		// ;[
		// 	{'button': HomeButtonCy, 'url': '/'},
		// 	{'button': PlanningButtonCy, 'url': '/planning'},
		// 	{'button': TeamButtonCy, 'url': '/team'},
		// 	{'button': AccountButtonCy, 'url': '/account'},
		// 	{'button': ButtonCreateTeamCy, 'url': '/team/create'},
		// 	{'button': ButtonTeamHomeShowTeamCy, 'url': '/team/8327bda4-6bc5-4f2c-9b61-c6cfcc5df290'}
			// {'button': LogoutButtonCy, 'url': '/login'}
		// ].forEach((element) => {
		// 	cy.visit('localhost:3000/team')
		// 	cy.log(`${element.button} ${element.url}`)
		// 	if(element.button == ButtonTeamHomeShowTeamCy){
		// 		cy.centralizedGet(element.button).first().should('exist').should('be.visible').click()
		// 	} else {
		// 		cy.centralizedGet(element.button).should('exist').should('be.visible').click()
		// 	}
		// 	cy.location('pathname').should('eq', element.url)
		// 	cy.centralizedGet(ProjectNameCy).should('not.exist')
		// })
		// cy.visit('localhost:3000/')
	})

	it('should navigate since team page with project selected ', () => {
		// cy.selectProject('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetProjectByIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetUserByIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetProjectByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetTicketByUserdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetTeamUserByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetTicketByProjectIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetTicketByProjectIdHttpCall('c896afae-0532-4ee5-8385-110ccecf72d0')
		// mockGetRexByProjectIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetRexByProjectIdHttpCall('c896afae-0532-4ee5-8385-110ccecf72d0')
		//TODO ajouter le bouton logout
		// ;[
		// 	{'button': HomeButtonCy, 'url': '/'},
		// 	{'button': PlanningButtonCy, 'url': '/planning'},
		// 	{'button': TeamButtonCy, 'url': '/team'},
		// 	{'button': AccountButtonCy, 'url': '/account'},
		// 	{'button': SpecificationButtonCy, 'url': '/specification/24411468-8707-4773-9af0-0e483cbaa459'},
		// 	{'button': TicketButtonCy, 'url': '/ticket'},
		// 	{'button': RexButtonCy, 'url': '/rex/24411468-8707-4773-9af0-0e483cbaa459'},
		// 	{'button': ButtonCreateTeamCy, 'url': '/team/create'},
		// 	{'button': ButtonTeamHomeShowTeamCy, 'url': '/team/8327bda4-6bc5-4f2c-9b61-c6cfcc5df290'}
			// {'button': LogoutButtonCy, 'url': '/login'}
		// ].forEach((element) => {
		// 	cy.visit('localhost:3000/team')
		// 	cy.log(`${element.button} ${element.url}`)
		// 	cy.wait('@getProjectById');
		// 	if(element.button == ButtonTeamHomeShowTeamCy){
		// 		cy.centralizedGet(element.button).first().should('exist').should('be.visible').click()
		// 	} else {
		// 		cy.centralizedGet(element.button).should('exist').should('be.visible').click()
		// 	}
		// 	cy.location('pathname').should('eq', element.url);
		// 	cy.wait('@getProjectById');
		// 	cy.centralizedGet(ProjectNameCy).should('exist').should('be.visible').should('contain', "Taverne des citations");
		// })
		// cy.visit('localhost:3000/')
	})

	/*========  PAGE CREATION D'EQUIPE   ============*/
	it('should navigate since team create page with no project selected ', () => {
		// ;[
		// 	ProjectNameCy,
		// 	SpecificationButtonCy,
		// 	TicketButtonCy,
		// 	RexButtonCy
		// ].forEach((element) => {
		// 	cy.visit('localhost:3000/team/create')
		// 	cy.centralizedGet(element).should('not.exist');
		// })
		// mockGetTeamUserByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetUserByIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetProjectByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetTicketByProjectIdHttpCall('c896afae-0532-4ee5-8385-110ccecf72d0')
		// mockGetTicketByProjectIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		//TODO ajouter le bouton logout
		// ;[
		// 	{'button': HomeButtonCy, 'url': '/'},
		// 	{'button': PlanningButtonCy, 'url': '/planning'},
		// 	{'button': TeamButtonCy, 'url': '/team'},
		// 	{'button': AccountButtonCy, 'url': '/account'}
			// {'button': LogoutButtonCy, 'url': '/login'}
		// ].forEach((element) => {
		// 	cy.visit('localhost:3000/team/create')
		// 	cy.log(`${element.button} ${element.url}`)
		// 	cy.centralizedGet(element.button).should('exist').should('be.visible').click()
		// 	cy.location('pathname').should('eq', element.url)
		// 	cy.centralizedGet(ProjectNameCy).should('not.exist')
		// })
		// cy.visit('localhost:3000/')
	})

	it('should navigate since team create page with project selected ', () => {
		// cy.selectProject('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetProjectByIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetUserByIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetProjectByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetTicketByUserdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetTeamUserByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetTicketByProjectIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetTicketByProjectIdHttpCall('c896afae-0532-4ee5-8385-110ccecf72d0')
		// mockGetRexByProjectIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetRexByProjectIdHttpCall('c896afae-0532-4ee5-8385-110ccecf72d0')
		//TODO ajouter le bouton logout
		// ;[
		// 	{'button': HomeButtonCy, 'url': '/'},
		// 	{'button': PlanningButtonCy, 'url': '/planning'},
		// 	{'button': TeamButtonCy, 'url': '/team'},
		// 	{'button': AccountButtonCy, 'url': '/account'},
		// 	{'button': SpecificationButtonCy, 'url': '/specification/24411468-8707-4773-9af0-0e483cbaa459'},
		// 	{'button': TicketButtonCy, 'url': '/ticket'},
		// 	{'button': RexButtonCy, 'url': '/rex/24411468-8707-4773-9af0-0e483cbaa459'}
			// {'button': LogoutButtonCy, 'url': '/login'}
		// ].forEach((element) => {
		// 	cy.visit('localhost:3000/team/create')
		// 	cy.log(`${element.button} ${element.url}`)
		// 	cy.wait('@getProjectById');
		// 	cy.centralizedGet(element.button).should('exist').should('be.visible').click()
		// 	cy.location('pathname').should('eq', element.url);
		// 	cy.wait('@getProjectById');
		// 	cy.centralizedGet(ProjectNameCy).should('exist').should('be.visible').should('contain', "Taverne des citations");
		// })
		// cy.visit('localhost:3000/')
	})

	/*========  PAGE TICKET   ============*/
	it('shouldn\'t navigate in ticket page with no project selected ', () => {
		// cy.visit('localhost:3000/ticket')
		// cy.location('pathname').should('eq', '/')
	})

	it('should navigate since ticket page with project selected ', () => {
		// cy.selectProject('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetProjectByIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetUserByIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetProjectByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetTicketByUserdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetTeamUserByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetTicketByProjectIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetTicketByProjectIdHttpCall('c896afae-0532-4ee5-8385-110ccecf72d0')
		// mockGetRexByProjectIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetRexByProjectIdHttpCall('c896afae-0532-4ee5-8385-110ccecf72d0')
		//TODO ajouter le bouton logout
		// ;[
		// 	{'button': HomeButtonCy, 'url': '/'},
		// 	{'button': PlanningButtonCy, 'url': '/planning'},
		// 	{'button': TeamButtonCy, 'url': '/team'},
		// 	{'button': AccountButtonCy, 'url': '/account'},
		// 	{'button': SpecificationButtonCy, 'url': '/specification/24411468-8707-4773-9af0-0e483cbaa459'},
		// 	{'button': TicketButtonCy, 'url': '/ticket'},
		// 	{'button': RexButtonCy, 'url': '/rex/24411468-8707-4773-9af0-0e483cbaa459'},
		// 	{'button': ButtonCreateTicketCy, 'url': '/ticket/create'},
		// 	{'button': ButtonRedirectSpecificationCy, 'url': '/specification/24411468-8707-4773-9af0-0e483cbaa459'},

			// {'button': LogoutButtonCy, 'url': '/login'}
		// ].forEach((element) => {
		// 	cy.visit('localhost:3000/ticket')
		// 	cy.log(`${element.button} ${element.url}`)
		// 	cy.wait('@getProjectById');
		// 	if(element.button == ButtonRedirectSpecificationCy){
		// 		cy.centralizedGet(element.button).first().should('exist').should('be.visible').click()
		// 	} else {
		// 		cy.centralizedGet(element.button).should('exist').should('be.visible').click()
		// 	}
		// 	cy.location('pathname').should('eq', element.url);
		// 	cy.wait('@getProjectById');
		// 	cy.centralizedGet(ProjectNameCy).should('exist').should('be.visible').should('contain', "Taverne des citations");
		// })
		// cy.visit('localhost:3000/')
	})

	/*========  PAGE CDC   ============*/
	//TODO Test a faire. Impossible pour l'heure a cause du probleme de WINDOW not define

	/*========  PAGE CREATION TICKET   ============*/
	it('should navigate since ticket create page with no project selected', () => {
		// ;[
		// 	ProjectNameCy,
		// 	SpecificationButtonCy,
		// 	TicketButtonCy,
		// 	RexButtonCy
		// ].forEach((element) => {
		// 	cy.visit('localhost:3000/ticket/create')
		// 	cy.centralizedGet(element).should('not.exist');
		// })
		// mockGetPlanningByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetTeamUserByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetUserByIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetProjectByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetTicketByProjectIdHttpCall('c896afae-0532-4ee5-8385-110ccecf72d0')
		// mockGetTicketByProjectIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		//TODO ajouter le bouton logout
		// ;[
		// 	{'button': HomeButtonCy, 'url': '/'},
		// 	{'button': PlanningButtonCy, 'url': '/planning'},
		// 	{'button': TeamButtonCy, 'url': '/team'},
		// 	{'button': AccountButtonCy, 'url': '/account'}
		// 	// {'button': LogoutButtonCy, 'url': '/login'}
		// ].forEach((element) => {
		// 	cy.visit('localhost:3000/ticket/create')
		// 	cy.log(`${element.button} ${element.url}`)
		// 	cy.centralizedGet(element.button).should('exist').should('be.visible').click()
		// 	cy.location('pathname').should('eq', element.url)
		// 	cy.centralizedGet(ProjectNameCy).should('not.exist')
		// })
		// cy.visit('localhost:3000/')
	})

	it('should navigate since ticket create page with project selected ', () => {
		// cy.selectProject('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetPlanningByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetProjectByIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetUserByIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetProjectByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetTicketByUserdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetTeamUserByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetTicketByProjectIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetTicketByProjectIdHttpCall('c896afae-0532-4ee5-8385-110ccecf72d0')
		// mockGetRexByProjectIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetRexByProjectIdHttpCall('c896afae-0532-4ee5-8385-110ccecf72d0')
		//TODO ajouter le bouton logout
		// ;[
		// 	{'button': HomeButtonCy, 'url': '/'},
		// 	{'button': PlanningButtonCy, 'url': '/planning'},
		// 	{'button': TeamButtonCy, 'url': '/team'},
		// 	{'button': AccountButtonCy, 'url': '/account'},
		// 	{'button': SpecificationButtonCy, 'url': '/specification/24411468-8707-4773-9af0-0e483cbaa459'},
		// 	{'button': TicketButtonCy, 'url': '/ticket'},
		// 	{'button': RexButtonCy, 'url': '/rex/24411468-8707-4773-9af0-0e483cbaa459'}
			// {'button': LogoutButtonCy, 'url': '/login'}
		// ].forEach((element) => {
		// 	cy.visit('localhost:3000/ticket/create')
		// 	cy.log(`${element.button} ${element.url}`)
		// 	cy.wait('@getProjectById');
		// 	cy.centralizedGet(element.button).should('exist').should('be.visible').click()
		// 	cy.location('pathname').should('eq', element.url);
		// 	cy.wait('@getProjectById');
		// 	cy.centralizedGet(ProjectNameCy).should('exist').should('be.visible').should('contain', "Taverne des citations");
		// })
		// cy.visit('localhost:3000/')
	})

	/*========  PAGE REX   ============*/
	//TODO on supprime la page intermédiaire rex/ ?
	//TODO on supprime la page intermédiaire specification/ ?
	//TODO on peut acceder directement au rex d'un projet sans le selectionner, ce qui fausse le test, on fait quoi?
	it('shouldn\'t navigate in rex page with no project selected ', () => {
		// cy.visit('localhost:3000/rex/24411468-8707-4773-9af0-0e483cbaa459')
		// cy.location('pathname').should('eq', '/')
	})

	it('should navigate since rex page with project selected and rex', () => {
		// cy.selectProject('c896afae-0532-4ee5-8385-110ccecf72d0')
		// mockGetProjectByIdHttpCall('c896afae-0532-4ee5-8385-110ccecf72d0')
		// mockGetUserByIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetProjectByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetTicketByUserdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetTeamUserByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetTicketByProjectIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetTicketByProjectIdHttpCall('c896afae-0532-4ee5-8385-110ccecf72d0')
		// mockGetRexByProjectIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetRexByProjectIdHttpCall('c896afae-0532-4ee5-8385-110ccecf72d0')
		//TODO ajouter le bouton logout
		// ;[
		// 	{'button': HomeButtonCy, 'url': '/'},
		// 	{'button': PlanningButtonCy, 'url': '/planning'},
		// 	{'button': TeamButtonCy, 'url': '/team'},
		// 	{'button': AccountButtonCy, 'url': '/account'},
		// 	{'button': SpecificationButtonCy, 'url': '/specification/c896afae-0532-4ee5-8385-110ccecf72d0'},
		// 	{'button': TicketButtonCy, 'url': '/ticket'},
		// 	{'button': RexButtonCy, 'url': '/rex/c896afae-0532-4ee5-8385-110ccecf72d0'},
			// {'button': LogoutButtonCy, 'url': '/login'}
		// ].forEach((element) => {
		// 	cy.visit('localhost:3000/rex/c896afae-0532-4ee5-8385-110ccecf72d0')
		// 	cy.log(`${element.button} ${element.url}`)
		// 	cy.wait('@getProjectById');
		// 	cy.centralizedGet(element.button).should('exist').should('be.visible').click()
		// 	cy.location('pathname').should('eq', element.url);
		// 	cy.wait('@getProjectById');
		// 	cy.centralizedGet(ProjectNameCy).should('exist').should('be.visible').should('contain', "GPE");
		// })
		// cy.visit('localhost:3000/rex/24411468-8707-4773-9af0-0e483cbaa459')
	})

	it('should navigate since rex page with project selected and no rex', () => {
		// cy.selectProject('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetProjectByIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetUserByIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetProjectByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetTicketByUserdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetTeamUserByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetTicketByProjectIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetTicketByProjectIdHttpCall('c896afae-0532-4ee5-8385-110ccecf72d0')
		// mockGetRexByProjectIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetRexByProjectIdHttpCall('c896afae-0532-4ee5-8385-110ccecf72d0')
		//TODO ajouter le bouton logout
		// ;[
		// 	{'button': HomeButtonCy, 'url': '/'},
		// 	{'button': PlanningButtonCy, 'url': '/planning'},
		// 	{'button': TeamButtonCy, 'url': '/team'},
		// 	{'button': AccountButtonCy, 'url': '/account'},
		// 	{'button': SpecificationButtonCy, 'url': '/specification/24411468-8707-4773-9af0-0e483cbaa459'},
		// 	{'button': TicketButtonCy, 'url': '/ticket'},
		// 	{'button': RexButtonCy, 'url': '/rex/24411468-8707-4773-9af0-0e483cbaa459'},
			// {'button': LogoutButtonCy, 'url': '/login'}
		// ].forEach((element) => {
		// 	cy.visit('localhost:3000/rex/24411468-8707-4773-9af0-0e483cbaa459')
		// 	cy.log(`${element.button} ${element.url}`)
		// 	cy.wait('@getProjectById');
		// 	cy.centralizedGet(element.button).should('exist').should('be.visible').click()
		// 	cy.location('pathname').should('eq', element.url);
		// 	cy.wait('@getProjectById');
		// 	cy.centralizedGet(ProjectNameCy).should('exist').should('be.visible').should('contain', "Taverne des citations");
		// })
		// cy.visit('localhost:3000/rex/24411468-8707-4773-9af0-0e483cbaa459')
	})

	/*========  PAGE COMPTE   ============*/
	it('should navigate since account page with no project selected ', () => {
		// ;[
		// 	ProjectNameCy,
		// 	SpecificationButtonCy,
		// 	TicketButtonCy,
		// 	RexButtonCy
		// ].forEach((element) => {
		// 	cy.visit('localhost:3000/account')
		// 	cy.centralizedGet(element).should('not.exist');
		// })
		// mockGetTeamUserByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetUserByIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetProjectByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetTicketByProjectIdHttpCall('c896afae-0532-4ee5-8385-110ccecf72d0')
		// mockGetTicketByProjectIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		//TODO ajouter le bouton logout
		// ;[
		// 	{'button': HomeButtonCy, 'url': '/'},
		// 	{'button': PlanningButtonCy, 'url': '/planning'},
		// 	{'button': TeamButtonCy, 'url': '/team'},
		// 	{'button': AccountButtonCy, 'url': '/account'}
			// {'button': LogoutButtonCy, 'url': '/login'}
		// ].forEach((element) => {
		// 	cy.visit('localhost:3000/team/create')
		// 	cy.log(`${element.button} ${element.url}`)
		// 	cy.centralizedGet(element.button).should('exist').should('be.visible').click()
		// 	cy.location('pathname').should('eq', element.url)
		// 	cy.centralizedGet(ProjectNameCy).should('not.exist')
		// })
		// cy.visit('localhost:3000/')
	})

	it('should navigate since account page with project selected ', () => {
		// cy.selectProject('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetProjectByIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetUserByIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetProjectByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetTicketByUserdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetTeamUserByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		// mockGetTicketByProjectIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetTicketByProjectIdHttpCall('c896afae-0532-4ee5-8385-110ccecf72d0')
		// mockGetRexByProjectIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		// mockGetRexByProjectIdHttpCall('c896afae-0532-4ee5-8385-110ccecf72d0')
		//TODO ajouter le bouton logout
		// ;[
		// 	{'button': HomeButtonCy, 'url': '/'},
		// 	{'button': PlanningButtonCy, 'url': '/planning'},
		// 	{'button': TeamButtonCy, 'url': '/team'},
		// 	{'button': AccountButtonCy, 'url': '/account'},
		// 	{'button': SpecificationButtonCy, 'url': '/specification/24411468-8707-4773-9af0-0e483cbaa459'},
		// 	{'button': TicketButtonCy, 'url': '/ticket'},
		// 	{'button': RexButtonCy, 'url': '/rex/24411468-8707-4773-9af0-0e483cbaa459'}
			// {'button': LogoutButtonCy, 'url': '/login'}
		// ].forEach((element) => {
		// 	cy.visit('localhost:3000/account')
		// 	cy.log(`${element.button} ${element.url}`)
		// 	cy.wait('@getProjectById');
		// 	cy.centralizedGet(element.button).should('exist').should('be.visible').click()
		// 	cy.location('pathname').should('eq', element.url);
		// 	cy.wait('@getProjectById');
		// 	cy.centralizedGet(ProjectNameCy).should('exist').should('be.visible').should('contain', "Taverne des citations");
		// })
		// cy.visit('localhost:3000/')
	})
})
