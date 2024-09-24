import './style.scss';
import { ProjetCardPlanningProps } from './type';
import { Icon } from '@mui/material';
import { numberToColor } from '@/app/helpers';
import FolderIcon from '@mui/icons-material/Folder';
import { useRouter } from 'next/router';


export default function ProjetCardPlanning({ name, id, totalTickets, color, onClick }: ProjetCardPlanningProps) {
    const router = useRouter();

    function SelectProject() {
        localStorage.setItem("SelectedProject", `${id}`);
    }
    return (
        <div onClick={() => SelectProject()}>
            <div className="ProjetCardPlanning" onClick={onClick}>
                <Icon sx={{ color: numberToColor(color), height: '35px', width: '35px', marginBottom: '10px' }}>
                    <FolderIcon fontSize='large' />
                </Icon>
                <h2 className='NameProjet'>
                    {name}
                </h2>
                <p>
                    {totalTickets = !0 ? totalTickets : 0} tickets restants
                </p>
            </div>
        </div>

    );
}