/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import SpecificationCard from '@/app/components/Card/SpecificationCard';
import TaskCard from '@/app/components/Card/TaskCard';
import CalendarBox from '@/app/components/CalendarBox';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import 'swiper/css';
import { SwiperSlide } from 'swiper/react';
import { ButtonBase } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import AddIcon from '@mui/icons-material/Add';
import './style.scss';
import ProjetCard from '@/app/components/Card/ProjectCard';
import 'swiper/css/pagination';
import Image from 'next/image';
import TeamCard from '@/app/components/Card/TeamCard';
import RexCard from '@/app/components/Card/rexCard';
import CustomSwiper from '@/app/components/Swiper/customSwiper';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import GraphiquePie from '@/app/components/GraphiquePie';
import GraphiqueLine from '@/app/components/GraphiqueLine';
import ProjectData from '@/utils/User/ProjectData';
import { projet } from '../../../public/faker/index';
import TeamMateCard from '@/app/components/Card/teamMate';
import RexForm from '@/app/components/Form/rexForm';
import UserData from '@/utils/User/UserData';
import { color } from '@mui/system';

export default function HomePage({ userData, updateUserData }: { userData: any, updateUserData: any }) {
	const [windowWidth, setWindowWidth] = useState<number>(0);
    const [project, setProject] = useState({
        project: {
            name: "",
            start_date: "",
            end_date: "",
            color: "",
            description: "",
            id: ""
        },
        cdc: {},
        rex: {
            rexProbleme: "",
            rexReussite: "",
            rexAmelioration: "",
            isForm: false
        },
        ticket: {
            count: 0,
            ticket: [{}]
        },
        userTeam: [{}],
        stat: {
            nbrTicketByUser: [{ userName: "", nbr_ticket: 0 }],
            nbrTicket: 0,
            nbrTicketPerWeek: { week: [""], nbr_ticket: [0] }
        },
    });

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
    useEffect(() => {
        ProjectData(new URL(window.location.href).pathname.split('/')[2], userData).then(result => {
            console.log(result);
            setProject(result)
        })
    }, [userData]);
    return (
        <>
            <div className='right_container'>
                <>
                    <div className='Presentation'>
                        <h1>{project?.project ? project.project.name : ''}</h1>
                    </div>
                    {windowWidth >= 660 ? (
                        <Grid
                            container
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '50px',
                            }}
                        >
                            {!project?.stat ? (
                                <></>
                            ) : (
                                <div className='stat'>
                                    <h2>Statistique du dernier projet</h2>
                                    <div className='text_stat'>
                                        <div>
                                            <p>Vous avez</p>
                                            <h3>{project?.stat?.nbrTicket  ? project.stat.nbrTicket : 0 }</h3>
                                            <p>tickets ouverts sur ce projet</p>
                                        </div>
                                        <div>
                                            <p>Vous avez</p>
                                            <h3>{userData?.stat?.nbrAllTicket  ? userData.stat.nbrAllTicket : 0 }</h3>
                                            <p>tickets ouverts en tout</p>
                                        </div>
                                    </div>
                                    <div className='graph_div'>
                                        {project?.stat?.nbrTicketByUser ? (
                                            <GraphiquePie
                                                labels={project.stat.nbrTicketByUser.map(
                                                    (x: {
                                                        userName: any;
                                                    }) => x.userName
                                                )}
                                                data={project.stat.nbrTicketByUser.map(
                                                    (row: {
                                                        nbr_ticket: any;
                                                    }) => row.nbr_ticket
                                                )}
                                                title='Nombre de ticket non fini par utilisateur'
                                                hover='Nombre de ticket'
                                            />
                                        ) : null}
                                        {project?.stat?.nbrTicketByUser ? (
                                            <GraphiqueLine
                                                labels={
                                                    project.stat
                                                        .nbrTicketPerWeek
                                                        .week
                                                }
                                                data={
                                                    project.stat
                                                        .nbrTicketPerWeek
                                                        .nbr_ticket
                                                }
                                                title='Nombre de tickets ouverts par semaine'
                                                hover='Nombre de tickets'
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            )}

                            <div className='BlocDouble'>
                                <div className='calendar_container'>
                                    <CalendarBox
                                        name={project.project ? project.project.name : ''}
                                        start_date={
                                            project
                                                ? new Date(
                                                    project.project.start_date
                                                )
                                                : new Date()
                                        }
                                        end_date={
                                            project
                                                ? new Date(project.project.end_date)
                                                : new Date()
                                        }
                                        description={
                                            project ? project.project.description : ''
                                        }
                                        color={project.project.color}
                                    />
                                </div>

                                <div className='DernierTicket'>
                                    <div className='entetedernierticket'>
                                        <h2>Derniers tickets</h2>
                                        <ButtonBase>
                                            <Image
                                                height={20}
                                                width={20}
                                                alt=''
                                                src='/assets/arrow-narrow-right.svg'
                                            />
                                        </ButtonBase>
                                    </div>
                                    {project.ticket.count > 0
                                        ? project.ticket.ticket
                                                .filter(
                                                    (
                                                        task: any,
                                                        idx: number
                                                    ) => idx < 3
                                                )
                                                .map((task: any) => (
                                                    <TaskCard
                                                        id={task.id}
                                                        title={task.title}
                                                        urgenceId={
                                                            task.urgence
                                                        }
                                                        date={
                                                            task.start_date
                                                        }
                                                        color={project.project.color}
                                                        key={task.id}
                                                    />
                                                ))
                                        : <> Aucun ticket n'est ouvert</>}
                                </div>
                            </div>
                            <div className='BlocDouble second_line'>
                                <div className='DernierTicket'>
                                    <h2>
                                        Derniers retours d&apos;expériences
                                    </h2>
                                    <RexForm 
                                        userData={userData} 
                                        RexData={project.rex} 
                                        idProject={project.project.id} 
                                        color={project.project.color}
                                    />
                                </div>
                            </div>
                        </Grid>
                    ) : (
                        <>
                            {!project?.stat ? (
                                <></>
                            ) : (
                                <div className='stat'>
                                    <h2>Statistique du dernier projet</h2>
                                    <div className='text_stat'>
                                        <div>
                                            <p>Vous avez</p>
                                            <h3>{project?.stat?.nbrTicket  ? project.stat.nbrTicket : 0 }</h3>
                                            <p>tickets ouverts sur ce projet</p>
                                        </div>
                                        <div>
                                            <p>Vous avez</p>
                                            <h3>{userData?.stat?.nbrAllTicket  ? userData.stat.nbrAllTicket : 0 }</h3>
                                            <p>tickets ouverts en tout</p>
                                        </div>
                                    </div>
                                    <div className='graph_div'>
                                        {project?.stat?.nbrTicketByUser ? (
                                            <GraphiquePie
                                                labels={project.stat.nbrTicketByUser.map(
                                                    (x: {
                                                        userName: any;
                                                    }) => x.userName
                                                )}
                                                data={project.stat.nbrTicketByUser.map(
                                                    (row: {
                                                        nbr_ticket: any;
                                                    }) => row.nbr_ticket
                                                )}
                                                title='Nombre de ticket non fini par utilisateur'
                                                hover='Nombre de ticket'
                                            />
                                        ) : null}
                                        {project?.stat?.nbrTicketByUser ? (
                                            <GraphiqueLine
                                                labels={
                                                    project.stat
                                                        .nbrTicketPerWeek
                                                        .week
                                                }
                                                data={
                                                    project.stat
                                                        .nbrTicketPerWeek
                                                        .nbr_ticket
                                                }
                                                title='Nombre de tickets ouverts par semaine'
                                                hover='Nombre de tickets'
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            )}
                            <div className='BlocDouble'>
                                <div className='calendar_container'>
                                    <CalendarBox
                                        name={project.project ? project.project.name : ''}
                                        start_date={
                                            project.project
                                                ? new Date(project.project.start_date)
                                                : new Date()
                                        }
                                        end_date={
                                            project.project
                                                ? new Date(project.project.end_date)
                                                : new Date()
                                        }
                                        description={
                                            project.project ? project.project.description : ''
                                        }
                                        color={project.project.color}
                                    />
                                </div>

                                <div className='DernierTicket'>
                                    <div className='entetedernierticket'>
                                        <h2>Derniers tickets</h2>
                                        <ButtonBase>
                                            <Image
                                                height={20}
                                                width={20}
                                                alt=''
                                                src='/assets/arrow-narrow-right.svg'
                                            />
                                        </ButtonBase>
                                    </div>
                                    {project.ticket.count > 0
                                        ? project.ticket.ticket
                                                .filter(
                                                    (
                                                        task: any,
                                                        idx: number
                                                    ) => idx < 3
                                                )
                                                .map((task: any) => (
                                                    <TaskCard
                                                        id={task.id}
                                                        title={task.title}
                                                        urgenceId={
                                                            task.urgence
                                                        }
                                                        date={
                                                            task.start_date
                                                        }
                                                        color={project.project.color}
                                                        key={task.id}
                                                    />
                                                ))
                                        : <> Aucun ticket n'est ouvert</>}
                                </div>
                            </div>
                            <div className='BlocDouble second_line'>
                                <div className='DernierTicket'>
                                    <h2>
                                        Derniers retours d&apos;expériences
                                    </h2>
                                    <RexForm
                                        userData={userData} 
                                        RexData={project.rex} 
                                        idProject={project.project.id} 
                                        color={project.project.color}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    <div className='MyTeam'>
                        <div className='Entete'>
                            <div className='TitleProjetCards'>
                                <h2>Membres de l'équipe</h2>
                                <ButtonBase>
                                    <AddIcon
                                        fontSize='medium'
                                        sx={{ color: '#000000' }}
                                    />
                                </ButtonBase>
                            </div>
                            <div className='fleches'>
                                <Image
                                    src='/assets/chevron-left.svg'
                                    alt=''
                                    width={20}
                                    height={20}
                                    className='swiper-button-prev swiper-button-prev-2 fleche'
                                ></Image>
                                <Image
                                    src='/assets/chevron-right.svg'
                                    alt=''
                                    width={20}
                                    height={20}
                                    className='swiper-button-next swiper-button-next-2 fleche'
                                ></Image>
                            </div>
                        </div>
                        <CustomSwiper swiperId={2}>
                            <div className='ProjetCards'>
                                {/* equipe => a récupérer depuis l'api => liste d'équipe ou détail de l'équipe ?*/}
                                {project?.userTeam
                                    ? project?.userTeam.map((item: any) => (
                                        <SwiperSlide key={item.id}>
                                            <TeamMateCard
                                                avatar={item.avatar}
                                                firstName={item.user_firstname}
                                                lastName={item.user_lastname}
                                                bio={item.user_bio}
                                                grade={0}
                                            />
                                        </SwiperSlide>
                                    ))
                                    : null}
                            </div>
                        </CustomSwiper>
                    </div>

                </>
            </div>
        </>
    );
}
