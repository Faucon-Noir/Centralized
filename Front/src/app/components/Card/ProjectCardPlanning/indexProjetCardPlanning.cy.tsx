import React from 'react'
import ProjetCardPlanning from './index'
/* eslint-disable react/no-children-prop */
describe('<ProjetCardPlanning />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ProjetCardPlanning name={''} id={0} totalTickets={0} color={0} onClick={function (): void {
		throw new Error('Function not implemented.')
	} } />)
  })
})