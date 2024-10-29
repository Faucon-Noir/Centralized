import React from 'react'
import GraphiqueLine from './index'
import addWeeks from 'date-fns/addWeeks/index.js';
import format from 'date-fns/format/index.js';
import startOfISOWeek from 'date-fns/startOfISOWeek/index.js';

const labels = Array.from({ length: 9 }, (_, i) =>
  format(startOfISOWeek(addWeeks(new Date(), i - 4)), 'dd/MM/yyyy')
);

describe('<GraphiqueLine />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    var nbrTicketPerWeek = { week: labels, nbr_ticket: [0,1,2,3,4,5,6,7,8] }
    cy.mount(<GraphiqueLine labels={labels}
      data={nbrTicketPerWeek.nbr_ticket}
      title="Nombre de tickets ouverts par semaine"
      hover="Nombre de tickets" />)
  })

  // On ne peut pas faire plus, chartjs retourne un canva
})