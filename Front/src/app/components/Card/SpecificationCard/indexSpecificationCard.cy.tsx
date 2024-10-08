import React from 'react'
import SpecificationCard from './index'

describe('<SpecificationCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SpecificationCard id={12557}
      title={"test"}
      color={2}
      key={"8532865"}/>)
  })
})