import React from 'react'
import CustomSwiper from './index'
import { SwiperSlide } from 'swiper/react'
import ProjetCard from '../../Card/ProjectCard'
import './style.scss';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

describe('CustomSwiper', () => {
  it('renders', () => {
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
            <ProjetCard
                name={"test"}
                totalTickets={42}
                key={"ghjkl"}
                id={1}
                projectId={1}
                updateUserData={{}}
                userData={{}}
            />
            <ProjetCard
                name={"test"}
                totalTickets={42}
                key={"ghjkl"}
                id={1}
                projectId={1}
                updateUserData={{}}
                userData={{}}
            />
            <ProjetCard
                name={"test"}
                totalTickets={42}
                key={"ghjkl"}
                id={1}
                projectId={1}
                updateUserData={{}}
                userData={{}}
            />
            <ProjetCard
                name={"test"}
                totalTickets={42}
                key={"ghjkl"}
                id={1}
                projectId={1}
                updateUserData={{}}
                userData={{}}
            />
            <ProjetCard
                name={"test"}
                totalTickets={42}
                key={"ghjkl"}
                id={1}
                projectId={1}
                updateUserData={{}}
                userData={{}}
            />
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
})