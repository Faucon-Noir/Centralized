import './style.scss';
import FolderIcon from '@mui/icons-material/Folder';
import { Icon } from '@mui/material';
import { numberToColor } from '@/app/helpers';
import Link from 'next/link'

export default function MyProjectCard({ project, userData, updateUserData }: { project: any, userData: any, updateUserData: any }) {
    function addSelectedProject() {
        let selectedP = localStorage.getItem("selectedP");
        if (selectedP != null) {
            let selectedPArr = selectedP.split(",");
            for (let line of selectedPArr) {
                if (line == project.id) {
                    return
                }
            }
            localStorage.setItem("selectedP", selectedP + "," + project.id);
        }
        else localStorage.setItem("selectedP", project.id);

        updateUserData({ ...userData, selectedProjects: [...userData.selectedProjects, project.id] })
    }
    console.log(project)
    return (
        <>
            <div className='project_card' onClick={() => addSelectedProject()}>
                <div className='title_card'>
                    <Icon sx={{ color: numberToColor(project?.color), height: '35px', width: '35px' }}><FolderIcon fontSize='large' /></Icon>
                    <p className='title'>{project?.name}</p>
                </div>
                <div className='ticket_card'>
                    <p>Nombre de tickets</p>
                    <div className='ticket_nbr_container'>
                        <p className='ticket_nbr'><strong>{project?.ticket?.count}</strong></p>
                        <img src="/assets/icons/tickets.svg" alt="" />
                    </div>
                </div>
                <p>Fin du projet le : <strong>{project?.end_date?.substring(0, 10)}</strong></p>
                <Link href={"/specification/" + project?.id} style={{ backgroundColor: numberToColor(project?.color) }}>Voir les cachier des charges</Link>
            </div>
        </>
    );
}
