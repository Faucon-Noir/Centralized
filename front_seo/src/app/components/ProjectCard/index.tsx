import Image from 'next/image';
import './style.scss';
import { ProjetCardProps } from './type';
import FolderIcon from '@mui/icons-material/Folder';
import { Icon } from '@mui/material';
import { numberToColor } from '@/app/helpers';

export default function ProjetCard({ name, totalTickets, id }: ProjetCardProps) {
    return (
        <div className="projetcard">
            <div className='projetcard-left'>
                <Icon sx={{ color: numberToColor(id), height: '35px', width: '35px', marginBottom: '10px' }}>
                    <FolderIcon fontSize='large' />
                </Icon>
                <h2>
                    {name}
                </h2>
                <p>
                    {totalTickets = !0 ? totalTickets : 0} tickets
                </p>
            </div>
        </div>
    );
}
