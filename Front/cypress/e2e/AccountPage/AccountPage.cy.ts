import { mockGetUserByIdHttpCall } from '../../support/helper'
import {
	AvartarImageCy,
	BioFielCy,
	BioLabelCy,
	EmailFielCy,
	EmailLabelCy,
	FirstNameFielCy,
	FirstNameLabelCy,
	LastNameFielCy,
	LastNameLabelCy,
	PhoneFielCy,
	PhoneLabelCy,
	SaveButtonCy,
} from '../../../src/pages/account/const'

// Collection de tests
describe('AccountPage', () => {
	beforeEach(() => {
		cy.login()
		cy.visit('http://localhost:3000/account')
	})
	// Test pour vérifier que la page de l'utilisateur s'affiche correctement
	it('should display all page elements', () => {
		;[
			AvartarImageCy,
			FirstNameLabelCy,
			LastNameLabelCy,
			EmailLabelCy,
			PhoneLabelCy,
			BioLabelCy,
			FirstNameFielCy,
			LastNameFielCy,
			EmailFielCy,
			PhoneFielCy,
			BioFielCy,
			SaveButtonCy,
		].forEach((element) => {
			cy.centralizedGet(element).should('exist').should('be.visible')
			if (element === SaveButtonCy) {
				cy.centralizedGet(element)
					.should('exist')
					.should('not.be.disabled')
					.click()
					.location('pathname')
					.should('eq', '/account')
			}
		})
	})
})

describe('AccountPageData', () => {
	it('should display user information', () => {
		cy.visit('http://localhost:3000/account')
		mockGetUserByIdHttpCall('cd345ea2-2a5f-42f2-a588-560ff4eaba8e')
		;[
			FirstNameFielCy,
			LastNameFielCy,
			EmailFielCy,
			PhoneFielCy,
			BioFielCy,
		].forEach((element) => {
			;[
				'JDC',
				'2048',
				'beuret_m@etna-alternance.net',
				'+33 7 01 21 94 14',
				'Je suis un petit suisse',
			].forEach((text) => {
				cy.centralizedGet(element).should('have.text', text)
			})
		})
	})
})
