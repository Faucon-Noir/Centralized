import React, { useEffect, useState } from 'react';
import axios from 'axios';
import checkFilledForm from '@/utils/checkFilledForm';
import { useTask } from '../../../contexts/isReq';
import { Icon } from '@mui/material';
import { numberToColor } from '@/app/helpers';
import ArchiveIcon from '@mui/icons-material/Archive';
import './style.scss';

function RexForm({ userData, RexData, idProject, color }: any) {
	const { startTask } = useTask();
	const [myRex, setMyRex] = useState({
		rexProbleme: RexData.rexProbleme,
		rexReussite: RexData.rexReussite,
		rexAmelioration: RexData.rexAmelioration,
		isForm: RexData.isForm,
	});
	const baseUrl = process.env.NEXT_PUBLIC_API_URL;

	useEffect(() => {
		setMyRex(RexData);
	}, [userData, RexData]);
	async function handleSubmit() {
		if (await checkFilledForm(myRex)) {
			//start the request create rex
			await axios.post(
				`${baseUrl}rex`,
				{
					project: idProject,
					answer1: myRex.rexReussite.trim(),
					answer2: myRex.rexProbleme.trim(),
					answer3: myRex.rexAmelioration.trim(),
				},
				{ headers: { Authorization: `Bearer ${userData.user.token}` } }
			);
			startTask(); // Met à jour l'état global que la tâche a démarré
			window.location.reload();
		}
	}

	return (
		<>
			<div className='rexCard'>
				<div className='enteterexcard'>
					<div className='titrerexcard'>
						<Icon
							sx={{
								color: numberToColor(color),
								height: '35px',
								width: '35px',
							}}
						>
							<ArchiveIcon fontSize='large' />
						</Icon>
						<h2>Mon Rex</h2>
					</div>
				</div>
				{myRex.isForm ? (
					<form className='FormRex' onSubmit={(e) => handleSubmit()}>
						<div className='input_form'>
							<label htmlFor='rexReussite'>
								Ce qui s&apos;est bien passé?
							</label>
							<textarea
								id='rexReussite'
								name='rexReussite'
								className='textarea'
								required
								onChange={(e) =>
									setMyRex({
										...myRex,
										rexReussite: e.target.value,
									})
								}
							/>
						</div>

						<div className='input_form'>
							<label htmlFor='rexProbleme'>
								Ce qui s&apos;est mal passé?
							</label>
							<textarea
								id='rexProbleme'
								name='rexProbleme'
								className='textarea'
								required
								onChange={(e) =>
									setMyRex({
										...myRex,
										rexProbleme: e.target.value,
									})
								}
							/>
						</div>

						<div className='input_form'>
							<label htmlFor='rexAmelioration'>
								Ce qui pourrait être amélioré?
							</label>
							<textarea
								id='rexAmelioration'
								name='rexAmelioration'
								className='textarea'
								required
								onChange={(e) =>
									setMyRex({
										...myRex,
										rexAmelioration: e.target.value,
									})
								}
							/>
						</div>
						<div className='DivButtonRex'>
							<button
								className='ButtonRex'
								onClick={handleSubmit}
								disabled={
									!myRex.rexReussite ||
									!myRex.rexProbleme ||
									!myRex.rexAmelioration
								}
							>
								Générer
							</button>
						</div>
					</form>
				) : (
					<div className='showRex'>
						<div className='showRexProps'>
							<h3>Ce qu&apos;il c&apos;est bien passé ?</h3>
							<p>{myRex?.rexReussite}</p>
						</div>
						<div className='showRexProps'>
							<h3>Ce qui s&apos;est mal passé ?</h3>
							<p>{myRex?.rexProbleme}</p>
						</div>
						<div className='showRexProps'>
							<h3>Ce qui pourrait être amélioré ?</h3>
							<p>{myRex?.rexAmelioration}</p>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default RexForm;
