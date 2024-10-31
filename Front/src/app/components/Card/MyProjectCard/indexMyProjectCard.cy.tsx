import React from 'react'
import MyProjectCard from './index'
/* eslint-disable react/no-children-prop */
describe('MyProjectCard', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<MyProjectCard key={1} project={{color:1, id:'eguh', name:'je suis un test', ticket:{count:42}, end_date:"12/12/2002"}} updateUserData={{}} userData={{}}/>)
  })
  it('verifier couleur', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<MyProjectCard key={1} project={{color:2, id:'eguh', name:'je suis un test', ticket:{count:42}, end_date:"12/12/2002"}} updateUserData={{}} userData={{}}/>)
    cy.get('.material-icons').should('have.css', 'color').and('eq', 'rgb(139, 199, 41)')
    cy.get('a').should('have.css', 'background-color').and('eq', 'rgb(139, 199, 41)')
  })
  it('verifier titre', () => {
    // see: https://on.cypress.io/mounting-react
    var titre = 'je suis un test'
    cy.mount(<MyProjectCard key={1} project={{color:2, id:'eguh', name:titre, ticket:{count:42}, end_date:"12/12/2002"}} updateUserData={{}} userData={{}}/>)
    cy.get('.title').should('contain.text', titre)
    cy.get('.title_card').should('have.css', 'color').and('eq', 'rgb(2, 147, 252)')
  })
  it('verifier nombre ticket', () => {
    // see: https://on.cypress.io/mounting-react
    var nb_ticket = 42
    cy.mount(<MyProjectCard key={1} project={{color:2, id:'eguh', name:'je suis un test', ticket:{count:nb_ticket}, end_date:"12/12/2002"}} updateUserData={{}} userData={{}}/>)
    cy.get('.ticket_nbr').should('contain.text', nb_ticket)
  })
  it('verifier date fin', () => {
    // see: https://on.cypress.io/mounting-react
    var date = "12/12/2002"
    cy.mount(<MyProjectCard key={1} project={{color:2, id:'eguh', name:'je suis un test', ticket:{count:42}, end_date:date}} updateUserData={{}} userData={{}}/>)
    cy.get('#end_date').should('contain.text', date)
  })

  // Rajouter test si on clique sur la div, sa rajoute dans la liste des projet choisi
})