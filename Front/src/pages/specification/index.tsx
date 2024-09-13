import SpecificationHomeCard from '@/app/components/Card/SpecificationHomeCard';
import Grid from '@mui/material/Unstable_Grid2';
import './style.scss';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import Dashboard from '@/app/components/Dashboard/Dashboard';
import { ButtonBase } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UserData from '@/utils/User/UserData';

function Specification() {
	const [userData, setUserData] = useState<any>({
		project: [{
			rex: [],
			ticket: []
		}],
		team: [],
		user: [],
		specification: []
	});
	useEffect(() => {
		UserData().then(result => {
			setUserData(result)
		})
	}, [])

	const [specification, setSpecification] = useState({
		id: '',
		name: '',
		color: 0,
		start_date: '',
		end_date: '',
		budget: '',
		description: '',
	});

	console.log(userData.project)
	return (
		<Box>

			<div className='specification_title'>
				<div className='specification_title_cross'>
					<h1>Mes cahiers des charges</h1>
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
				{userData.project.map((item: any) => (
					<SpecificationHomeCard
						key={item?.id}
						id={item?.id}
						name={item?.name}
						color={item?.color}
						start={item?.start_date}
						end={item?.end_date}
						budget={item?.budget}
						desc={item?.description}
					/>
				))}
			</div>
		</Box>
	);
}

export default Specification;
