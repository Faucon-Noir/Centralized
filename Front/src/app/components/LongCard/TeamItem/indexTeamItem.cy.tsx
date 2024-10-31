import React from 'react'
import TeamItem from './index'
/* eslint-disable react/no-children-prop */
describe('<TeamItem />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TeamItem id={''} name={'test'} avatar='' onOpen={function (): void {
      throw new Error('Function not implemented.')
    } } />)
  })

  it('Vérifier name', () => {
    var name = 'test'
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TeamItem id={''} name={name} onOpen={function (): void {
      throw new Error('Function not implemented.')
    } } />)
    cy.get('p').should('contain.text', name)
  })

  it('Vérifier avatar', () => {
    var avatar = '../assets/avatar_team.png'
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TeamItem id={''} name={'test'} avatar={avatar} onOpen={function (): void {
      throw new Error('Function not implemented.')
    } } />)
    cy.get('img').should('have.attr', 'src', '/media/'+avatar)
  })
})