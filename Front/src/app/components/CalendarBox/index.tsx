import { Divider } from '@mui/material';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './style.scss';
import { CalendarBoxProps } from './type';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { numberToColor, urgenceIdToString } from "@/app/helpers";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function CalendarBox({ name, start_date, end_date, description, color }: any) {
    const [value, onChange] = useState<Value>(new Date());
    let startDateString: any;
    let endDateString: any;
    let formatted_start_date = start_date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' });
    let formatted_end_date = end_date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' });
    const tileClassName = ({ date, view }: any) => {
        // Vérifier si la date fait partie de la plage de dates
        const dateString = date.toISOString().slice(0, 10);

        startDateString = start_date?.toISOString().slice(0, 10);
        endDateString = end_date?.toISOString().slice(0, 10);

        // Vérifier si la date fait partie de la plage de dates
        if (view === 'month' && dateString >= startDateString && dateString <= endDateString) {
            // Si oui, retourner une classe personnalisée
            if ((date.getDay() === 0 && dateString === startDateString) || (date.getDay() === 1 && dateString === endDateString) || (dateString === startDateString && dateString === endDateString)) {
                return 'highlight-start highlight-end';
            } else if (date.getDay() === 1 || dateString === startDateString) {
                return 'highlight-start';
            } else if (date.getDay() === 0 || dateString === endDateString) {
                return 'highlight-end';
            } else {
                return 'highlight';
            }
        }
    };
    return (
        <div>
            <h2 className='planning-title'>Mon planning</h2>
            {name ?
                <div className='calendarBox'>

                    <Calendar onChange={onChange} tileClassName={tileClassName} next2Label={null} prev2Label={null} locale="fr-FR" />
                    <hr />
                    <div className='texte_calendar'>
                        <div className='titre_calendar'>
                            <h2>
                                {name ? name : "test"}
                            </h2>
                            <div className='circlemini' style={{ backgroundColor: numberToColor(color) }}>
                            </div>
                        </div>
                        <div className='flex_align'>
                            <AccessTimeOutlinedIcon />
                            <p>
                                du {formatted_start_date} au {formatted_end_date}
                            </p>
                        </div>
                        <div className='flex_align'>
                            <InsertDriveFileOutlinedIcon />
                            <p>
                                {description ? description : "test"}
                            </p>
                        </div>
                    </div>
                </div>
                : <></>}
        </div>
    )
}

export default CalendarBox;
