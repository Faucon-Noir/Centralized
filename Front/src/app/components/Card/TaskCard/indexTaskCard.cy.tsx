import React from 'react'
import TaskCard from './index'

describe('<TaskCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TaskCard id={65}
      title={"13a59846-03ab-45da-8bbd-fffff09c5dd5"}
      urgenceId={"1"}
      date={"2024-12-12"}
      color={1}
      key={"13a59846-03ab-45da-8bbd-fffff09c5dd5"}/>)
  })
})