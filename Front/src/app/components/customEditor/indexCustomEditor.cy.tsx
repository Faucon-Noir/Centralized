import React from 'react'
import CustomEditor from './index'
/* eslint-disable react/no-children-prop */

describe('<CustomEditor />', () => {
  it('renders', () => {
    var texte = 'Ceci est un très long texte'
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CustomEditor content={texte} onChange={function (text: string): void {
      throw new Error('Function not implemented.');
    } } />)
  })

  it('Verifier texte', () => {
    var texte = 'Ceci est un très long texte'
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CustomEditor content={texte} onChange={function (text: string): void {
      throw new Error('Function not implemented.');
    } } />)
    cy.get('textarea').should('contain.text', texte)
  })

  //Faire texte si on ajoute du texte
})
