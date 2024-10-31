import React from 'react'
import RexItem from './index'
/* eslint-disable react/no-children-prop */
describe('<RexItem />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<RexItem id={''} name={'gpe'} status={true} />)
  })

  it('Vérifier name', () => {
    var name = 'gpe'
    // see: https://on.cypress.io/mounting-react
    cy.mount(<RexItem id={''} name={name} status={true} />)
    cy.get('h3').should('contain.text', name)
  })

  it('Vérifier status true', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<RexItem id={''} name={'gpe'} status={true} />)
    cy.get('button').should('contain.text', "Ouvrir le rex")
    cy.get('.card').should('have.css', "background-color").and('eq', 'rgb(224, 224, 224)')
    cy.get('button a').should('have.css', "background-color").and('eq', 'rgb(140, 140, 140)')
  })

  it('Vérifier status false', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<RexItem id={''} name={'gpe'} status={false} />)
    cy.get('button').should('contain.text', "Terminer le projet")
    cy.get('.card').should('have.css', "background-color").and('eq', 'rgb(255, 255, 255)')
    cy.get('button a').should('have.css', "background-color").and('eq', 'rgb(2, 147, 252)')
  })

  it('Vérifier redirection button', () => {
    var id = 'test'
    // see: https://on.cypress.io/mounting-react
    cy.mount(<RexItem id={id} name={'gpe'} status={false} />)
    cy.get('button a').should('have.attr', 'href', "/rex/"+id)
  })
})