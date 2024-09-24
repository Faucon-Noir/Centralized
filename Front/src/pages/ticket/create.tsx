'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import './style.scss';
import { creationTicket } from '@/app/constant';
import { Grid, Typography } from '@mui/material';
import { urgenceIdToString } from '@/app/helpers';
import { ErrorStyle } from './style';
import Dashboard from '@/app/components/Dashboard/Dashboard';
import { useDispatch } from 'react-redux';
import { Project } from '@/app/models/project';
import { CreateTicket } from '@/app/models/ticket';

export default function CreateTicketPage() {
	// // NEW
	// const dispatch: AppDispatch = useDispatch();
	// const { userId } = useTypedSelector((state) => state.auth);
	// const projectList = useTypedSelector(
	// 	(state): Project[] => state.project.AllProjects
	// );

	// useEffect(() => {
	// 	dispatch(getAllProjectByUserId(userId));
	// });
	// const router = useRouter();
	// const [load, setLoad] = useState<boolean>(false);

	// const [ticket, setTicket] = useState<CreateTicket>({
	// 	start_date: new Date().toISOString().split('T')[0],
	// 	end_date: new Date().toISOString().split('T')[0],
	// 	planningId: '',
	// 	userId: '',
	// 	title: '',
	// 	urgenceId: -1,
	// 	description: '',
	// 	status: '',
	// });
	// const [isError, setIsError] = useState<number>(0);
	// const options: any = [];
	// for (let id: number = 0; id <= 4; id++) {
	// 	options.push(
	// 		<option key={id} value={id}>
	// 			{urgenceIdToString(id)}
	// 		</option>
	// 	);
	// }

	// function verificationTicket() {
	// 	if (ticket.title?.trim() == '') return 1;
	// 	else if (ticket.start_date?.trim() == '') return 2;
	// 	else if (ticket.end_date?.trim() == '') return 3;
	// 	else if (ticket.planningId == '') return 4;
	// 	else if (ticket.urgenceId == -1) return 5;
	// 	else if (ticket.description?.trim() == '') return 6;
	// 	else return 0;
	// }

	// async function handleSubmit(e: any) {
	// 	e.preventDefault();
	// 	if (!load) {
	// 		setLoad(true);

	// 		let statusError = verificationTicket();
	// 		setIsError(statusError);
	// 		if (statusError == 0) {
	// 			dispatch(createTicket(ticket))
	// 				.then((res) => {
	// 					if (res.meta.requestStatus === 'fulfilled')
	// 						router.push('/ticket');
	// 				})
	// 				.catch(function (error) {
	// 					console.log('error', error);
	// 					alert('Une erreur est survenue');
	// 					setIsError(7);
	// 				});
	// 		}
	// 		setLoad(false);
	// 	}
	// }

	return (
		<>
			{/* <form>
				<div className='box'>
					<h1 className='title'>Nouveau ticket</h1>
					<div className='form_container'>
						{creationTicket.map((item) => (
							<>
								{item.type == 'textarea' ? (
									// Si le form est un textarea
									<div className='input_form'>
										<label htmlFor={item.name}>
											{item.label}
										</label>
										<textarea
											id={item.name}
											name={item.name}
											required
											onChange={(e) =>
												setTicket({
													...ticket,
													[item.name as string]:
														e.target.value,
												})
											}
										/>
										{isError == item.idError ? (
											<Typography sx={ErrorStyle}>
												{item.NameError}
											</Typography>
										) : (
											''
										)}
									</div>
								) : item.type == 'text' ? (
									// Si le form est un simple texte
									<div className='input_form'>
										<label htmlFor={item.name}>
											{item.label}
										</label>
										<input
											type='text'
											id={item.name}
											name={item.name}
											required
											onChange={(e) =>
												setTicket({
													...ticket,
													[item.name as string]:
														e.target.value,
												})
											}
										/>
										{isError == item.idError ? (
											<Typography sx={ErrorStyle}>
												{item.NameError}
											</Typography>
										) : (
											''
										)}
									</div>
								) : item.type == 'date' ? (
									// Si le form est un groupe de date
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
														id={item.name}
														name={item.name}
														required
														defaultValue={
															new Date()
																.toISOString()
																.split(
																	'T'
																)[0]
														}
														onChange={(e) =>
															setTicket({
																...ticket,
																[item.name as string]:
																	e
																		.target
																		.value,
															})
														}
													/>
													{isError ==
														item.idError ? (
														<Typography
															sx={
																ErrorStyle
															}
														>
															{
																item.NameError
															}
														</Typography>
													) : (
														''
													)}
												</div>
											</>
										))}
									</div>
								) : item.type == 'select' ? (
									// Si c'est un select
									item.name == 'urgenceId' ? (
										<div className='input_form'>
											<label htmlFor={item.name}>
												{item.label}
											</label>
											<select
												name={item.name}
												id={item.name}
												required
												onChange={(e) =>
													setTicket({
														...ticket,
														[item.name as string]:
															parseInt(
																e.target
																	.value
															),
													})
												}
											>
												<option value='-1'>
													--Please choose an
													option--
												</option>
												{options}
											</select>
											{isError == item.idError ? (
												<Typography
													sx={ErrorStyle}
												>
													{item.NameError}
												</Typography>
											) : (
												''
											)}
										</div>
									) : (
										<div className='input_form'>
											<label htmlFor={item.name}>
												{item.label}
											</label>
											<select
												name={item.name}
												id={item.name}
												required
												onChange={(e) =>
													setTicket({
														...ticket,
														[item.name as string]:
															e.target
																.value,
													})
												}
											>
												<option value=''>
													--Please choose an
													option--
												</option>
												{projectList
													? projectList.map(
														(item) => (
															<option
																key={
																	item.id
																}
																value={
																	item.id
																}
															>
																{
																	item.name
																}
															</option>
														)
													)
													: null}
											</select>
											{isError == item.idError ? (
												<Typography
													sx={ErrorStyle}
												>
													{item.NameError}
												</Typography>
											) : (
												''
											)}
										</div>
									)
								) : null}
							</>
						))}
						<div className='btn_container'>
							<button
								type='submit'
								disabled={load}
								onClick={(e) => handleSubmit(e)}
							>
								Créer
							</button>
						</div>
					</div>
					{isError == 7 ? (
						<Typography sx={ErrorStyle}>
							Une erreur est survenue
						</Typography>
					) : (
						''
					)}
				</div>
			</form> */}
		</>
	);
}
