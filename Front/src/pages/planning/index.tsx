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
import { useCallback, useState, useEffect } from 'react';
import { useRouter } from "next/router";
import { ButtonNewTicketCy, CalendarCy } from './const';


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

	useEffect(() => {
		let displayTicket: any = [];
		let idx = 0;

		for (let project of userData.project) {
			if (project.ticket != undefined && project.ticket.ticket != undefined && project.ticket.error == undefined) {
				for (let line of project.ticket.ticket) {
					let shouldAddTicket = true;  // On part du principe qu'on va ajouter le ticket
					let newStart = new Date(line.start_date);
					let newEnd = new Date(line.end_date);

					// On vérifie le ticket par rapport à tous les tickets déjà ajoutés dans displayTicket
					for (let existingTicket of displayTicket) {
						const existingStart = existingTicket.start;
						const existingEnd = existingTicket.end;

						// Cas 1 : Si le ticket actuel est totalement contenu dans un autre ticket, on le saute
						if (newStart >= existingStart && newEnd <= existingEnd) {
							shouldAddTicket = false;
							break; // On sort de la boucle car ce ticket ne doit pas être ajouté
						}

						// Cas 2 : Si le ticket chevauche le début d'un autre, on ajuste la date de début
						if (newStart <= existingEnd && newEnd > existingEnd) {
							newStart = new Date(existingEnd); // Ajuster le début
						}

						// Cas 3 : Si le ticket chevauche la fin d'un autre, on ajuste la date de fin
						if (newEnd >= existingStart && newStart < existingStart) {
							newEnd = existingStart;
						}
					}

					// Ajouter le ticket si shouldAddTicket est toujours vrai
					if (shouldAddTicket) {
						displayTicket.push({
							id: idx,
							start: newStart,
							end: newEnd,
							title: project.name
						});
						idx++;
					}
				}
			}
		}

		console.log(displayTicket);
		setMyList(displayTicket);
	}, [userData]);

	function handleRedirect(e: any) {
		e.preventDefault();
		router.push('/ticket/create');
	};

	const eventStyleGetter = () => {
		var style = {
			backgroundColor: "black"
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
					<hr style={{ marginLeft: 0 }} />

					<div className="affichage_bouton">
						<button data-cy={ButtonNewTicketCy} className="cree_ticket_bouton" onClick={(e) => handleRedirect(e)}>
							Nouveau Ticket
						</button>
					</div>
				</div>
				<div data-cy={CalendarCy} className='Calendar'>
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
