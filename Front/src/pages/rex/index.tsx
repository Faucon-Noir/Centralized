import Grid from '@mui/material/Unstable_Grid2';
import './style.scss';
import RexItem from '@/app/components/LongCard/RexItem';
import { useEffect } from 'react';
import Dashboard from '@/app/components/Dashboard/Dashboard';
import { AppDispatch, useTypedSelector } from '@/app/store';
import { useDispatch } from 'react-redux';
import { getAllProjectByUserId } from '@/app/store/slices/projectSlice';
import { Rex } from '@/app/models/rex';

function RexPage() {
	const dispatch: AppDispatch = useDispatch();
	const project = useTypedSelector((state): Rex[] => state.rex.AllRexs);
	const { userId } = useTypedSelector((state) => state.auth);

	useEffect(() => {
		try {
			dispatch(getAllProjectByUserId(userId));
		} catch (error) {
			console.log(error);
		}
	}, [dispatch, userId]);

	return (
		<>
			<Grid container>
				<Grid xs={2}>
					<Dashboard page='rex' />
				</Grid>
				<Grid xs={9}>
					<div className='rex_container'>
						<div
							className='header'
							style={{
								width: '100%',
								marginTop: '100px',
								marginLeft: '20px',
							}}
						>
							<h1>Projets en cours</h1>
						</div>
						<div className='card_container'>
							{project.map((item: any) => (
								<>
									<RexItem
										id={item.id}
										name={item.name}
										status={item.status}
									/>
								</>
							))}
						</div>
					</div>
				</Grid>
			</Grid>
		</>
	);
}

export default RexPage;
