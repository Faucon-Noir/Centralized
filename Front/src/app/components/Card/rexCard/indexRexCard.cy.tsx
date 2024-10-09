import React from 'react'
import RexCard from './index'

describe('RexCard', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react

      cy.mount(<RexCard answer1={"Votre dernier projet n'a pas de rex"} answer2={"Continuer et vous y arriverez"} answer3={"Croyez en vous"} color={2} name={"REX"} />)
  })
})