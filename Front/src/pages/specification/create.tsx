'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import './style.scss'
import { FormSpecification, templateList } from '@/app/constant'
import { Button, Grid, Radio, RadioGroup, Tooltip } from '@mui/material'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import Dashboard from '@/app/components/Dashboard/Dashboard'
import confetti from 'canvas-confetti'
import { Mosaic } from 'react-loading-indicators'
import { ProjectType, TeamType } from './type'

export default function CreateSpecification() {
	const router = useRouter()
	const [isRunning, setIsRunning] = useState<boolean>(false)
	const [team, setTeam] = useState<TeamType[]>([])
	const [fileContents, setFileContents] = useState<string[]>([])
	const [load, setLoad] = useState<boolean>(false)
	const [Loading, setLoading] = useState<boolean>(false)
	const [Loading1, setLoading1] = useState<boolean>(false)
	const [project, setProject] = useState<ProjectType>({
		team: '',
		user: '',
		name: '',
		description: '',
		functionality: '',
		forecast: '',
		start_date: '',
		end_date: '',
		budget: '',
		technology: '',
		constraints: '',
		validation: '',
		team_user: '',
		constraint: '',
		template: 0,
		status: false,
	})
	const [isError, setIsError] = useState<number>(0)
	const keys = [
		'name',
		'description',
		'functionality',
		'forecast',
		'start_date',
		'end_date',
		'budget',
		'technology',
		'constraints',
		'validation',
		'team',
		'team_user',
		'template',
	]

	function verificationTicket() {
		for (let i = 0; i < keys.length; i++) {
			const value = project[keys[i]]
			if (value === undefined || String(value).trim() === '') {
				return i + 1
			}
		}
		return 0
	}

	async function handleSubmit(e: any) {
		e.preventDefault()
		if (!load) {
			setLoad(true)
			//TODO verifier si on passer autrement que par une variable intermediaire pour bloquer les validations directs
			let statusError: number = verificationTicket()
			setIsError(statusError)

			if (statusError == 0) {
				const token: any = localStorage.getItem('token')
				axios
					.post(
						`http://localhost:8000/api/project/${project.team}/${project.user}`,
						project,
						{ headers: { Authorization: `Bearer ${token}` } }
					)
					.then(function (response) {
						if (response.status === 200 && response.data.success) {
							setLoading(true)
							setTimeout(() => {
								setLoading(false)
								setLoading1(true)
								setTimeout(() => {
									setLoading1(false)
									for (let index = 0; index < 20; index++) {
										confetti({
											origin: {
												x: Math.random() - 0.1,
												y: Math.random() - 0.1,
											},
										})
										setTimeout(() => {
											router.push('/specification')
										}, 1000)
									}
								}, 60000)
							}, 60000)
						} else if (response.data && response.data.error) {
							//TODO
							setIsError(keys.length + 1)
						} else {
							setIsRunning(true)
						}
					})
					.catch(function (error) {
						console.log(error)
						setIsError(keys.length + 1)
					})
			}
			setLoad(false)
		}
	}

	if (typeof window !== 'undefined') {
		const isAuth: boolean = !!localStorage.getItem('token')
		let user_id: string = ''
		if (isAuth) {
			const token: any = localStorage.getItem('token')
			const decodeToken: any = jwtDecode(token)
			user_id = decodeToken['id']

			useEffect(() => {
				setProject({ ...project, user: user_id })
				try {
					axios
						.get(
							`http://localhost:8000/api/teamuser/user/${user_id}`,
							{
								headers: { Authorization: `Bearer ${token}` },
							}
						)
						.then((res: any) => {
							setTeam(res.data)
						})
				} catch (error) {
					console.log(error)
				}
			}, [token, user_id])
		} else {
			router.push('/login')
		}
	}

	console.log('project', project)
	return (
		<>
			<Grid container>
				{Loading || Loading1 ? (
					<>
						<div className='darker_background'></div>
						<div className='loading_modal'>
							<h1>Génération en cours</h1>
							<Mosaic
								color='#0293FC'
								size='medium'
								speedPlus={-1}
								easing='ease-in-out'
							/>
							<div className='modal_text'>
								<p style={{ fontSize: '16px' }}>
									Création de votre cahier des charges
								</p>
								{Loading && (
									<p style={{ color: '#0293FC' }}>
										Temps d&apos;attente estimé : 2 minutes
									</p>
								)}
								{Loading1 && (
									<p style={{ color: '#0293FC' }}>
										Temps d&apos;attente estimé : 1 minute
									</p>
								)}
								{Loading1 && (
									<p style={{ color: '#0293FC' }}>
										Qu&apos;est-ce que ça peut être long une
										minute
									</p>
								)}
							</div>
						</div>
					</>
				) : null}
				<Grid xs={2}>
					<Dashboard />
				</Grid>
				<Grid xs={10}>
					<form>
						<div className='box'>
							<h1 className='title'>Nouveau projet</h1>
							<div className='form_container'>
								{FormSpecification.map((item) => (
									<>
										{item.type == 'textarea' ? (
											// Si le form est un textarea
											<>
												<div className='input_form'>
													<label htmlFor={item.name}>
														{item.label}
													</label>
													<textarea
														id={item.name}
														name={item.name}
														required
														placeholder={
															item.placeholder
														}
														onChange={(e) =>
															setProject({
																...project,
																[item.name as string]:
																	e.target.value.trim(),
															})
														}
													/>
													{isError == item.idError ? (
														<p className='error_message'>
															{item.NameError}
														</p>
													) : (
														''
													)}
												</div>
											</>
										) : item.type == 'text' ? (
											// Si le form est un simple texte
											<>
												<div className='input_form'>
													<label htmlFor={item.name}>
														{item.label}
													</label>
													<input
														type='text'
														id={item.name}
														name={item.name}
														required
														placeholder={
															item.placeholder
														}
														onChange={(e) =>
															setProject({
																...project,
																[item.name as string]:
																	e.target.value.trim(),
															})
														}
													/>
													{isError == item.idError ? (
														<p className='error_message'>
															{item.NameError}
														</p>
													) : (
														''
													)}
												</div>
											</>
										) : item.type == 'date' ? (
											// Si le form est un groupe de date
											<>
												<div className='box_date'>
													{item.input.map((item) => (
														<>
															<div className='input_date'>
																<label
																	htmlFor={
																		item.name
																	}
																>
																	{item.label}
																</label>
																<input
																	type='date'
																	id={
																		item.name
																	}
																	name={
																		item.name
																	}
																	required
																	onChange={(
																		e
																	) =>
																		setProject(
																			{
																				...project,
																				[item.name as string]:
																					e
																						.target
																						.value,
																			}
																		)
																	}
																/>
																{isError ==
																item.idError ? (
																	<p className='error_message'>
																		{
																			item.NameError
																		}
																	</p>
																) : (
																	''
																)}
															</div>
														</>
													))}
												</div>
											</>
										) : item.type == 'select' ? (
											// Si le form est un select (gestion des équipes)
											<div className='input_form'>
												<label htmlFor={item.name}>
													{item.label}
												</label>
												<select
													name={item.name}
													id={item.name}
													required
													onChange={(e) =>
														setProject({
															...project,
															[item.name as string]:
																e.target.value,
														})
													}
												>
													<option value=''>
														--Please choose an
														option--
													</option>
													{team && item.name == 'team'
														? team.map(
																(item: any) => (
																	<option
																		key={
																			item
																				.team
																				.id
																		}
																		value={
																			item
																				.team
																				.id
																		}
																	>
																		{
																			item
																				.team
																				.name
																		}
																	</option>
																)
															)
														: null}
												</select>
												{isError == item.idError ? (
													<p className='error_message'>
														{item.NameError}
													</p>
												) : (
													''
												)}
											</div>
										) : item.type == 'buttonGroup' ? (
											// Si le form est un groupe de bouton
											<div className='input_form'>
												<label htmlFor={item.name}>
													{item.label}
												</label>
												<div
													style={{
														display: 'flex',
														flexWrap: 'wrap',
														justifyContent:
															'space-between',
													}}
												>
													{Array.from(
														{ length: 4 },
														(_, i) => (
															<div
																key={i}
																style={{
																	width: '50%',
																}}
															>
																<Tooltip
																	key={i}
																	title={
																		templateList[
																			i
																		]
																			? templateList[
																					i
																				]
																					.text
																			: 'No text available'
																	}
																	arrow
																>
																	<Button
																		variant={
																			project.template ==
																			i +
																				1
																				? 'outlined'
																				: 'text'
																		}
																		size='small'
																		onClick={() =>
																			setProject(
																				{
																					...project,
																					[item.name as string]:
																						i +
																						1,
																				}
																			)
																		}
																	>
																		Template{' '}
																		{i + 1}
																	</Button>
																</Tooltip>
															</div>
														)
													)}
												</div>
												{isError == item.idError ? (
													<p className='error_message'>
														{item.NameError}
													</p>
												) : (
													''
												)}
											</div>
										) : null}
									</>
								))}
								<div className='btn_container'>
									<button
										type='submit'
										disabled={load}
										onClick={(e) => handleSubmit(e)}
									>
										Générer
									</button>
								</div>
							</div>

							{isError == keys.length + 1 ? (
								<p className='error_message'>
									Une erreur est survenue
								</p>
							) : (
								''
							)}
						</div>
						{/* A dev, pour remplacer le select des templates */}
					</form>
				</Grid>
			</Grid>
		</>
	)
}
