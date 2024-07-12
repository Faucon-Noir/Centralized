import Grid from '@mui/material/Unstable_Grid2';
import { Box, Button, IconButton, Modal, TextField } from '@mui/material';
import {
	ModalContentStyle,
	SaveButtonStyle,
	UnderTitleBoxStyle,
	inputStyle,
} from './style';
import { urgenceIdToString } from '@/app/helpers';
import { useEffect, useState } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import Dashboard from '@/app/components/Dashboard/Dashboard';
import './style.scss';
import TaskItem from '@/app/components/LongCard/TaskItem';
import { AppDispatch, useTypedSelector } from '@/app/store';
import { useDispatch } from 'react-redux';
import {
	getAllTicketByProjectId,
	resolveTicketById,
	updateTicketById,
} from '@/app/store/slices/ticketSlice';
import { UpdateTicket } from '@/app/models/ticket';

export default function Tickets() {
	const router = useRouter();

	const dispatch: AppDispatch = useDispatch();
	const tickets = useTypedSelector((state) => state.ticket.AllTickets);

	const [open, setOpen] = useState<boolean>(false);
	// const [tickets, setTickets] = useState<TicketType[]>([]);
	const [selectedTaskId, setSelectedTaskId] = useState<any>(null);
	const [ticketDetails, setTicketDetails] = useState<UpdateTicket>({});
	const selected = tickets.find((ticket) => ticket.id === selectedTaskId);

	const options: any = [];
	let project_id: string = '';
	for (let id = 0; id <= 4; id++) {
		options.push(
			<option key={id} value={id}>
				{urgenceIdToString(id)}
			</option>
		);
	}

	const statusList: any[] = [];
	const statusOptions: string[] = [
		'ouvert',
		'en cours',
		'en attente',
		'annulé',
		'résolu',
		'rejeté',
		'en revue',
	];
	for (let i: number = 0; i < statusOptions.length; i++) {
		statusList.push(
			<option key={i} value={statusOptions[i]}>
				{statusOptions[i]}
			</option>
		);
	}
	const handleToSpecification = (id: string) => {
		router.push(`/specification/${id}`);
	};
	const handleArchive = (id: string) => {
		dispatch(resolveTicketById(id));
	};
	const handleOpen = (taskId: number) => {
		setSelectedTaskId(taskId);
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const handleSave = () => {
		setTicketDetails({
			...ticketDetails,
			id: selectedTaskId,
		});

		try {
			dispatch(updateTicketById(ticketDetails)).then((res) => {
				if (res.meta.requestStatus === 'fulfilled') {
					try {
						dispatch(getAllTicketByProjectId(project_id)).then(
							(res: any) => {
								setTicketDetails({}); // Reset ticketDetails
							}
						);
					} catch (error) {
						console.log(error);
					}
				}
			});
		} catch (error) {
			console.log(error);
		}
		setOpen(false);
	};

	useEffect(() => {
		dispatch(getAllTicketByProjectId(project_id));
	}, [dispatch, project_id]);

	return (
		<>
			<Grid container>
				<Grid xs={2}>
					<Dashboard page='ticket' />
				</Grid>
				<Grid xs={9}>
					<div className='ticket_container'>
						<div
							className='header'
							style={{
								width: '100%',
								marginTop: '100px',
								marginLeft: '20px',
							}}
						>
							<h1>Mes tickets</h1>
							<Button href='/ticket/create'>
								<AddIcon
									fontSize='medium'
									sx={{ color: '#000000' }}
								/>
							</Button>
							{/* TODO: Développer des filtres par niveau de criticité */}
							{/* Créer un tri par ordre de criticité ? => A voir */}
						</div>
						<div className='card_container'>
							{tickets.map((ticket: any) => (
								<>
									<TaskItem
										id={ticket.ticket_id}
										title={ticket.ticket_title}
										urgenceLevel={ticket.ticket_urgenceId}
										date={ticket.ticket_start_date}
										status={ticket.ticket_status}
										onOpen={() =>
											handleOpen(ticket.ticket_id)
										}
										onArchive={() =>
											handleArchive(ticket.ticket_id)
										}
										onRedirect={() =>
											handleToSpecification(
												ticket.projectId
											)
										}
									/>
								</>
							))}
						</div>
					</div>
				</Grid>
				<Modal open={open}>
					<Box sx={ModalContentStyle}>
						<IconButton
							onClick={handleClose}
							style={{ position: 'absolute', top: 10, right: 10 }}
						>
							<CloseOutlinedIcon />
						</IconButton>
						{/* Titre du ticket */}
						<TextField
							autoFocus
							defaultValue={selected?.title}
							onChange={(event) =>
								setTicketDetails({
									...ticketDetails,
									title: event.target.value,
								})
							}
							sx={{ margin: '20px' }}
						/>
						<Box sx={UnderTitleBoxStyle}>
							{/* Niveau d'urgence du ticket */}
							{/* Liste déroulante pour le niveau d'urgence du ticket */}
							Urgence:{' '}
							<select
								style={inputStyle}
								defaultValue={selected?.urgenceId}
								onChange={(e) =>
									setTicketDetails({
										...ticketDetails,
										urgenceId: parseInt(e.target.value),
									})
								}
							>
								{options}
							</select>
							{/* Status du ticket */}
							{/* Liste déroulante pour le statut */}
							Status:{' '}
							<select
								style={inputStyle}
								defaultValue={selected?.status}
								onChange={(e) =>
									setTicketDetails({
										...ticketDetails,
										status: e.target.value,
									})
								}
							>
								{statusList}
							</select>
							{/* Date de création du ticket */}
							Posté le:
							<input
								style={inputStyle}
								defaultValue={selected?.start_date}
								type='date'
								onChange={(e) =>
									setTicketDetails({
										...ticketDetails,
										start_date: e.target.value,
									})
								}
							/>
							{/* Date de fin du ticket */}
							Terminé le:
							<input
								style={inputStyle}
								defaultValue={selected?.end_date}
								type='date'
								onChange={(e) =>
									setTicketDetails({
										...ticketDetails,
										end_date: e.target.value,
									})
								}
							/>
						</Box>
						{/* Description du ticket */}
						<Box sx={{ margin: '20px', width: '100%' }}>
							Description: <br />
							<TextField
								multiline
								fullWidth
								defaultValue={selected?.description}
								onChange={(e) =>
									setTicketDetails({
										...ticketDetails,
										description: e.target.value,
									})
								}
								sx={{ minWidth: '500px' }}
							/>
						</Box>
						<Button
							variant='contained'
							onClick={handleSave}
							sx={SaveButtonStyle}
						>
							Sauvegarder
						</Button>
					</Box>
				</Modal>
			</Grid>
		</>
	);
}
