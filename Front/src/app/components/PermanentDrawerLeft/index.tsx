import { Drawer, List, ListItemButton, ListItemText } from '@mui/material';
import { red } from '@mui/material/colors';
import React from 'react';
import './style.css';
import { PermanentDrawerLeftProps } from './type';
import { navItem } from '@/app/constant';
import CloseIcon from '@mui/icons-material/Close';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useRouter } from 'next/router';

export default function PermanentDrawerLeft({
	page,
}: PermanentDrawerLeftProps) {
	const router = useRouter();
	function logout() {
		localStorage.removeItem('token');
		localStorage.setItem('connected', 'false');
		router.push('/login');
	}

	return (
		<Drawer variant='permanent'>
			<img
				src='/assets/logo/WhiteLogoLeft.png'
				alt='Logo'
				className='logo'
			/>
			<List>
				{navItem(false).map((item) => (
					<ListItemButton
						key={item.id}
						href={item.url}
						className={
							page == item.alias ? 'selected' : 'no-selected'
						}
					>
						{item.icon}
						<ListItemText primary={item.name} />
					</ListItemButton>
				))}

				<ListItemButton
					sx={{ marginTop: '50px' }}
					className={page == 'profile' ? 'selected' : 'no-selected'}
					href='/account'
				>
					<PermIdentityIcon fontSize='medium' />
					<ListItemText primary='Mon Compte' />
				</ListItemButton>
				<ListItemButton className='other-button'>
					<CloseIcon />
					<ListItemText
						primary='Déconnexion'
						onClick={() => logout()}
					/>
				</ListItemButton>
			</List>
		</Drawer>
	);
}
