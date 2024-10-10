import React from 'react'
import TaskItem from './index'
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

describe('<TaskItem />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TaskItem id={''} title={''} urgenceLevel={1} date={''} status={''} onOpen={function (): void {
      throw new Error('Function not implemented.')
    } } onArchive={function (): void {
      throw new Error('Function not implemented.')
    } } onRedirect={function (): void {
      throw new Error('Function not implemented.')
    } } />)
  })

  it('Vérifier titre', () => {
    var titre = "gpe"
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TaskItem id={''} title={titre} urgenceLevel={1} date={''} status={''} onOpen={function (): void {
      throw new Error('Function not implemented.')
    } } onArchive={function (): void {
      throw new Error('Function not implemented.')
    } } onRedirect={function (): void {
      throw new Error('Function not implemented.')
    } } />)
    cy.get('h3').should('contain.text', titre)
  })

  it('Vérifier urgence', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TaskItem id={''} title={''} urgenceLevel={1} date={''} status={''} onOpen={function (): void {
      throw new Error('Function not implemented.')
    } } onArchive={function (): void {
      throw new Error('Function not implemented.')
    } } onRedirect={function (): void {
      throw new Error('Function not implemented.')
    } } />)
    cy.get('.card').should('have.css', "background-color").and('eq', 'rgb(103, 174, 94)')
    cy.get('.card').should('have.css', "border").and('eq', '2px solid rgb(82, 139, 75)')
    cy.get('h2 div span').should('contain.text', "Faible")
  })

  it('Vérifier date', () => {
    const date = format(new Date(), "dd/MM/yyyy", { locale: fr });
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TaskItem id={''} title={''} urgenceLevel={1} date={date} status={''} onOpen={function (): void {
      throw new Error('Function not implemented.')
    } } onArchive={function (): void {
      throw new Error('Function not implemented.')
    } } onRedirect={function (): void {
      throw new Error('Function not implemented.')
    } } />)
    cy.get('#date').should('contain.text', date)
  })

  it('Vérifier status résolu', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TaskItem id={''} title={''} urgenceLevel={1} date={''} status={'résolu'} onOpen={function (): void {
      throw new Error('Function not implemented.')
    } } onArchive={function (): void {
      throw new Error('Function not implemented.')
    } } onRedirect={function (): void {
      throw new Error('Function not implemented.')
    } } />)
    cy.get('#status').should('contain.text', "Le ticket est résolu")
  })

  it('Vérifier status non résolu', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TaskItem id={''} title={''} urgenceLevel={1} date={''} status={''} onOpen={function (): void {
      throw new Error('Function not implemented.')
    } } onArchive={function (): void {
      throw new Error('Function not implemented.')
    } } onRedirect={function (): void {
      throw new Error('Function not implemented.')
    } } />)
    cy.get('#status').should('contain.text', "Le ticket est actuellement en cours")
  })
})