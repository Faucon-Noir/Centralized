import './style.scss';
import { useEffect, useState } from 'react';
import { ButtonBase } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MyProjectCard from '@/app/components/Card/ProjectCardSpecification';
import { decryptData } from '@/app/security/decrypt';

function Specification({
	userData,
	updateUserData,
}: {
	userData: any;
	updateUserData: any;
}) {
	const [openedP, setOpenedP] = useState<any[]>([]);
	const [closedP, setClosedP] = useState<any[]>([]);

	useEffect(() => {
		let opened_tmp = [];
		let closed_tmp = [];
		if (!userData.project) return;
		for (let line of userData.project) {
			const decryptedLine = {
				...line,
				name: decryptData(line.name),
				description: decryptData(line.description),
				functionality: decryptData(line.functionality),
				forecast: decryptData(line.forecast),
				budget: decryptData(line.budget),
				technology: decryptData(line.technology),
				constraints: decryptData(line.constraints),
				validation: decryptData(line.validation),
				teamRole: decryptData(line.teamRole),
			};

			if (decryptedLine.status == true) {
				closed_tmp.push(decryptedLine);
			} else {
				opened_tmp.push(decryptedLine);
			}
		}
		setOpenedP(opened_tmp);
		setClosedP(closed_tmp);
	}, [userData.project]);

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
							{openedP.length > 0
								? openedP.map((item: any) => (
										<MyProjectCard
											key={item.key}
											project={item}
											updateUserData={updateUserData}
											userData={userData}
										/>
									))
								: null}
						</div>
					</div>
					<div className='closed_container'>
						<h2>Projets terminés</h2>
						<div className='card_container'>
							{closedP.length > 0
								? closedP.map((item: any) => (
										<MyProjectCard
											key={item.key}
											project={item}
											updateUserData={updateUserData}
											userData={userData}
										/>
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
