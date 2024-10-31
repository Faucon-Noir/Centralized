import React from 'react'
import TaskCard from './index'
/* eslint-disable react/no-children-prop */
describe('TaskCard', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TaskCard id={65}
      title={"Gpe"}
      urgenceId={1}
      date={"12/12/2024"}
      color={1}
      key={"vriefj,"}/>)
  })

  it('Verifier titre', () => {
    var titre = "Je suis un test"
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TaskCard id={65}
      title={titre}
      urgenceId={1}
      date={"12/12/2024"}
      color={1}
      key={"vriefj,"}/>)
    cy.get('h2').should('contain.text', titre)
  })

  it('Verifier date', () => {
    var date = "12/12/2024"
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TaskCard id={65}
      title={"Je suis un test"}
      urgenceId={1}
      date={date}
      color={1}
      key={"vriefj,"}/>)
    cy.get('#date').should('contain.text', "posté le "+date)
  })

  it('Verifier date bis', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TaskCard id={65}
      title={"Je suis un test"}
      urgenceId={1}
      date={"2024-12-12"}
      color={1}
      key={"vriefj,"}/>)
    cy.get('#date').should('contain.text', "posté le 12/12/2024")
  })

  it('Verifier urgence', () => {
    var urgence = 1
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TaskCard id={65}
      title={"Je suis un test"}
      urgenceId={urgence}
      date={"12/12/2024"}
      color={1}
      key={"vriefj,"}/>)
    cy.get('#urgence').should('contain.text', "Urgence: Faible")
  })

  it('Verifier urgence bis', () => {
    var urgence = 14
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TaskCard id={65}
      title={"Je suis un test"}
      urgenceId={urgence}
      date={"12/12/2024"}
      color={1}
      key={"vriefj,"}/>)
    cy.get('#urgence').should('contain.text', "Urgence: Inconnu")
  })

  it('Verifier couleur', () => {
    var couleur = 2
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TaskCard id={65}
      title={"Je suis un test"}
      urgenceId={1}
      date={"12/12/2024"}
      color={couleur}
      key={"vriefj,"}/>)
    cy.get('#icon').should('have.css', "color").and('eq', 'rgb(139, 199, 41)')
  })
})