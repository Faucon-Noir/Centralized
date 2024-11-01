import React from 'react'
import RexCard from './index'
/* eslint-disable react/no-children-prop */
describe('RexCard', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react

      cy.mount(<RexCard answer1={"Votre dernier projet n'a pas de rex"} answer2={"Continuer et vous y arriverez"} answer3={"Croyez en vous"} color={2} name={"REX"} />)
  })

  it('Verifier 1er reponse', () => {
    var reponse = "Votre dernier projet n'a pas de rex"
    // see: https://on.cypress.io/mounting-react
      cy.mount(<RexCard answer1={reponse} answer2={"Continuer et vous y arriverez"} answer3={"Croyez en vous"} color={2} name={"REX"} />)
      cy.get('.listerexcard li').eq(0).should('contain.text', reponse)
  })

  it('Verifier 2eme reponse', () => {
    var reponse = "Continuer et vous y arriverez"
    // see: https://on.cypress.io/mounting-react
      cy.mount(<RexCard answer1={"Votre dernier projet n'a pas de rex"} answer2={reponse} answer3={"Croyez en vous"} color={2} name={"REX"} />)
      cy.get('.listerexcard li').eq(1).should('contain.text', reponse)
  })

  it('Verifier 3eme reponse', () => {
    var reponse = "Croyez en vous"
    // see: https://on.cypress.io/mounting-react
      cy.mount(<RexCard answer1={"Votre dernier projet n'a pas de rex"} answer2={"Continuer et vous y arriverez"} answer3={reponse} color={2} name={"REX"} />)
      cy.get('.listerexcard li').eq(2).should('contain.text', reponse)
  })

  it('Verifier titre', () => {
    var titre = "REX"
    // see: https://on.cypress.io/mounting-react
      cy.mount(<RexCard answer1={"Votre dernier projet n'a pas de rex"} answer2={"Continuer et vous y arriverez"} answer3={"Croyez en vous"} color={2} name={titre} />)
      cy.get('h2').should('contain.text', titre)
  })

  it('Verifier couleur', () => {
    var couleur = 2
    // see: https://on.cypress.io/mounting-react
      cy.mount(<RexCard answer1={"Votre dernier projet n'a pas de rex"} answer2={"Continuer et vous y arriverez"} answer3={"Croyez en vous"} color={couleur} name={"REX"} />)
      cy.get('#icon').should('have.css', "color").and('eq', 'rgb(139, 199, 41)')
  })
})