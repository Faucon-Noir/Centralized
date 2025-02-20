import Image from 'next/image';
import './style.css';
import { RexCardProps } from './type';
import { ButtonBase, Icon } from '@mui/material';
import ArchiveIcon from '@mui/icons-material/Archive';
import { numberToColor } from '../../../helpers';

function RexCard({ name, answer1, answer2, answer3, color }: any) {
	return (
		<>
			{name ? (
				<div className='rexCard'>
					<div className='enteterexcard'>
						<div className='titrerexcard'>
							<Icon
								id='icon'
								sx={{
									color: numberToColor(color),
									height: '35px',
									width: '35px',
								}}
							>
								<ArchiveIcon fontSize='large' />
							</Icon>
							<h2>{name ? name : ''}</h2>
						</div>
					</div>
					<div>
						<ul className='listerexcard'>
							<li>
								{answer1
									? answer1
									: 'Lorem ipsum dolor sit amet, '}
							</li>
							<li>
								{answer2
									? answer2
									: 'consectetur adipiscing elit, sed do eiusmod '}
							</li>
							<li>
								{answer3
									? answer3
									: 'tempor incididunt ut labore et dolore magna aliqua. '}
							</li>
						</ul>
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	);
}
export default RexCard;
