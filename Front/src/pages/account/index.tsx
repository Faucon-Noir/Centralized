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
import CameraOutlinedIcon from '@mui/icons-material/CameraOutlined';
import { useEffect, useState } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import {
	AvartarImageCy,
	BioFielCy,
	BioLabelCy,
	EmailFielCy,
	EmailLabelCy,
	FirstNameFielCy,
	FirstNameLabelCy,
	LastNameFielCy,
	LastNameLabelCy,
	PhoneFielCy,
	PhoneLabelCy,
	SaveButtonCy,
} from '@/app/const/account/const';

export default function AccountPage({
	userData,
	updateUserData,
}: {
	userData: any;
	updateUserData: any;
}) {
	const ModalContentStyle = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		backgroundColor: 'white',
		padding: '30px',
		borderRadius: '10px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	};
	const [user, setUser] = useState({
		id: '',
		avatar: {},
		lastname: '',
		firstname: '',
		mail: '',
		phone: '',
		bio: '',
		password: '',
	});
	const [open, setOpen] = useState<boolean>(false);
	const [avatarPreview, setAvatarPreview] = useState<string>('');
	let user_id: string = '';

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file: File | undefined = event.target.files?.[0];
		if (file) {
			const allowedTypes: string[] = ['image/png', 'image/jpeg'];
			const maxSize: number = 2 * 1024 * 1024; // 2Mo
			if (allowedTypes.includes(file.type) && file.size <= maxSize) {
				setUser({ ...user, avatar: file });
				setAvatarPreview(URL.createObjectURL(file));
				setOpen(false);
			} else {
				alert(
					'Le fichier doit être une image de type png ou jpeg et ne doit pas dépasser 2Mo'
				);
			}
		} else {
			console.log('No file selected');
		}
	};

	const handleUpdate = (
		e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
	) => {
		e.preventDefault();
		user_id = decodeToken['id'];

		const formData = new FormData();
		Object.keys(user).forEach((key) => {
			const value = user[key as keyof typeof user];
			if (value !== undefined) {
				formData.append(key, value as string); // Ajoute un casting si nécessaire pour FormData
			}
		});
		axios
			.patch(`http://localhost:8000/api/user/${user_id}`, formData, {
				headers: {
					Authorization: `Bearer ${userData.user.token}`,
					'Content-Type': 'multipart/form-data',
				},
			})
			.then(function (response) {
				window.location.reload();
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const token: any = localStorage.getItem('token');
	const decodeToken: any = jwtDecode(token);
	user_id = decodeToken['id'];
	useEffect(() => {
		try {
			axios
				.get(`http://localhost:8000/api/user/${userData.user.id}`, {
					headers: { Authorization: `Bearer ${userData.user.token}` },
				})
				.then((res) => {
					setUser(res.data);
				});
		} catch (error) {
			console.log('error', error);
		}
	}, [userData]);

	return (
		<>
			<div className='accent' />
			<div style={{ display: 'block' }}>
				<div
					data-cy={AvartarImageCy}
					className='profile-photo'
					style={{ position: 'relative' }}
				>
					<Avatar
						src={avatarPreview || `/media/${user.avatar}`}
						sx={{ height: '100%', width: '100%' }}
					/>
					<div id='inner' className='inner' onClick={handleClickOpen}>
						<CameraOutlinedIcon sx={{ fontSize: '30px' }} />
					</div>
					<Modal open={open}>
						<Box sx={ModalContentStyle}>
							<IconButton
								onClick={handleClose}
								style={{
									position: 'absolute',
									top: 10,
									right: 10,
								}}
							>
								<CloseOutlinedIcon />
							</IconButton>
							<Input type='file' onChange={handleFileChange} />
						</Box>
					</Modal>
				</div>
			</div>

			<form>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						flexGrow: 1,
					}}
				>
					<label data-cy={FirstNameLabelCy} htmlFor='firstName'>
						First Name
					</label>
					<input
						data-cy={FirstNameFielCy}
						className='textField'
						placeholder={'Votre prénom'}
						value={user?.firstname ? user.firstname : ''}
						onChange={(e) =>
							setUser({ ...user, firstname: e.target.value })
						}
					/>
					<label data-cy={LastNameLabelCy} htmlFor='lastName'>
						Last Name
					</label>
					<input
						data-cy={LastNameFielCy}
						className='textField'
						placeholder={'Votre nom'}
						value={user?.lastname ? user.lastname : ''}
						onChange={(e) =>
							setUser({ ...user, lastname: e.target.value })
						}
					/>
					<label data-cy={EmailLabelCy} htmlFor='email'>
						Email
					</label>
					<input
						data-cy={EmailFielCy}
						className='textField'
						placeholder={'Votre adresse mail'}
						value={user?.mail ? user.mail : ''}
						onChange={(e) =>
							setUser({ ...user, mail: e.target.value })
						}
					/>
					<label data-cy={PhoneLabelCy} htmlFor='phone'>
						Phone
					</label>
					<input
						data-cy={PhoneFielCy}
						className='textField'
						placeholder={'Votre numéro de téléphone'}
						value={user?.phone ? user.phone : ''}
						onChange={(e) =>
							setUser({ ...user, phone: e.target.value })
						}
					/>
					<label data-cy={BioLabelCy} htmlFor='bio'>
						Bio
					</label>
					<input
						data-cy={BioFielCy}
						className='textField'
						placeholder={'Une courte description de vous-même'}
						value={user?.bio && user.bio !== "null" ? user.bio : ''}
						onChange={(e) =>
							setUser({ ...user, bio: e.target.value })
						}
					/>
				</Box>

				<Button
					data-cy={SaveButtonCy}
					disabled={!user}
					className='cta-primary'
					type='submit'
					onClick={(e) => handleUpdate(e)}
				>
					Sauvegarder
				</Button>
			</form>
		</>
	);
}
