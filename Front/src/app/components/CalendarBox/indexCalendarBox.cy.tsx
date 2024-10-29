import React from 'react'
import CalendarBox from './index'
import dayjs from 'dayjs';
import 'dayjs/locale/fr';

dayjs.locale('fr');
describe('CalendarBox', () => {
  let today = new Date();
  let nextMonth = new Date(today.setMonth(today.getMonth() + 1));
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CalendarBox 
      name={"GPE"}
      start_date={new Date()}
      end_date={nextMonth}
    description={"Je suis une description"}
    color={1}
    />)
  });
  it('verifier Mois en cours', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CalendarBox 
    
      name={"GPE"}
      start_date={new Date()}
    end_date={nextMonth}
    description={"Je suis une description"}
    color={1}
    />);
    cy.get('.react-calendar__navigation__label__labelText').should('contain.text',dayjs().format('MMMM YYYY'))
  });
  it('verifier Mois prochains', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CalendarBox 
    
      name={"GPE"}
      start_date={new Date()}
    end_date={nextMonth}
    description={"Je suis une description"}
    color={1}
    />);
    cy.get('.react-calendar__navigation__next-button').click();
    cy.get('.react-calendar__navigation__label__labelText').should('contain.text',dayjs().add(1, 'month').format('MMMM YYYY'))
  });
  it('verifier Mois precedent', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CalendarBox 
    
      name={"GPE"}
      start_date={new Date()}
    end_date={nextMonth}
    description={"Je suis une description"}
    color={1}
    />);
    cy.get('.react-calendar__navigation__prev-button').click();
    cy.get('.react-calendar__navigation__label__labelText').should('contain.text',dayjs().subtract(1, 'month').format('MMMM YYYY'))
  });
  it('verifier couleur', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CalendarBox 
    
      name={"GPE"}
      start_date={new Date()}
    end_date={nextMonth}
    description={"Je suis une description"}
    color={1}
    />);
    cy.get('.highlight').should('have.css', 'background-color').and('eq', 'rgb(2, 147, 252)')
    cy.get('.circlemini').should('have.css', 'background-color').and('eq', 'rgb(2, 147, 252)')
  });
})