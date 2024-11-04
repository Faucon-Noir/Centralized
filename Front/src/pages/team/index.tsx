'use client';
import './style.scss';
import { ButtonBase } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TeamCard from '@/app/components/Card/TeamCard';
import { ButtonCreateTeamCy } from '@/app/const/team/teamConst';
import { useEffect, useState } from 'react';
import FirstStep from '@/app/components/Form/firstStep';
import { useRouter } from 'next/router';
function Team({ userData, updateUserData }: { userData: any, updateUserData: any }) {
	const router = useRouter();
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		let url = window.location.href
		if (url.includes("?create=true"))
			setShowModal(true);
	}, [])

	function handleCloseModal() {
		setShowModal(false);
		router.push('/team');
	}
	return (
		<div className='teamPage'>
			<div className='header'>
				<h1>Mes équipes</h1>
				<ButtonBase data-cy={ButtonCreateTeamCy} onClick={() => setShowModal(true)}>
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
						<TeamCard team={item?.team} userData={userData} key={item?.team?.id} clickable={true} />
					))
					: null}
			</div>
			{showModal ? <div className='team_modal'>
				<div className='team_main_modal'>
					<img src='/assets/icons/icon-cross.svg' alt='' className='cross' onClick={() => handleCloseModal()} />
					<FirstStep userData={userData} setUserStep={0} />
				</div>
			</div> : null}

		</div>
	);
}

export default Team;
