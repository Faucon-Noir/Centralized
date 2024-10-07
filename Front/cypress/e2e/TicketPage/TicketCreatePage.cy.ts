import {
	ButtonGenerateTicketCy,
	DescriptionErrorCy,
	DescriptionFieldCy,
	DescriptionLabelCy,
	EndTicketErrorCy,
	EndTicketFieldCy,
	EndTicketLabelCy,
	NameErrorCy,
	NameFieldCy,
	NameLabelCy,
	ProjectErrorCy,
	ProjectFieldCy,
	ProjectLabelCy,
	StartTitcketErrorCy,
	StartTitcketFieldCy,
	StartTitcketLabelCy,
	UrgenceErrorCy,
	UrgenceFieldCy,
	UrgenceLabelCy } from '../../../src/pages/ticket/const'
import {
	mockGetPlanningByUserIdHttpCall,
	mockPostCreateTicketHttpCall } from '../../support/helper'

// Ici on test la page de creation de ticket en tant qu'utilisateur
// On ne regarde pas le style seulement le contenu et le comportement

// Avant chaque test on se rend sur la page de création de ticket


// Collection de test pour la page de création de ticket
describe('TicketCreatePage', () => {
	beforeEach(() => {
		cy.login()
		cy.visit('http://localhost:3000/ticket/create')
		mockGetPlanningByUserIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
	})
	afterEach(() => {
		cy.logout()
	})

	// Test pour vérifier que la page de creation de ticket s'affiche correctement
	it('should display all page elements', () => {
		;[
			NameLabelCy,
			StartTitcketLabelCy,
			EndTicketLabelCy,
			ProjectLabelCy,
			UrgenceLabelCy,
			DescriptionLabelCy,
			NameFieldCy,
			StartTitcketFieldCy,
			EndTicketFieldCy,
			ProjectFieldCy,
			UrgenceFieldCy,
			DescriptionFieldCy,
			ButtonGenerateTicketCy
		].forEach((element) => {
			cy.centralizedGet(element).should('exist').should('be.visible');
		})

		cy.centralizedGet(ProjectFieldCy).find('option').should('have.length', 3);
		cy.centralizedGet(UrgenceFieldCy).find('option').should('have.length', 6);
	})

	// Test pour vérifier les messages d'erreur
	it('should display error message', () => {
		;[
			{'field': NameFieldCy, 'error': NameErrorCy, 'input': 'test', 'type': 'text'},
			{'field': ProjectFieldCy, 'error': ProjectErrorCy, 'input': '', 'type': 'select'},
			{'field': UrgenceFieldCy, 'error': UrgenceErrorCy, 'input': '', 'type': 'select'},
			{'field': DescriptionFieldCy, 'error': DescriptionErrorCy, 'input': 'test de description', 'type': 'text'}
		].forEach((element) => {
			cy.centralizedGet(ButtonGenerateTicketCy).click()
			cy.centralizedGet(element.error).should('exist').should('be.visible');
			if(element.type == 'text')
				cy.centralizedGet(element.field).type(element.input);
			else
				cy.centralizedGet(element.field).select(1);
		})

		;[
			{'field': NameFieldCy, 'error': NameErrorCy, 'input': 'test', 'type': 'text'},
			{'field': ProjectFieldCy, 'error': ProjectErrorCy, 'input': '', 'type': 'select'},
			{'field': UrgenceFieldCy, 'error': UrgenceErrorCy, 'input': '', 'type': 'select'},
			{'field': DescriptionFieldCy, 'error': DescriptionErrorCy, 'input': 'test de description', 'type': 'text'},
			{'field': StartTitcketFieldCy, 'error': StartTitcketErrorCy, 'input': '2024-07-22', 'type': 'text'},
			{'field': EndTicketFieldCy, 'error': EndTicketErrorCy, 'input': '2024-07-26', 'type': 'text'}
		].forEach((element) => {
			if(element.type == 'text')
				cy.centralizedGet(element.field).clear();
			else
				cy.centralizedGet(element.field).select(0);
			cy.centralizedGet(ButtonGenerateTicketCy).click()
			cy.centralizedGet(element.error).should('exist').should('be.visible');
			if(element.type == 'text')
				cy.centralizedGet(element.field).type(element.input);
			else
				cy.centralizedGet(element.field).select(1);
		})
		cy.visit('http://localhost:3000/ticket/create')
	})

	// Test pour vérifier la redirection en cas de creation de ticket
	it('should create ticket', () => {
		mockPostCreateTicketHttpCall()
		;[
			{'field': NameFieldCy, 'error': NameErrorCy, 'input': 'test', 'type': 'text'},
			{'field': ProjectFieldCy, 'error': ProjectErrorCy, 'input': '', 'type': 'select'},
			{'field': UrgenceFieldCy, 'error': UrgenceErrorCy, 'input': '', 'type': 'select'},
			{'field': DescriptionFieldCy, 'error': DescriptionErrorCy, 'input': 'test de description', 'type': 'text'}
		].forEach((element) => {
			if(element.type == 'text')
				cy.centralizedGet(element.field).type(element.input);
			else
				cy.centralizedGet(element.field).select(1);

		})
		cy.centralizedGet(ButtonGenerateTicketCy).click();
		cy.location('pathname').should('eq', '/ticket');
	})
})
