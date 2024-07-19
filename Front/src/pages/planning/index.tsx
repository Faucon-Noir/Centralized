/* eslint-disable react-hooks/rules-of-hooks */
import Grid from '@mui/material/Unstable_Grid2';
import Dashboard from '@/app/components/Dashboard/Dashboard';
import './style.scss';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import fr from 'date-fns/locale/fr';
import 'swiper/css/pagination';
import { SwiperSlide } from 'swiper/react';
import ProjetCardPlanning from '@/app/components/ProjectCardPlanning';
import CustomSwiperPlanning from '@/app/components/customSwiperPlanning';
import { useCallback, useState, useEffect } from 'react';
import { numberToColor } from '@/app/helpers';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useRouter } from 'next/router';
import { ProjectViewType } from './type';
import { useTypedSelector } from '@/app/store';

const messages = {
	allDay: 'Tous les jours',
	previous: 'Précédent',
	next: 'Suivant',
	today: "Aujourd'hui",
	month: 'Mois',
	week: 'Semaine',
	day: 'Jour',
	agenda: 'Agenda',
	date: 'Date',
	time: 'Heure',
	event: 'Evenement',
};
const locales = {
	fr: fr,
};
const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales,
});

const CustomToolbar = ({
	label,
	onNavigate,
	onView,
}: {
	label: string;
	onNavigate: any;
	onView: any;
}) => {
	const goToBack = () => {
		onNavigate('PREV');
	};

	const goToNext = () => {
		onNavigate('NEXT');
	};

	const goToToday = () => {
		onNavigate('TODAY');
	};

	const changeView = (view: string) => {
		onView(view);
	};

	return (
		<div className='rbc-toolbar'>
			<span className='rbc-btn-group'>
				<button type='button' onClick={goToBack}>
					{messages.previous}
				</button>
				<button type='button' onClick={goToToday}>
					{messages.today}
				</button>
				<button type='button' onClick={goToNext}>
					{messages.next}
				</button>
			</span>
			<span className='rbc-toolbar-label'>{label}</span>
			<span className='rbc-btn-group'>
				<button type='button' onClick={() => changeView('month')}>
					{messages.month}
				</button>
				<button type='button' onClick={() => changeView('week')}>
					{messages.week}
				</button>
				<button type='button' onClick={() => changeView('day')}>
					{messages.day}
				</button>
			</span>
		</div>
	);
};

export default function Planning() {
	const router = useRouter();
	const [projectview, setProjectView] = useState<ProjectViewType[]>([]);
	const [ticketproject, setTicketProject] = useState<any>({});
	const [myList, setMyList] = useState([]);
	const [eventColor, setEventColor] = useState('');
	function handleRedirect(e: any) {
		e.preventDefault();
		router.push('/ticket/create');
	}

	const token = useTypedSelector((state) => state.auth.token);

	/**
	 * Tous les projets de l'utilisateur
	 * Tous les ticket par projet
	 */

	if (typeof window !== 'undefined') {
		const isAuth: boolean = !!localStorage.getItem('token');
		let user_id: string = '';
		var ticket_number_liste = {};
		if (isAuth) {
			const project_id = localStorage.getItem('SelectedProject');
			const decodeToken: any = jwtDecode(token ?? '');
			user_id = decodeToken['id'];

			// TO VALIDATE: avec Dorian
			useEffect(() => {
				let project_liste: any[] = [];

				//GET PROJECT OF USER
				try {
					axios
						// On appel tous les projets de l'utilisateur
						.get(
							`http://localhost:8000/api/project/user/${user_id}`,
							{
								headers: { Authorization: `Bearer ${token}` },
							}
						)
						.then((res) => {
							// On créé pour chaque projet un ticket de début et de fin coté front pour délimiter l'affichage
							// ça on garde
							res.data.forEach((element: any) => {
								let ticket_liste: any[] = [
									{
										title: 'Début Projet',
										start: new Date(element.start_date),
										end: new Date(element.start_date),
									},
									{
										title: 'Fin projet',
										start: new Date(element.end_date),
										end: new Date(element.end_date),
									},
								];
								// On doit cloturer le foreach parent ici pour récupérer uniquement les tickets du projet sélectionnés
								// On appel les tickets de chaque projet (foreach parent)
								// Voué à disparaitre vu que désormais on affiche uniquement 1 projet à la fois
								try {
									axios
										.get(
											`http://localhost:8000/api/ticket/project/${element.id}`,
											{
												headers: {
													Authorization: `Bearer ${token}`,
												},
											}
										)
										.then((res) => {
											// Liste des tickets par projet + nombre total de ticket par projet
											if (res.data) {
												ticket_number_liste = {
													...ticket_number_liste,
													[element.id]:
														res.data.length,
												};
												setTicketProject(
													ticket_number_liste
												);
												// Formatage des tickets pour affichage dans le calendrier
												Array.prototype.forEach.call(
													res.data,
													(element) => {
														ticket_liste.push({
															title: element.ticket_title,
															start: new Date(
																element.ticket_start_date
															),
															end: new Date(
																element.ticket_end_date
															),
														});
													}
												);
											}
										});
								} catch (error) {
									console.log(error);
								}
								// Chaque projet récupéré est poussé dans un tableau project_liste
								project_liste.push({
									id: element.id,
									name: element.name,
									color: element.color,
									event: ticket_liste,
									finished: false,
								});
								// Gestion de la couleur
								if (element.id == project_id) {
									let test: any = ticket_liste;
									if (test != null) {
										setEventColor(
											numberToColor(element.color)
										);
										// Défini quels tickets sont affichés (affichage des tickets du projets select)
										setMyList(test);
									}
								}
							});
						});
					// La liste des projets dispo (clickable pour définir l'affichage du planning)
					setProjectView(project_liste);
				} catch (error) {
					console.log(error);
				}
			}, [token, user_id]);
		}
	}
	let handleEventSelection = useCallback(
		(myevent: any, color: string) => {
			if (myevent != null) {
				setEventColor(color);
				setMyList(myevent);
			}
			return myList;
		},
		[myList]
	);
	const eventStyleGetter = () => {
		var style = {
			backgroundColor: eventColor,
		};
		return {
			style: style,
		};
	};

	return (
		<>
			<Grid container>
				<Grid xs={2}>
					<Dashboard page='planning' />
				</Grid>
				<Grid xs={10}>
					<div className='right_container'>
						<div className='Presentation'>
							<h1 className='TitrePage'>Mon Planning</h1>
							<div className='affichage_bouton'>
								<button
									className='cree_ticket_bouton'
									onClick={(e) => handleRedirect(e)}
								>
									Nouveau Ticket
								</button>
							</div>
						</div>
						<div className='Projet'>
							<div className='fleches'>
								<ChevronLeftIcon className='swiper-button-prev swiper-button-prev-1 fleche' />
								<ChevronRightIcon className='swiper-button-next swiper-button-next-1 fleche' />
							</div>
							<CustomSwiperPlanning swiperId={1}>
								<div className='ProjetCards'>
									{projectview
										? projectview.map((item: any) => (
												<SwiperSlide key={item.id}>
													<ProjetCardPlanning
														name={item.name}
														key={item.id}
														totalTickets={
															ticketproject[
																item.id
															]
																? ticketproject[
																		item.id
																	]
																: 0
														}
														id={item.id}
														color={item.color}
														onClick={() =>
															handleEventSelection(
																item.event,
																numberToColor(
																	item.color
																)
															)
														}
													/>
												</SwiperSlide>
											))
										: null}
								</div>
							</CustomSwiperPlanning>
						</div>
						<div className='Calendar'>
							<Calendar
								culture='fr'
								messages={messages}
								localizer={localizer}
								events={myList}
								startAccessor='start'
								endAccessor='end'
								views={['month', 'week', 'day']}
								style={{
									height: 650,
									backgroundColor: '#FFFFFF',
								}}
								eventPropGetter={eventStyleGetter}
								components={{ toolbar: CustomToolbar }}
							/>
						</div>
					</div>
				</Grid>
			</Grid>
		</>
	);
}
