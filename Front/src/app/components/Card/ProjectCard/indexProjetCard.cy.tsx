import React from 'react'
import ProjetCard from './index'

describe('<ProjetCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ProjetCard
      name={"test"}
      totalTickets={"115"}
      key={"fre"}
      id={"tf"}
      projectId={"fevrf"}
      updateUserData={{
        project: [{
          rex: [],
          ticket: []
        }],
        team: [],
        user: [],
        specification: [],
        selectedProjects: []
      }}
      userData={{user: {
    avatar: "",
    bio: "",
    created_at: "",
    firstname: "",
    id: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    token: ""
},
project: [{
    id: "",
    rex: [],
    ticket: {
        ticket: [],
        count: 0
    }
}],
team: [{}],
specification: [{}],
selectedProjects: [],
stat: {
    nbrAllTicket: 0,
    nbrTicketByUser: [{ userName: "", nbr_ticket: 0 }],
    nbrTicket: 0,
    nbrTicketPerWeek: { week: [""], nbr_ticket: [0] },
    error: false
}}}
  />)
  })
})