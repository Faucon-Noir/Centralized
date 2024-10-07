import { ButtonCreateTicketCy, TicketModalButtonCloseCy, TicketModalButtonSaveCy, TicketModalCy, TicketModalDescriptionFieldCy, TicketModalEndDateFieldCy, TicketModalStartDateFieldCy, TicketModalStatusFieldCy, TicketModalTitleCy, TicketModalUrgenceFieldCy } from '../../../src/pages/ticket/const'
import { BoxTaskItem, ButtonArchiveSpecificationCy, ButtonEditSpecificationCy, NameTaskItem, StartTaskItem, StatusTaskItem, UrgenceTaskItem } from '../../../src/app/components/LongCard/TaskItem/const'
import { mockGetProjectByIdHttpCall, mockGetTicketByProjectIdHttpCall, mockPatchUpdateTicketHttpCall } from '../../support/helper'

// Ici on test la page d'affichage des tickets en tant qu'utilisateur
// On ne regarde le fond des blocs en plus de leur contenu et leur comportement

// Avant chaque test on se rend sur la page d'affichage des tickets


// Collection de test pour la page d'affichage des tickets
describe('TicketHomePage', () => {
	beforeEach(() => {
		cy.login()
		cy.selectProject('24411468-8707-4773-9af0-0e483cbaa459')
		cy.visit('http://localhost:3000/ticket/')
	})
	afterEach(() => {
		cy.logout()
	})

	// Test pour vérifier que la page home de ticket s'affiche correctement
	it('should display all page elements for the 1st project', () => {
		mockGetProjectByIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		mockGetTicketByProjectIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459')
		cy.centralizedGet(ButtonCreateTicketCy).should('exist').should('be.visible');
		cy.centralizedGet(BoxTaskItem).should('have.length', 3);
		;[
			{'index': 0, 'name': 'Create register page 2 days', 'description': 'test 1', 'urgence': 2, 'urgence_name': 'Moyenne', 'status': 'résolu', 'start': '2024-07-13', 'formated_start': '13/07/2024', 'end': '2024-06-28', 'color': 'rgb(121, 169, 255)'},
			{'index': 1, 'name': 'Create login page 1 day', 'description': 'test 2', 'urgence': 1, 'urgence_name': 'Faible', 'status': 'ouvert', 'start': '2024-07-11', 'formated_start': '11/07/2024', 'end': '2024-04-11', 'color': 'rgb(103, 174, 94)'},
			{'index': 2, 'name': 'Create home page 1 week', 'description': 'test 3', 'urgence': 0, 'urgence_name': 'Inconnu', 'status': 'ouvert', 'start': '2024-07-12', 'formated_start': '12/07/2024', 'end': '2024-05-20', 'color': 'rgb(255, 255, 255)'},

		].forEach((element) => {
			cy.centralizedGet(BoxTaskItem).eq(element.index).should('exist').should('be.visible');
			cy.centralizedGet(BoxTaskItem).eq(element.index).should('have.css', 'background-color', element.color);
			cy.centralizedGet(BoxTaskItem).eq(element.index).find(`[data-cy="${UrgenceTaskItem}"]`).should('contain', `Niveau d'urgence : ${element.urgence_name}`);
			cy.centralizedGet(BoxTaskItem).eq(element.index).find(`[data-cy="${NameTaskItem}"]`).should('contain', `${element.name}`);
			if(element.status == 'résolu'){
				cy.centralizedGet(BoxTaskItem).eq(element.index).find(`[data-cy="${StatusTaskItem}"]`).should('contain', 'Le ticket est résolu');
			} else {
				
				cy.centralizedGet(BoxTaskItem).eq(element.index).find(`[data-cy="${StatusTaskItem}"]`).should('contain', 'Le ticket est actuellement en cours');
			}
			cy.centralizedGet(BoxTaskItem).eq(element.index).find(`[data-cy="${StartTaskItem}"]`).should('contain', `${element.formated_start}`);
		})
	})

	it('should display correctly all form for the 1st project', () => {
		mockGetProjectByIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459');
		mockGetTicketByProjectIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459');
		mockPatchUpdateTicketHttpCall('1eb6f8df-a650-4da7-93c5-e88531706246');
		mockPatchUpdateTicketHttpCall('13a59846-03ab-45da-8bbd-fffff09c5dd5');
		mockPatchUpdateTicketHttpCall('56ba1573-6724-4f1a-ba8a-b1e2913b6670');
		;[
			{'index': 0, 'name': 'Create register page 2 days', 'description': 'test 1', 'urgence': 2, 'urgence_name': 'Moyenne', 'status': 'résolu', 'start': '2024-07-13', 'formated_start': '13/07/2024', 'end': '2024-06-28', 'color': 'rgb(121, 169, 255)'},
			{'index': 1, 'name': 'Create login page 1 day', 'description': 'test 2', 'urgence': 1, 'urgence_name': 'Faible', 'status': 'ouvert', 'start': '2024-07-11', 'formated_start': '11/07/2024', 'end': '2024-04-11', 'color': 'rgb(103, 174, 94)'},
			{'index': 2, 'name': 'Create home page 1 week', 'description': 'test 3', 'urgence': 0, 'urgence_name': 'Inconnu', 'status': 'ouvert', 'start': '2024-07-12', 'formated_start': '12/07/2024', 'end': '2024-05-20', 'color': 'rgb(255, 255, 255)'},

		].forEach((element) => {
			cy.centralizedGet(BoxTaskItem).eq(element.index).should('exist').should('be.visible');
			cy.centralizedGet(TicketModalCy).should('not.exist');
			cy.centralizedGet(BoxTaskItem).eq(element.index).find(`[data-cy="${ButtonEditSpecificationCy}"]`).click();
			cy.centralizedGet(TicketModalCy).should('exist').should('be.visible');
			cy.centralizedGet(TicketModalTitleCy).find('input').should('have.value', element.name);
			cy.centralizedGet(TicketModalUrgenceFieldCy).find('option').should('have.length', 5);
			cy.centralizedGet(TicketModalUrgenceFieldCy).should('have.value', element.urgence);
			cy.centralizedGet(TicketModalStatusFieldCy).find('option').should('have.length', 7);
			cy.centralizedGet(TicketModalStatusFieldCy).should('have.value', element.status);
			cy.centralizedGet(TicketModalStartDateFieldCy).should('have.value', element.start);
			cy.centralizedGet(TicketModalEndDateFieldCy).should('have.value', element.end);
			cy.centralizedGet(TicketModalDescriptionFieldCy).find('textarea').should('have.value', element.description);
			cy.centralizedGet(TicketModalButtonCloseCy).click();
			cy.centralizedGet(TicketModalCy).should('not.exist');
		})
	})

	it('should interact correctly with all field for the 1st project', () => {
		mockGetProjectByIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459');
		mockGetTicketByProjectIdHttpCall('24411468-8707-4773-9af0-0e483cbaa459');
		mockPatchUpdateTicketHttpCall('1eb6f8df-a650-4da7-93c5-e88531706246');
		mockPatchUpdateTicketHttpCall('13a59846-03ab-45da-8bbd-fffff09c5dd5');
		mockPatchUpdateTicketHttpCall('56ba1573-6724-4f1a-ba8a-b1e2913b6670');
		cy.centralizedGet(BoxTaskItem).eq(0).find(`[data-cy="${ButtonEditSpecificationCy}"]`).click();
		cy.centralizedGet(TicketModalCy).should('exist').should('be.visible');
		;[
			{'field': TicketModalTitleCy, 'type': 'input', 'input': 'new Project'},
			{'field': TicketModalUrgenceFieldCy, 'type': 'select', 'input': '4'},
			{'field': TicketModalStatusFieldCy, 'type': 'select', 'input': 'en revue'},
			{'field': TicketModalStartDateFieldCy, 'type': 'date', 'input': '2025-07-22'},
			{'field': TicketModalEndDateFieldCy, 'type': 'date', 'input': '2025-07-27'},
			{'field': TicketModalDescriptionFieldCy, 'type': 'textarea', 'input': 'new test'},
		].forEach((element) => {
			if(element.type == 'date') {
				cy.centralizedGet(element.field).clear();
				cy.centralizedGet(element.field).type(element.input);
			} else if(element.type == 'select') {
				cy.centralizedGet(element.field).select(0);
				cy.centralizedGet(element.field).select(element.input);
		 	} else {
				cy.centralizedGet(element.field).find(element.type).first().should('exist').should('be.visible').clear();
				cy.centralizedGet(element.field).find(element.type).first().type(element.input);
			}
		})

		cy.centralizedGet(TicketModalButtonSaveCy).click();
		cy.location('pathname').should('eq', '/ticket');
		cy.centralizedGet(TicketModalCy).should('not.exist');

		cy.centralizedGet(ButtonArchiveSpecificationCy).first().click();
		cy.location('pathname').should('eq', '/ticket');
		cy.centralizedGet(TicketModalCy).should('not.exist');
	})

})
