import { Avatar, IconButton, Typography } from '@mui/material';
import { TeamListItemProps } from './type';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import axios from 'axios';
import { useTypedSelector } from '@/app/store';

function TeamItem({ id, avatar, name, onOpen, onDelete }: TeamListItemProps) {
	const token = useTypedSelector((state) => state.auth.token);
	onDelete = () => {
		console.log('id', id);
		axios
			.delete(`http://localhost:8000/api/team/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(function (response) {
				console.log(response);
				if (response.status === 200) {
					console.log('deleted', id);
					console.log('response', response.data);
					window.location.reload();
				}
			})
			.catch(function (error) {
				console.log('error', error);
				alert('Une erreur est survenue');
			});
	};
	return (
		<>
			<Avatar
				src={`/media/${avatar}`}
				style={{ height: '75px', width: '75px' }}
			/>
			<Typography>{name}</Typography>
			<div
				style={{
					display: 'flex',
					justifyContent: 'flex-end',
					alignItems: 'center',
					marginLeft: 'auto',
				}}
			>
				<IconButton onClick={onDelete}>
					<DeleteOutlineOutlinedIcon />
				</IconButton>
				<IconButton onClick={onOpen}>
					<ModeOutlinedIcon />
				</IconButton>
				<IconButton href={`/team/${id}`}>
					<ChevronRightOutlinedIcon />
				</IconButton>
			</div>
		</>
	);
}

export default TeamItem;
