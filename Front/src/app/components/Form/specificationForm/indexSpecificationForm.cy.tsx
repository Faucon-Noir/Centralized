import React from 'react'
import SpecificationForm from './index'

describe('<SpecificationForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SpecificationForm />)
  })
})