import {
	CGUButtonCy,
	ForgotPasswordLinkCy,
	MailFieldCy,
	NameFieldCy,
	PasswordFieldCy,
	PhoneFieldCy,
	SubmitButtonCy,
	SurnameFieldCy,
	SwitchLoginButtonCy,
	SwitchRegisterButtonCy,
} from '../../../src/app/components/registrationForm/const'
import {
	BlueGridCy,
	PlanningImgCy,
	PlanningsLabelCy,
	ProjectImgCy,
	ProjectsLabelCy,
	RegistrationFormCy,
	RexImgCy,
	RexLabelCy,
	SpecificationImgCy,
	SpecificationLabelCy,
	TeamsImgCy,
	TeamsLabelCy,
	TicketImgCy,
	TicketsLabelCy,
	WhiteGridCy,
	WhiteLogoImgCy,
	WhiteLogoLabelCy,
} from '../../../src/pages/login/const'

// Ici on test la page de login en tant qu'utilisateur
// On ne regarde pas le style seulement le contenu et le comportement

// Avant chaque test on se rend sur la page de login
// beforeEach(() => {
// 	cy.visit('http://localhost:3000/login')
// })

// Collection de test pour la page de login
describe('LoginPage', () => {
	// Test pour vérifier que la page de login s'affiche correctement
	it('should display all page elements', () => {
		cy.visit('http://localhost:3000/login')
		;[WhiteGridCy, BlueGridCy].forEach((grid) => {
			cy.centralizedGet(grid).should('be.visible')
			switch (grid) {
				case WhiteGridCy:
					cy.centralizedGet(RegistrationFormCy)
						.should('exist')
						.should('be.visible')
					break
				case BlueGridCy:
					// Pour faciliter la lecture du code on sépart le test des images et des labels
					;[
						WhiteLogoImgCy,
						ProjectImgCy,
						PlanningImgCy,
						SpecificationImgCy,
						TicketImgCy,
						TeamsImgCy,
						RexImgCy,
					].forEach((img) => {
						// Un élément peut exister sans être visible, donc on vérifie les deux
						// Par contre, si un élément n'existe pas, il ne peut pas être visible, dans ce cas on ne vérifie que l'existence de l'élément
						cy.centralizedGet(img)
							.should('exist')
							.should('be.visible')
					})
					;[
						WhiteLogoLabelCy,
						ProjectsLabelCy,
						PlanningsLabelCy,
						SpecificationLabelCy,
						TicketsLabelCy,
						TeamsLabelCy,
						RexLabelCy,
					].forEach((label) => {
						cy.centralizedGet(label)
							.should('exist')
							.should('be.visible')
					})
			}
		})
	})

	// Test pour vérifier le contenu du formulaire de login
	it('registration form should have all login elements', () => {
		// On a 2 boutons pour switcher entre login et register, donc on veut tester pour chacun des deux
		;[SwitchLoginButtonCy, SwitchRegisterButtonCy].forEach((switchBtn) => {
			// On vérifie que le bouton cible est visible et on clique dessus
			cy.centralizedGet(switchBtn).should('be.visible').click()

			// Puis on vérifie que les éléments communs sont bien visibles
			;[SubmitButtonCy, MailFieldCy, PasswordFieldCy].forEach(
				(common) => {
					cy.centralizedGet(common).should('be.visible')
				}
			)
			// On vérifie que les éléments spécifiques ont le comportement attendu
			if (switchBtn === SwitchLoginButtonCy) {
				// On s'attend a ce que le bouton d'oubli de mot de passe existe dans le dom et soit visible
				cy.centralizedGet(ForgotPasswordLinkCy)
					.should('exist')
					.should('be.visible')

				// On vérifie que les éléments spécifiques au register n'existent pas
				;[
					NameFieldCy,
					SurnameFieldCy,
					PhoneFieldCy,
					CGUButtonCy,
				].forEach((specific) => {
					// Si la cible n'existe pas, elle ne peux pas s'afficher
					cy.centralizedGet(specific).should('not.exist')
				})
			} else {
				// Mode register
				// On s'attend a ce que le bouton d'oubli de mot de passe n'existe pas
				cy.centralizedGet(ForgotPasswordLinkCy).should('not.exist')

				// On vérifie que les éléments spécifiques au register existent et soient visible
				;[
					NameFieldCy,
					SurnameFieldCy,
					PhoneFieldCy,
					CGUButtonCy,
				].forEach((specific) => {
					cy.centralizedGet(specific)
						.should('exist')
						.should('be.visible')
				})
			}
		})
	})
})
