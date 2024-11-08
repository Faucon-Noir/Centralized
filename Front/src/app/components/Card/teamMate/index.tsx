import { Avatar, Box, Typography } from '@mui/material';
import { TeamMateCardProps } from './type';
import { gradeToString } from '@/app/helpers';
import './style.scss';

export default function TeamMateCard({
	avatar,
	firstName,
	lastName,
	grade,
	bio,
}: TeamMateCardProps) {
	return (
		<>
			<div className='card_user'>
				<div className='card-header yellow'>
					<img
						src={'/media/' + avatar}
						alt='avatar'
						className='avatar'
						onError={(e) => {
							e.currentTarget.src = '/assets/avatar_team.png';
						}}
					></img>
				</div>
				<div className='card-body'>
					<h2 className='user-name'>{`${firstName} ${lastName}`}</h2>
					<div className='card-footer'>
						<div className='user-info'>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
