/* eslint-disable react-hooks/rules-of-hooks */
import './style.scss'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import fr from "date-fns/locale/fr";
import 'swiper/css/pagination';
import { SwiperSlide } from 'swiper/react';
import ProjetCardPlanning from '@/app/components/Card/ProjectCardPlanning';
import CustomSwiperPlanning from '@/app/components/Swiper/customSwiperPlanning';
import { useCallback, useState, useEffect } from 'react';
import { numberToColor } from "@/app/helpers";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useRouter } from "next/router";


const messages = {
	allDay: "Tous les jours",
	previous: "Précédent",
	next: "Suivant",
	today: "Aujourd'hui",
	month: "Mois",
	week: "Semaine",
	day: "Jour",
	agenda: "Agenda",
	date: "Date",
	time: "Heure",
	event: "Evenement",
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

const CustomToolbar = ({ label, onNavigate, onView }: { label: string, onNavigate: any, onView: any }) => {
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
		<div className="rbc-toolbar">
			<span className="rbc-btn-group">
				<button type="button" onClick={goToBack}>{messages.previous}</button>
				<button type="button" onClick={goToToday}>{messages.today}</button>
				<button type="button" onClick={goToNext}>{messages.next}</button>
			</span>
			<span className="rbc-toolbar-label">{label}</span>
			<span className="rbc-btn-group">
				<button type="button" onClick={() => changeView('month')}>{messages.month}</button>
				<button type="button" onClick={() => changeView('week')}>{messages.week}</button>
				<button type="button" onClick={() => changeView('day')}>{messages.day}</button>
			</span>
		</div>
	);
};

export default function Planning({ userData, updateUserData }: { userData: any, updateUserData: any }) {
	const router = useRouter();

	const [myList, setMyList] = useState([{
		id: 0,
		start: new Date(),
		end: new Date(),
		title: ""
	}])
	const [eventColor, setEventColor] = useState('blue');

	function handleRedirect(e: any) {
		e.preventDefault();
		router.push('/ticket/create');
	};

	let handleEventSelection = useCallback((myevent: any, color: string) => {
		if (myevent != null) {
			setEventColor(color)
			let tmp_list = [];
			let i = 0;
			for (let line of myevent) {
				i++;
				tmp_list.push({
					id: i,
					start: new Date(line.start_date),
					end: new Date(line.end_date),
					title: line.title
				})
			}
			setMyList(tmp_list);
		}
		return myList
	}, [myList]);

	const eventStyleGetter = () => {
		var style = {
			backgroundColor: eventColor
		};
		return {
			style: style
		};
	}
	return (
		<>
			<div className="right_container">
				<div className="Presentation">
					<h1 className='TitrePage'>Mon Planning</h1>
					<div className="affichage_bouton">
						<button className="cree_ticket_bouton" onClick={(e) => handleRedirect(e)}>
							Nouveau Ticket
						</button>
					</div>
				</div>
				<div className="Projet">
					<div className="fleches">
						<ChevronLeftIcon className="swiper-button-prev swiper-button-prev-1 fleche" />
						<ChevronRightIcon className="swiper-button-next swiper-button-next-1 fleche" />
					</div>
					<CustomSwiperPlanning swiperId={1}>
						<div className="ProjetCards">
							{userData?.project ? userData?.project.map((item: any) => (
								<SwiperSlide key={item.id}>
									<ProjetCardPlanning
										name={item.name}
										key={item.id}
										totalTickets={item.ticket?.count ? item.ticket?.count : 0}
										id={item.id}
										color={item.color}
										onClick={() => handleEventSelection(item.ticket.ticket, numberToColor(item.color))} />
								</SwiperSlide>
							)) : null}
						</div>
					</CustomSwiperPlanning>
				</div>
				<div className='Calendar'>
					<Calendar
						culture="fr"
						messages={messages}
						localizer={localizer}
						events={myList}
						startAccessor="start"
						endAccessor="end"
						views={['month', 'week', 'day']}
						style={{ height: 650, backgroundColor: '#FFFFFF' }}
						eventPropGetter={eventStyleGetter}
						components={{ toolbar: CustomToolbar }}
					/>
				</div>
			</div>
		</>
	);
}
