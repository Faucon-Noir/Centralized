import React from 'react'
import MyProjectCard from './index'

describe('<MyProjectCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<MyProjectCard key={1} project={{}} updateUserData={{}} userData={{}}/>)
  })
})