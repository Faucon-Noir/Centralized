import React from 'react'
import GraphiquePie from './index'

describe('<GraphiquePie />', () => {
  it('renders', () => {
    var nbrTicketByUser = [{ userName: "Patrick", nbr_ticket: 5 }, { userName: "Louis", nbr_ticket: 2 }]
    // see: https://on.cypress.io/mounting-react
    cy.mount(<GraphiquePie 
      labels={nbrTicketByUser.map((x: { userName: any; }) => x.userName)}
      data={nbrTicketByUser.map((row: { nbr_ticket: any; }) => (row.nbr_ticket))}
      title='Nombre de ticket non fini par utilisateur'
      hover='Nombre de ticket'/>)
  })

    // On ne peut pas faire plus, chartjs retourne un canva
})