import React from 'react'
import TeamCard from './index'
/* eslint-disable react/no-children-prop */
describe('TeamCard', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TeamCard name={"test"} />)
  })

  it('Verifier titre', () => {
    var titre = "test"
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TeamCard name={titre} />)
    cy.get('h2').should('contain.text', titre)
  })
})