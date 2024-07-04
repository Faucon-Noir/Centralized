import Grid from '@mui/material/Unstable_Grid2'
import { Box, Button, IconButton, Modal, TextField } from '@mui/material'
import {
	ModalContentStyle,
	SaveButtonStyle,
	UnderTitleBoxStyle,
	inputStyle,
} from './style'
import { urgenceIdToString } from '@/app/helpers'
import { useEffect, useState } from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import AddIcon from '@mui/icons-material/Add'
import { useRouter } from 'next/router'
import Dashboard from '@/app/components/Dashboard/Dashboard'
import confetti from 'canvas-confetti'
import './style.scss'
import TaskItem from '@/app/components/LongCard/TaskItem'
import { TicketProps, TicketType } from './type'

export default function Tickets() {
	const router = useRouter()
	const [open, setOpen] = useState<boolean>(false)
	const [tickets, setTickets] = useState<TicketType[]>([])
	const [selectedTaskId, setSelectedTaskId] = useState<any>(null)
	const [ticketDetails, setTicketDetails] = useState<TicketProps>({})
	const selected: TicketType | undefined = tickets.find(
		(ticket: TicketType) => ticket.ticket_id === selectedTaskId
	)

	const options: any = []
	let project_id: string = ''
	for (let id = 0; id <= 4; id++) {
		options.push(
			<option key={id} value={id}>
				{urgenceIdToString(id)}
			</option>
		)
	}

	const statusList: any[] = []
	const statusOptions: string[] = [
		'ouvert',
		'en cours',
		'en attente',
		'annulé',
		'résolu',
		'rejeté',
		'en revue',
	]
	for (let i: number = 0; i < statusOptions.length; i++) {
		statusList.push(
			<option key={i} value={statusOptions[i]}>
				{statusOptions[i]}
			</option>
		)
	}
	const handleToSpecification = (id: string) => {
		router.push(`/specification/${id}`)
	}
	const handleArchive = (id: string) => {
		const token: any = localStorage.getItem('token')
		axios
			.patch(
				`http://localhost:8000/api/ticket/${id}`,
				{ status: 'résolu' },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			)
			.then((res) => {
				if (res.status === 200) {
					for (let index = 0; index < 20; index++) {
						confetti({
							origin: {
								x: Math.random() - 0.1,
								y: Math.random() - 0.1,
							},
						})
						setTimeout(() => {
							window.location.reload()
						}, 2000)
					}
				}
			})
	}
	const handleOpen = (taskId: number) => {
		setSelectedTaskId(taskId)
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
	}
	let user_id = ''
	const handleSave = () => {
		// TODO: Appel api avant de fermer l'éditeur pour refresh la liste des tickets
		const token: any = localStorage.getItem('token')
		const decodeToken: any = jwtDecode(token)
		user_id = decodeToken['id']
		try {
			axios
				.patch(
					`http://localhost:8000/api/ticket/${selectedTaskId}`,
					ticketDetails,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				)
				.then((res) => {
					if (res.status === 200) {
						try {
							axios
								.get(
									`http://localhost:8000/api/ticket/project/${project_id}`,
									{
										headers: {
											Authorization: `Bearer ${token}`,
										},
									}
								)
								.then((res: any) => {
									setTickets(res.data)
									setTicketDetails({}) // Reset ticketDetails
								})
						} catch (error) {
							console.log(error)
						}
					}
				})
		} catch (error) {
			console.log(error)
		}
		setOpen(false)
	}

	if (typeof window !== 'undefined') {
		const isAuth: boolean = !!localStorage.getItem('token')
		let user_id: string = ''
		if (isAuth) {
			const token: any = localStorage.getItem('token')
			const decodeToken: any = jwtDecode(token)
			user_id = decodeToken['id']
			const isSelected: boolean =
				!!localStorage.getItem('SelectedProject')
			if (isSelected) {
				project_id = localStorage.getItem('SelectedProject') ?? ''
			} else {
				router.push('/')
			}
			useEffect(() => {
				try {
					axios
						.get(
							`http://localhost:8000/api/ticket/project/${project_id}`,
							{
								headers: { Authorization: `Bearer ${token}` },
							}
						)
						.then((res) => {
							if (!res.data.error) {
								setTickets(res.data)
							}
						})
				} catch (error) {
					console.log(error)
				}
			}, [token, user_id])
		}
	}
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
							defaultValue={selected?.ticket_title}
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
								defaultValue={selected?.ticket_urgenceId}
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
								defaultValue={selected?.ticket_status}
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
								defaultValue={selected?.ticket_start_date}
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
								defaultValue={selected?.ticket_end_date}
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
								defaultValue={selected?.ticket_description}
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
	)
}
