import {
	Avatar,
	Box,
	Button,
	IconButton,
	Input,
	Modal,
	TextField,
} from '@mui/material';
import './style.scss';
import Grid from '@mui/material/Unstable_Grid2';
import CameraOutlinedIcon from '@mui/icons-material/CameraOutlined';
import { useEffect, useState } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { jwtDecode } from 'jwt-decode';
import Dashboard from '@/app/components/Dashboard/Dashboard';
import { useDispatch } from 'react-redux';
import { User } from '@/app/models/user';

export default function AccountPage({ userData, updateUserData }: { userData: any, updateUserData: any }) {

	return (
		<div className='AccountPage'>
			<div className='header'>
				<h1>Mon profil</h1>
			</div>
			<hr style={{ marginLeft: 0 }} />

			<div className='form_container'>
				<div className='form'>
					<div className='avatar_input'>
						<img src="/assets/avatar.png" alt="" />
					</div>
					<div className='second_input'>
						<p>Prénom</p>
						<input type="text" />
					</div>
					<div className='second_input'>
						<p>Nom de famille</p>
						<input type="text" />
					</div>
					<div className='second_input'>
						<p>Email</p>
						<input type="text" />
					</div>
					<div className='second_input'>
						<p>Téléphone</p>
						<input type="text" />
					</div>
					<div className='second_input'>
						<p>Biographie</p>
						<input type="text" />
					</div>
				</div>

			</div>
		</div>
	);
}
