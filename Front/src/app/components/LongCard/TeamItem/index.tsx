import { Avatar, IconButton, Typography } from '@mui/material';
import { TeamListItemProps } from './type';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import axios from 'axios';

function TeamItem({ id, avatar, name, onOpen, onDelete }: TeamListItemProps) {
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
