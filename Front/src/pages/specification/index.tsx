import './style.scss';
import { useEffect, useState } from 'react';
import { ButtonBase } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MyProjectCard from '@/app/components/Card/MyProjectCard';

function Specification({ userData, updateUserData }: { userData: any, updateUserData: any }) {
	const [openedP, setOpenedP] = useState<any[]>([]);
	const [closedP, setClosedP] = useState<any[]>([]);

	useEffect(() => {
		let opened_tmp = [];
		let closed_tmp = [];
		for (let line of userData.project) {
			if (new Date().toISOString() > line.end_date) {
				closed_tmp.push(line);
			} else {
				opened_tmp.push(line)
			}
		}
		setOpenedP(opened_tmp);
		setClosedP(closed_tmp);
	}, [userData.project])

	return (
		<>
			<div className='specification_wrapper'>
				<div className='specification_title'>
					<div className='specification_title_cross'>
						<h1>Mes Projets</h1>
						<ButtonBase href='/specification/create'>
							<AddIcon
								fontSize='medium'
								sx={{ color: '#000000' }}
							/>
						</ButtonBase>
					</div>
					<hr style={{ marginLeft: 0 }} />
				</div>
				<div className='specification_container'>
					<div className='opened_container'>
						<h2>Projets en cours</h2>
						<div className='card_container'>
							{openedP.length > 0 ?
								openedP.map((item: any) => (
									<MyProjectCard key={item.key} project={item} updateUserData={updateUserData} userData={userData} />
								))
								: null}
						</div>
					</div>
					<div className='closed_container'>
						<h2>Projets terminés</h2>
						<div className='card_container'>
							{closedP.length > 0 ?
								closedP.map((item: any) => (
									<MyProjectCard key={item.key} project={item} updateUserData={updateUserData} userData={userData} />
								))
								: null}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Specification;
