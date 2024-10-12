// import { 	
// 	ButtonSubmitRexCy,
// 	RexAmeliorationCy,
// 	RexErrorAmeliorationCy,
// 	RexErrorGeneralCy,
// 	RexErrorProblemeCy,
// 	RexErrorReussiteCy,
// 	RexInputAmeliorationCy,
// 	RexInputProblemeCy,
// 	RexInputReussiteCy,
// 	RexProblemeCy,
// 	RexReussiteCy 
// } from '../../../src/pages/rex/const'

import { 
	mockGetProjectByIdHttpCall,
	mockGetRexByProjectIdHttpCall,
	mockPostCreateRexErrortHttpCall 
} from '../../support/helper'

// Ici on test la page de creation et l'affiche des rex en tant qu'utilisateur
// On ne regarde pas le style seulement le contenu et le comportement

// Avant chaque test on se rend sur la page rex d'un projet

//TODO supprimer si on supprime la page au profil du rex dans dashboard
// Collection de test pour la page de création et l'affichage de rex
describe('RexPage', () => {
	// beforeEach(() => {
	// 	cy.login()
	// })
	// afterEach(() => {
	// 	cy.logout()
	// })

	// Test pour vérifier que la page de creation d'un rex s'affiche correctement
	it('should display all page elements for generate a rex', () => {
		// mockGetProjectByIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		// cy.visit('http://localhost:3000/rex/24411468-8707-4773-9af0-0e483cbaa459')
		// ;[
		// 	RexInputReussiteCy,
		// 	RexInputProblemeCy,
		// 	RexInputAmeliorationCy,
		// 	ButtonSubmitRexCy
		// ].forEach((element) => {
		// 	cy.centralizedGet(element).should('exist').should('be.visible');
		// })

		// ;[
		// 	RexErrorReussiteCy,
		// 	RexErrorProblemeCy,
		// 	RexErrorAmeliorationCy,
		// 	RexErrorGeneralCy,
		// 	RexReussiteCy,
		// 	RexProblemeCy,
		// 	RexAmeliorationCy
		// ].forEach((element) => {
		// 	cy.centralizedGet(element).should('not.exist');
		// })
		// cy.visit('http://localhost:3000/rex/24411468-8707-4773-9af0-0e483cbaa459')

	})

	// Test pour vérifier que la page d'affiche de rex s'affiche correctement
	it('should display all page elements for show a rex', () => {
		// mockGetProjectByIdHttpCall('c896afae-0532-4ee5-8385-110ccecf72d0')
		// mockGetRexByProjectIdHttpCall('c896afae-0532-4ee5-8385-110ccecf72d0')
		// cy.visit('http://localhost:3000/rex/c896afae-0532-4ee5-8385-110ccecf72d0')
		// ;[
		// 	{'element': RexReussiteCy, 'text': 'dshjdkflgm'},
		// 	{'element': RexProblemeCy, 'text': 'jkdjxckgv'},
		// 	{'element': RexAmeliorationCy, 'text': 'lvgkcfgly'}
		// ].forEach((element) => {
		// 	cy.centralizedGet(element.element).should('exist').should('be.visible').should('contain', element.text);
		// })

		// ;[
		// 	RexInputReussiteCy,
		// 	RexInputProblemeCy,
		// 	RexInputAmeliorationCy,
		// 	ButtonSubmitRexCy,
		// 	RexErrorReussiteCy,
		// 	RexErrorProblemeCy,
		// 	RexErrorAmeliorationCy,
		// 	RexErrorGeneralCy
		// ].forEach((element) => {
		// 	cy.centralizedGet(element).should('not.exist');
		// })
	})

	// Test pour vérifier les messages d'erreur
	it('should display error message', () => {
		// mockGetProjectByIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		// mockPostCreateRexErrortHttpCall()
		// cy.visit('http://localhost:3000/rex/24411468-8707-4773-9af0-0e483cbaa459')
		// ;[
		// 	{'field': RexInputReussiteCy, 'error': RexErrorReussiteCy, 'input': '1er test'},
		// 	{'field': RexInputProblemeCy, 'error': RexErrorProblemeCy, 'input': '2eme test'},
		// 	{'field': RexInputAmeliorationCy, 'error': RexErrorAmeliorationCy, 'input': '3eme test'}
		// ].forEach((element) => {
		// 	cy.centralizedGet(ButtonSubmitRexCy).click()
		// 	cy.centralizedGet(element.error).should('exist').should('be.visible');
		// 	cy.centralizedGet(element.field).type(element.input);
		// })

		// ;[
		// 	{'field': RexInputReussiteCy, 'error': RexErrorReussiteCy, 'input': '1er test'},
		// 	{'field': RexInputProblemeCy, 'error': RexErrorProblemeCy, 'input': '2eme test'},
		// 	{'field': RexInputAmeliorationCy, 'error': RexErrorAmeliorationCy, 'input': '3eme test'}
		// ].forEach((element) => {
		// 	cy.centralizedGet(element.field).clear();
		// 	cy.centralizedGet(ButtonSubmitRexCy).click()
		// 	cy.centralizedGet(element.error).should('exist').should('be.visible');
		// 	cy.centralizedGet(element.field).type(element.input);
		// })
		// cy.centralizedGet(ButtonSubmitRexCy).click();
		// cy.centralizedGet(RexErrorGeneralCy).should('exist').should('be.visible');

		// cy.visit('http://localhost:3000/rex/24411468-8707-4773-9af0-0e483cbaa459')
	})

	// Test pour vérifier la redirection en cas de creation de ticket
	it('should create Rex', () => {
	// 	mockGetProjectByIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
	// 	mockGetRexByProjectIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
	// 	cy.visit('http://localhost:3000/rex/24411468-8707-4773-9af0-0e483cbaa459')
	// 	;[
	// 		{'field': RexInputReussiteCy, 'input': '1er test'},
	// 		{'field': RexInputProblemeCy, 'input': '2eme test'},
	// 		{'field': RexInputAmeliorationCy, 'input': '3eme test'}
	// 	].forEach((element) => {
	// 		cy.centralizedGet(element.field).type(element.input);

	// 	})
	// 	cy.centralizedGet(ButtonSubmitRexCy).click();
	// 	cy.location('pathname').should('eq', '/rex/24411468-8707-4773-9af0-0e483cbaa459');
	})
})
