import Image from 'next/image';
import './style.css';
import { RexCardProps } from './type';
import { ButtonBase, Icon } from '@mui/material';
import ArchiveIcon from '@mui/icons-material/Archive';
import { numberToColor } from '@/app/helpers';

function ProjetCard({ answer1, answer2, answer3, name }: RexCardProps) {
    return (
        <>
        {name?
        <div className="rexCard">
            <div className='enteterexcard'>
                <div className='titrerexcard'>
                    <Icon sx={{ color: numberToColor(1), height: '35px', width: '35px' }}>
                        <ArchiveIcon fontSize='large' />
                    </Icon>
                    <h2>{name ? name : ""}</h2>
                </div>
                <ButtonBase><Image height={20} width={20} alt="" src="/assets/arrow-narrow-right.svg"></Image></ButtonBase>
            </div>
            <div>
                <ul className='listerexcard'>
                    <li>{answer1 ? answer1 : "Lorem ipsum dolor sit amet, "}</li>
                    <li>{answer2 ? answer2 : "consectetur adipiscing elit, sed do eiusmod "}</li>
                    <li>{answer3 ? answer3 : "tempor incididunt ut labore et dolore magna aliqua. "}</li>
                </ul>
            </div>
        </div>
        :<></>}
        </>
    );
}
export default ProjetCard;