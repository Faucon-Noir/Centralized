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
		<div className='memberTeamCard'>
			<Avatar
				id='avatar'
				src={'/media/'+avatar}
				sx={{ height: '100px', width: '100px' }}
			/>
			<Typography
				id='name'
				style={{ fontSize: '18px', fontWeight: '700' }}
			>
				{`${firstName} ${lastName}`}
			</Typography>
		</div>
	);
}
