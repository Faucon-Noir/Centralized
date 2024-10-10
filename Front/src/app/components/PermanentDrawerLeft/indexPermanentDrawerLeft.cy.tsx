import React from 'react'
import PermanentDrawerLeft from './index'

describe('<PermanentDrawerLeft />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<PermanentDrawerLeft />)
  })
})