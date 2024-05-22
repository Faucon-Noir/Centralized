import { Grid, IconButton } from '@mui/material';
import DriveFileMoveOutlinedIcon from '@mui/icons-material/DriveFileMoveOutlined';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { TaskItemProps } from './type';
import { iconSectionStyle } from './style';
import { chipVariant, urgenceIdToString, numberToColorTicket, numberToColorTicketBorder } from '@/app/helpers';
import "./style.scss"
function TaskItem({ id, title, urgenceLevel, date, status, onOpen, onArchive, onRedirect }: TaskItemProps) {
    let formatedDate: string = ''
    formatedDate = new Date(date).toLocaleDateString();
    return (

        <div className='card' style={{ backgroundColor: numberToColorTicket(urgenceLevel), border: `2px solid ${numberToColorTicketBorder(urgenceLevel)}` }}>
            <h2>Niveau d&apos;urgence : {chipVariant(urgenceLevel)}</h2>
            <h3 >{title}</h3>
            {status == "résolu" ? <p>Le ticket est résolu</p> : <p>Le ticket est actuellement en cours</p>}
            <p>{formatedDate}</p>
            <Grid xs={4} sx={iconSectionStyle}>
                <IconButton onClick={onArchive}>
                    {/* Cloturer un ticket */}
                    <CheckCircleOutlineOutlinedIcon />
                </IconButton>
                <IconButton onClick={onRedirect}>
                    {/* Allez au projet associé */}
                    <DriveFileMoveOutlinedIcon />
                </IconButton>
                {/* On doit ouvrir la modal sur l'icone' */}
                <IconButton onClick={onOpen}>
                    {/* Editer le ticket */}
                    <ModeOutlinedIcon />
                </IconButton>
            </Grid>
        </div>

    );
}

export default TaskItem;