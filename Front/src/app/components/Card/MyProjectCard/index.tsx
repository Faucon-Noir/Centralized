import './style.scss';
import FolderIcon from '@mui/icons-material/Folder';
import { Icon } from '@mui/material';
import { numberToColor } from '@/app/helpers';
export default function MyProjectCard(project: any) {
    console.log(project)
    return (
        <>
            <div className='project_card'>
                <div className='title_card'>
                    <Icon sx={{ color: numberToColor(project?.project?.color), height: '35px', width: '35px' }}><FolderIcon fontSize='large' /></Icon>
                    <p className='title'>{project?.project?.name}</p>
                </div>
                <div className='ticket_card'>
                    <p>Nombre de tickets</p>
                    <div className='ticket_nbr_container'>
                        <p className='ticket_nbr'><strong>{project?.project?.ticket?.count}</strong></p>
                        <img src="/assets/icons/tickets.svg" alt="" />
                    </div>
                </div>
                <p>Fin du projet le : <strong>{project?.project?.end_date?.substring(0, 10)}</strong></p>
                <a href={"/specification/" + project?.project?.id} style={{ backgroundColor: numberToColor(project?.project?.color) }}>Voir les cachier des charges</a>
            </div>
        </>
    );
}
