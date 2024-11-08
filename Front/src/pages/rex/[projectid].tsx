/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import './style.scss';
import axios, { AxiosResponse } from 'axios';
import { ButtonBase } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
export default function Page({
	userData,
	updateUserData,
}: {
	userData: any;
	updateUserData: any;
}) {
	const router = useRouter();
	const [IsForm, setIsForm] = useState(false);
	const [myRex, setMyRex] = useState({
		rexProbleme: '',
		rexReussite: '',
		rexAmelioration: '',
		idProjet: '',
	});
	const [rex, setRex] = useState({
		answer1: '',
		answer2: '',
		answer3: '',
	});
	const [project, setProject] = useState({
		budget: '',
		constraint: '',
		description: '',
		end_date: '',
		forecast: '',
		functionality: '',
		id: '',
		name: '',
		start_date: '',
		status: false,
		team_user: '',
		technology: '',
		validation: '',
		team: '',
		user: '',
		template: '',
		constraints: '',
	});
	const [isError, setIsError] = useState<number>(0);
	const baseUrl = process.env.NEXT_PUBLIC_API_URL;

	useEffect(() => {
		for (let project of userData.project) {
			if (
				project.id ==
				new URL(window.location.href).pathname.split('/')[2]
			) {
				if (Object.keys(project?.rex).length < 1) setIsForm(true);
				setProject(project);
				setRex(project.rex);
			}
		}
	}, [userData]);
	function verificationRex() {
		if (myRex.rexReussite.trim() == '') return 1;
		else if (myRex.rexProbleme.trim() == '') return 2;
		else if (myRex.rexAmelioration.trim() == '') return 3;
		else return 0;
	}
	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		let statusError = verificationRex();
		setIsError(statusError);

		if (statusError == 0) {
			axios
				.post(
					`${baseUrl}rex`,
					{
						project: project.id,
						answer1: myRex.rexReussite.trim(),
						answer2: myRex.rexProbleme.trim(),
						answer3: myRex.rexAmelioration.trim(),
					},
					{
						headers: {
							Authorization: `Bearer ${userData.user.token}`,
						},
					}
				)
				.then(function (response: AxiosResponse<any, any>) {
					if (response.status === 200 && response.data.success) {
						window.location.reload();
					} else {
						setIsError(4);
					}
				})
				.catch(function (error: any) {
					console.log('error', error);
					setIsError(4);
				});
		}
	}

	return (
		<div>
			{IsForm ? (
				<form onSubmit={(e) => handleSubmit(e)}>
					<div className='box'>
						<h1 className='title'>Retour d&apos;Expérience</h1>

						<div className='input_form'>
							<label htmlFor='rexReussite'>
								Ce qui s&apos;est bien passé?
							</label>
							<textarea
								id='rexReussite'
								name='rexReussite'
								required
								onChange={(e) =>
									setMyRex({
										...myRex,
										rexReussite: e.target.value,
									})
								}
							/>
							{isError == 1 ? (
								<p className='error_message'>
									Veuillez écrire les points positifs trouvés{' '}
								</p>
							) : (
								''
							)}
						</div>

						<div className='input_form'>
							<label htmlFor='rexProbleme'>
								Ce qui s&apos;est mal passé?
							</label>
							<textarea
								id='rexProbleme'
								name='rexProbleme'
								required
								onChange={(e) =>
									setMyRex({
										...myRex,
										rexProbleme: e.target.value,
									})
								}
							/>
							{isError == 2 ? (
								<p className='error_message'>
									Veuillez écrire les points bloquants trouvés{' '}
								</p>
							) : (
								''
							)}
						</div>

						<div className='input_form'>
							<label htmlFor='rexAmelioration'>
								Ce qui pourrait être amélioré?
							</label>
							<textarea
								id='rexAmelioration'
								name='rexAmelioration'
								required
								onChange={(e) =>
									setMyRex({
										...myRex,
										rexAmelioration: e.target.value,
									})
								}
							/>
							{isError == 3 ? (
								<p className='error_message'>
									Veuillez écrire les points pouvant être
									améliorés{' '}
								</p>
							) : (
								''
							)}
						</div>
						{isError == 4 ? (
							<p className='error_message'>
								Une erreur est survenue
							</p>
						) : (
							''
						)}
						<button type='submit'>Cloturer le projet</button>
					</div>
				</form>
			) : (
				<div className='noRex'>
					<div className='header'>
						<h1>Retour d&apos;experience</h1>
						<ButtonBase onClick={() => setIsForm(true)}>
							<AddIcon
								fontSize='medium'
								sx={{ color: '#000000' }}
							/>
						</ButtonBase>
					</div>
					<hr style={{ marginLeft: 0 }} />
					<div className='showRex'>
						<div className='showRexProps'>
							<h3>Ce qu&apos;il c&apos;est passé ?</h3>
							<p>{rex?.answer1}</p>
						</div>
						<div className='showRexProps'>
							<h3>Ce qui s&apos;est mal passé ?</h3>
							<p>{rex?.answer2}</p>
						</div>
						<div className='showRexProps'>
							<h3>Ce qui pourrait être amélioré ?</h3>
							<p>{rex?.answer3}</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
