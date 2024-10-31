import React from 'react'
import ProjetCard from './index'
/* eslint-disable react/no-children-prop */
describe('ProjetCard', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ProjetCard
      name={"je suis un test"}
      totalTickets={"115"}
      key={"fre"}
      id={"tf"}
      projectId={''}
      updateUserData={{}}
      userData={{}}
  />)
  })

  it('Verifier titre', () => {
    var titre = "Je suis un test"
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ProjetCard
      name={titre}
      totalTickets={"115"}
      key={"fre"}
      id={"tf"}
      projectId={''}
      updateUserData={{}}
      userData={{}}
  />)
  cy.get('h2').should('contain.text', titre)
  })

  it('Verifier nombre ticket', () => {
    var nb_ticket = 115
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ProjetCard
      name={"Je suis un test"}
      totalTickets={nb_ticket}
      key={"fre"}
      id={"tf"}
      projectId={''}
      updateUserData={{}}
      userData={{}}
  />)
  cy.get('p').should('contain.text', nb_ticket)
  })
  
  // Rajouter test si on clique sur la div, sa rajoute dans la liste des projet choisi
})