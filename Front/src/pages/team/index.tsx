'use client';
import AddIcon from '@mui/icons-material/Add';
import './style.css';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LongCard from '@/app/components/LongCard';
import TeamItem from '@/app/components/LongCard/TeamItem';
import { Grid, Button, Modal, TextField, IconButton, Box } from '@mui/material';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { ModalContentStyle } from './style';
import useData from './hook';
import Dashboard from '@/app/components/Dashboard/Dashboard';
import './style.scss';
import { TeamType } from './type';
import { useTypedSelector } from '@/app/store';

function ListTeam() {
	const [open, setOpen] = useState<boolean>(false);
	const [teamList, setTeamList] = useState<TeamType[]>([]);
	const [selectedTeamId, setSelectedTeamId] = useState<string>('');
	const [addUser, setAddUser] = useState<string>('');
	const [team, setTeam] = useState<TeamType>({
		id: '',
		name: '',
		avatar: null,
		users: [],
		created_at: '',
	});
	const { handleFileChange, /*handleEditSubmit,*/ VisuallyHiddenInput } =
		useData(setTeam, team, selectedTeamId, addUser);
	let selected: any = {};

	let token: string | null;
	if (typeof window !== 'undefined') {
		token = localStorage.getItem("token");
	} else {
		token = null
	}
	const handleOpen = (teamId: string) => {
		let user_id = '';
		if (token != null) {
			const decodeToken: any = jwtDecode(token);
			user_id = decodeToken['id'];
		}
		setSelectedTeamId(teamId);

		teamList.forEach((element: any) => {
			if (element.team.id == teamId) {
				selected = element;
			}
		});
		// TODO: Mettre à jour l'appel api pour utiliser le dispatch (cf l'index.tsx à la racine de pages/)
		axios
			.get(`http://localhost:8000/api/teamuser/${teamId}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((res) => {
				setTeam({
					...team,
					name: selected.team.name,
					users: res.data.map((user: any) => user),
					id: selected.team.id,
				});
			});
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		let user_id = '';
		const decodeToken: any = jwtDecode(token ?? '');
		user_id = decodeToken['id'];
		try {
			axios
				.get(`http://localhost:8000/api/teamuser/user/${user_id}`, {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then((res) => {
					setTeamList(res.data);
				});
		} catch (error) {
			console.log(error);
		}
	}, [token]);

	// Multer Edit
	async function handleEditSubmit(e: any) {
		e.preventDefault();
		const mail_array = addUser.split(/,\s?/);

		const formData = new FormData();
		Object.keys(team).forEach((key) => {
			formData.append(key, team[key]);
		});
		axios
			.patch(`http://localhost:8000/api/team/${team.id}`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				},
			})
			.catch(function (error) {
				console.log('error', error);
				alert('Une erreur est survenue');
			});
		if (mail_array.length > 1) {
			for (let index: number = 0; index < mail_array.length; index++) {
				axios
					.post(
						`http://localhost:8000/api/teamuser`,
						{
							mail: mail_array[index],
							team: selectedTeamId,
						},
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					)
					.then(function (res) {
						window.location.reload();
					})
					.catch(function (error) {
						console.log('error', error);
						alert('Une erreur est survenue');
					});
			}
		}
	}

	return (
		// TODO: Repasser sur les projets pour afficher les valeurs par défaut et ajouter la sélection des projets disponibles non attribués
		<Grid container>
			<Grid xs={2} id='Drawer'>
				<Dashboard page='team' />
			</Grid>
			<Grid xs={9}>
				<div
					style={{
						width: '100%',
						marginTop: '100px',
						marginLeft: '50px',
					}}
				>
					<h1 style={{ color: '#0293FC' }}>Mes équipes</h1>
					<Button href='/team/create'>
						<AddIcon fontSize='medium' />
					</Button>
					{teamList.map((item: any) => (
						<LongCard key={item.id}>
							<TeamItem
								key={item.team.id}
								id={item.team.id}
								avatar={item.team.avatar}
								name={item.team.name}
								onOpen={() => handleOpen(item.team.id)}
							/>
						</LongCard>
					))}
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
					<h1 className='title'>Modifier mon équipe</h1>

					<TextField
						autoFocus
						label="Nom de l'équipe"
						sx={{
							backgroundColor: '#eceeee',
							width: '100%',
							margin: '5px',
						}}
						value={team.name}
						onChange={(e) => {
							if (e.target.value.trim() === '') {
							} else {
								setTeam({ ...team, name: e.target.value });
							}
						}}
					/>

					<TextField
						sx={{ backgroundColor: '#eceeee', width: '100%' }}
						label='Ajouter des membres via leurs email'
						placeholder='monemail@gmail.com, sonemail@gmail.com, leursemail@gmail.com'
						onChange={(a) => {
							setAddUser(a.target.value);
						}}
					/>
					<Button
						sx={{
							backgroundColor: '#0293FC',
							borderRadius: '10px',
							padding: '10px',
							color: 'white',
							minWidth: '200px',
							margin: '5px',
						}}
						component='label'
						role={undefined}
						variant='contained'
						startIcon={<CloudUploadIcon />}
					>
						Upload avatar
						<VisuallyHiddenInput
							type='file'
							onChange={handleFileChange}
						/>
					</Button>
					<button
						type='submit'
						className='button'
						onClick={(e) => handleEditSubmit(e)}
						style={{ margin: '5px' }}
					>
						Modifier
					</button>
				</Box>
			</Modal>
		</Grid>
	);
}

export default ListTeam;
