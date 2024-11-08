'use client';

import React, { useState } from 'react';
import './style.scss';
import axios from 'axios';
import styled from '@mui/system/styled';
import PermanentDrawerLeft from '@/app/components/PermanentDrawerLeft';
import { Button, Grid, TextField } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import router from 'next/router';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
function FirstStep({
	userData,
	setUserStep,
}: {
	userData: any;
	setUserStep: any;
}) {
	const [validEmail, setValidEmail] = useState(false);
	const VisuallyHiddenInput = styled('input')({
		clip: 'rect(0 0 0 0)',
		clipPath: 'inset(50%)',
		height: 1,
		overflow: 'hidden',
		position: 'absolute',
		bottom: 0,
		left: 0,
		whiteSpace: 'nowrap',
		width: 1,
	});
	const [team, setTeam] = useState<any>({
		name: '',
		avatar: '',
		members: '',
	});
	const baseUrl = process.env.NEXT_PUBLIC_API_URL;
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const allowedTypes = ['image/png', 'image/jpeg'];
			const maxSize = 2 * 1024 * 1024; // 2Mo
			if (allowedTypes.includes(file.type) && file.size <= maxSize) {
				setTeam({ ...team, avatar: file });
			} else {
				alert(
					'Le fichier doit être une image de type png ou jpeg et ne doit pas dépasser 2Mo'
				);
			}
		} else {
			console.log('No file selected');
		}
	};

	function validateEmail(email: any) {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	}

	async function createTeam() {
		const formData = new FormData();
		Object.keys(team).forEach((key) => {
			if (key != 'members') {
				formData.append(key, team[key]);
			}
		});

		let response = await axios.post(
			`${baseUrl}team/${userData.user.id}`,
			formData,
			{
				headers: {
					Authorization: `Bearer ${userData.user.token}`,
					'Content-Type': 'multipart/form-data',
				},
			}
		);

		if (response.status == 200) return response.data;
		else return false;
	}

	async function addMateToTeam(email: any, teamid: any) {
		console.log(email, teamid);
		let response = await axios.post(
			`${baseUrl}teamuser`,
			{ user: email, team: teamid },
			{ headers: { Authorization: `Bearer ${userData.user.token}` } }
		);
	}

	async function handleSubmit(e: any) {
		e.preventDefault();
		let isCreated = await createTeam();
		if (isCreated != false) {
			for (let mate of team.members.split(',')) {
				if (!validateEmail(mate.trim()) && mate.trim().length > 0) {
					setValidEmail(true);
				} else {
					console.log('ok');
					await addMateToTeam(mate.trim(), isCreated.team.id);
				}
			}
		}
		window.location.reload();
		// setUserStep(2)
	}
	return (
		<div className='team_form'>
			<h3>Créez votre équipe</h3>
			<div className='same_line'>
				<div className='input_grp'>
					<p>Nom de l&apos;équipe*</p>
					<input
						type='text'
						placeholder='Centralized'
						name=''
						id=''
						onChange={(e) =>
							setTeam({ ...team, name: e.target.value.trim() })
						}
					/>
				</div>
				<div className='input_grp'>
					<p>Avatar</p>
					{/* <input type="file" className="avatar_input" placeholder="Centralized" name="" id="" /> */}
					<Button
						sx={{
							backgroundColor: '#0293FC',
							borderRadius: '10px',
							padding: '5px',
							color: 'white',
							minWidth: '200px',
							margin: '5px',
							fontSize: '12px',
							fontFamily: '__myFont_834f5e',
						}}
						component='label'
						role={undefined}
						variant='contained'
						startIcon={<CloudUploadIcon />}
					>
						Ajouter une image
						<VisuallyHiddenInput
							type='file'
							onChange={(e) => handleFileChange(e)}
						/>
					</Button>
				</div>
			</div>
			<div className='second_line'>
				<div className='input_grp'>
					<p>Membres</p>
					<p style={{ fontSize: '10px' }}>
						Ajouter des membres via leurs email séparé d&apos;une
						virgule.
					</p>
					<input
						type='input'
						placeholder='aaaa@gmail.com, bbbb@gmail.com, cccc@gmail.com'
						name=''
						id=''
						onChange={(e) =>
							setTeam({ ...team, members: e.target.value.trim() })
						}
					/>
					{validEmail ? (
						<p
							style={{
								backgroundColor: '#EF9A9A',
								padding: '5px',
								color: 'white',
								borderRadius: '5px',
								marginTop: '10px',
								textAlign: 'center',
								width: '60%',
							}}
						>
							Veuillez entrer un email valide
						</p>
					) : null}
				</div>
			</div>

			<button className='next_btn' onClick={(e) => handleSubmit(e)}>
				Suivant
			</button>
		</div>
	);
}

export default FirstStep;
