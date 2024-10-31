import { BoxTicketCardCy, MajTicketCardCy, NameTicketCardCy, PeriodTicketCardCy, UrgenceTicketCardCy } from './const';
import './style.scss';

export default function TicketCard({ id, title, start, end, urgence, updated_at }: { id: any, title: any, start: any, end: any, urgence: 0 | 1 | 2 | 3 | 4, updated_at: Date }) {
    let urgenceValue = {
        1: "Faible",
        2: "Moyenne",
        3: "Haute",
        4: "Très Haute",
        0: "Inconnu"
    }
    let urgenceColor = {
        1: "#8BC729",
        2: "#0083E1",
        3: "orange",
        4: "red",
        0: "gray"
    }
    const date1 = new Date();
    const date2 = new Date(updated_at);
    let lastUpdate = Number(date1) - Number(date2)
    const millisecondsInOneDay = 1000 * 60 * 60 * 24;
    const differenceInDays = lastUpdate / millisecondsInOneDay;
    return (
        <>
            <div data-cy={BoxTicketCardCy} className='card' style={{ borderLeft: "7px solid " + urgenceColor[urgence] }}>
                <h3 data-cy={NameTicketCardCy}>{title}</h3>
                <div>
                    <p data-cy={PeriodTicketCardCy}>{start.substring(0, 10)} - {end.substring(0, 10)}</p>
                    <p data-cy={UrgenceTicketCardCy}>Urgence : {urgenceValue[urgence]}</p>
                </div>
                <p data-cy={MajTicketCardCy} className='card_date'>Dernier maj : <strong>il y a {differenceInDays.toString().split(".")[0]} jours</strong></p>
            </div>
        </>
    )
}
