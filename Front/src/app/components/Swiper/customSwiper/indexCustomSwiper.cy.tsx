import React from 'react'
import CustomSwiper from './index'
import { SwiperSlide } from 'swiper/react'
import ProjetCard from '../../Card/ProjectCard'
import './style.scss';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

describe('CustomSwiper', () => {
  it('renders', () => {
    cy.viewport(1920, 1080);
    // see: https://on.cypress.io/mounting-react
    cy.mount(<div>
      <div className='Entete'>
        <div className='TitleProjetCards'>
          <h2>Mes projets</h2>
       </div>
        <div className='fleches'>
            <ChevronLeftIcon className='swiper-button-prev swiper-button-prev-1 fleche' />
            <ChevronRightIcon className='swiper-button-next swiper-button-next-1 fleche' />
        </div>
    </div>
      <CustomSwiper swiperId={1}>
      <div className='ProjetCards'>
        <SwiperSlide key={"vn,;"}>
            <ProjetCard
                name={"test"}
                totalTickets={42}
                key={"ghjkl"}
                id={1}
                projectId={1}
                updateUserData={{}}
                userData={{}}
            />
        </SwiperSlide>
        <SwiperSlide key={"vn,;"}>
            <ProjetCard
                name={"test"}
                totalTickets={42}
                key={"ghjkl"}
                id={1}
                projectId={1}
                updateUserData={{}}
                userData={{}}
            />
        </SwiperSlide>
        <SwiperSlide key={"vn,;"}>
            <ProjetCard
                name={"test"}
                totalTickets={42}
                key={"ghjkl"}
                id={1}
                projectId={1}
                updateUserData={{}}
                userData={{}}
            />
        </SwiperSlide>
        <SwiperSlide key={"vn,;"}>
            <ProjetCard
                name={"test"}
                totalTickets={42}
                key={"ghjkl"}
                id={1}
                projectId={1}
                updateUserData={{}}
                userData={{}}
            />
        </SwiperSlide>
        <SwiperSlide key={"vn,;"}>
            <ProjetCard
                name={"test"}
                totalTickets={42}
                key={"ghjkl"}
                id={1}
                projectId={1}
                updateUserData={{}}
                userData={{}}
            />
        </SwiperSlide>
        <SwiperSlide key={"vn,;"}>
            <ProjetCard
                name={"test"}
                totalTickets={42}
                key={"ghjkl"}
                id={1}
                projectId={1}
                updateUserData={{}}
                userData={{}}
            />
        </SwiperSlide>
      </div>
  </CustomSwiper>
    </div>
    )
  })

  it('Verifier fleches', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<div>
      <div className='Entete'>
        <div className='TitleProjetCards'>
          <h2>Mes projets</h2>
       </div>
        <div className='fleches'>
            <ChevronLeftIcon className='swiper-button-prev swiper-button-prev-1 fleche' />
            <ChevronRightIcon className='swiper-button-next swiper-button-next-1 fleche' />
        </div>
    </div>
      <CustomSwiper swiperId={1}>
      <div className='ProjetCards'>
        <SwiperSlide key={"vn,;"}>
            <ProjetCard
                name={"1er"}
                totalTickets={42}
                key={"ghjkl"}
                id={1}
                projectId={1}
                updateUserData={{}}
                userData={{}}
            />
        </SwiperSlide>
        <SwiperSlide key={"vn,;"}>
            <ProjetCard
                name={"2eme"}
                totalTickets={42}
                key={"ghjkl"}
                id={1}
                projectId={1}
                updateUserData={{}}
                userData={{}}
            />
        </SwiperSlide>
      </div>
  </CustomSwiper>
    </div>
    )
    cy.get('.swiper-button-prev-1').should('have.css', 'color').and('eq', 'rgb(128, 128, 128)');
    cy.get('.swiper-button-next-1').click();
    cy.get('.swiper-button-next-1').should('have.css', 'color').and('eq', 'rgb(128, 128, 128)');
    cy.get('.swiper-button-prev-1').click();
    cy.get('.swiper-button-prev-1').should('have.css', 'color').and('eq', 'rgb(128, 128, 128)');
  })

  it('Verifier Card', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<div>
      <div className='Entete'>
        <div className='TitleProjetCards'>
          <h2>Mes projets</h2>
       </div>
        <div className='fleches'>
            <ChevronLeftIcon className='swiper-button-prev swiper-button-prev-1 fleche' />
            <ChevronRightIcon className='swiper-button-next swiper-button-next-1 fleche' />
        </div>
    </div>
      <CustomSwiper swiperId={1}>
      <div className='ProjetCards'>
        <SwiperSlide key={"1"}>
            <ProjetCard
                name={"1er"}
                totalTickets={43}
                key={"1"}
                id={1}
                projectId={1}
                updateUserData={{}}
                userData={{}}
            />
        </SwiperSlide>
        <SwiperSlide key={"2"}>
            <ProjetCard
                name={"2eme"}
                totalTickets={42}
                key={"2"}
                id={1}
                projectId={1}
                updateUserData={{}}
                userData={{}}
            />
        </SwiperSlide>
      </div>
  </CustomSwiper>
    </div>
    )
    cy.get('.swiper-slide-active').should('contain.text', '1er');
    cy.get('.swiper-button-next-1').click();
    cy.get('.swiper-slide-active').should('contain.text', '2eme');
    cy.get('.swiper-button-prev-1').click();
    cy.get('.swiper-slide-active').should('contain.text', '1er');
  })
})