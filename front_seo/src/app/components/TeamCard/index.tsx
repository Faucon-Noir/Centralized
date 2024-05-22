import './style.scss';
import { TeamCardProps } from './type';
import { Icon } from "@mui/material";
import GroupsIcon from '@mui/icons-material/Groups';


export default function TeamCard({ id, prenom }: TeamCardProps) {
    return (
        <>
            <div className="teamcard">
                <div className='first_line'>
                    <Icon sx={{ color: '#0293FC' }}>
                        <GroupsIcon />
                    </Icon>
                    <h2>{prenom}</h2>
                </div>
                <div className='second_line'>
                    <button><a href={"/team/" + id}>Voir mon Équipe</a></button>
                </div>
                {/* <h2>
                    {prenom}
                </h2>
                <p>
                    <u>Contact</u>
                </p> */}
            </div>
        </>
    )
}
