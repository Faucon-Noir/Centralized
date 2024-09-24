'use client';
import { Button, Grid, TextField } from '@mui/material';
import './style.css';
import { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import useData from './hook';
import Dashboard from '@/app/components/Dashboard/Dashboard';

function CreateTeam() {
	// const [team, setTeam] = useState<CreateTeamProps>({
	// 	avatar: null,
	// 	name: '',
	// 	users: [],
	// });
	// const [formError, setFormError] = useState<boolean>(false);
	// const [addUserCreate, setaddUserCreate] = useState<string>('');
	// const { handleFileChange, handleCreateSubmit, VisuallyHiddenInput } = useData(setTeam, team, addUserCreate);

	return (
		<>

			{/* <form>
				<div className='box'>
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
								setTeam({
									...team,
									name: e.target.value,
								});
							}
						}}
					/>

					<TextField
						sx={{
							backgroundColor: '#eceeee',
							width: '100%',
						}}
						label='Ajouter des membres via leurs email'
						placeholder='monemail@gmail.com, sonemail@gmail.com, leursemail@gmail.com'
						onChange={(e) => {
							setaddUserCreate(e.target.value);
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
						onClick={(e) => handleCreateSubmit(e)}
						disabled={formError}
					>
						Créer
					</button>
				</div>
			</form> */}
		</>
	);
}

export default CreateTeam;
