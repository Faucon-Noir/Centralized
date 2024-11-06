/* eslint-disable react-hooks/rules-of-hooks */
import './style.scss';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format/index.js';
import parse from 'date-fns/parse/index.js';
import startOfWeek from 'date-fns/startOfWeek/index.js';
import getDay from 'date-fns/getDay/index.js';
import fr from 'date-fns/locale/fr/index.js';
import 'swiper/css/pagination';
import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import React from 'react';
import { ButtonNewTicketCy, CalendarCy } from '@/app/const/planning/const';
import { numberToColor } from '@/app/helpers';

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

export default function Planning({
	userData,
	updateUserData,
}: {
	userData: any;
	updateUserData: any;
}) {
	const router = useRouter();

	const [myList, setMyList] = useState([
		{
			id: 0,
			start: new Date(),
			end: new Date(),
			title: '',
			color: 'black',
		},
	]);

	useEffect(() => {
		let displayTicket: any = [];
		let idx = 0;
		for (let project of userData.project) {
			displayTicket.push({
				id: idx,
				start: new Date(project.start_date),
				end: new Date(project.end_date),
				title: project.name,
				color: project.color,
			});
			idx++;
		}
		setMyList(displayTicket);
	}, [userData]);

	function handleRedirect(e: any) {
		e.preventDefault();
		router.push('/ticket/create');
	}

	const eventStyleGetter = (event: any) => {
		var style = {
			backgroundColor: numberToColor(event.color) || 'black',
		};
		return {
			style: style,
		};
	};
	return (
		<>
			<div className='right_container'>
				<div className='Presentation'>
					<h1 className='TitrePage'>Mon Planning</h1>
					<hr style={{ marginLeft: 0 }} />

					<div className='affichage_bouton'>
						<button
							data-cy={ButtonNewTicketCy}
							className='cree_ticket_bouton'
							onClick={(e) => handleRedirect(e)}
						>
							Nouveau Ticket
						</button>
					</div>
				</div>
				<div data-cy={CalendarCy} className='Calendar'>
					<Calendar
						culture='fr'
						messages={messages}
						localizer={localizer}
						events={myList}
						startAccessor='start'
						endAccessor='end'
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
