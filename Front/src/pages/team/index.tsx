'use client';
import './style.scss';
import { ButtonBase } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TeamCard from '@/app/components/Card/TeamCard';
function Team({ userData, updateUserData }: { userData: any, updateUserData: any }) {

	console.log(userData)
	return (
		<div className='teamPage'>
			<div className='header'>
				<h1>Mes équipes</h1>
				<ButtonBase >
					<AddIcon
						fontSize='medium'
						sx={{ color: '#000000' }}
					/>
				</ButtonBase>
			</div>
			<hr style={{ marginLeft: 0 }} />
			<div className='teams_container'>
				{userData.team.length > 0 ?
					userData.team.map((item: any) => (
						<TeamCard name={item.team.name} key={item.team.id} />
					))
					: null}
			</div>
		</div>
	);
}

export default Team;
