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
import { useDispatch } from 'react-redux';
import { UpdateTicket } from '@/app/models/ticket';

export default function Tickets() {
	// const router = useRouter();

	// const dispatch: AppDispatch = useDispatch();
	// const tickets = useTypedSelector((state) => state.ticket.AllTickets);

	// const [open, setOpen] = useState<boolean>(false);
	// const [selectedTaskId, setSelectedTaskId] = useState<any>(null);
	// const [ticketDetails, setTicketDetails] = useState<UpdateTicket>({});
	// const selected = tickets.find((ticket) => ticket.id === selectedTaskId);

	// const options: any = [];
	// let project_id: string = '';
	// for (let id = 0; id <= 4; id++) {
	// 	options.push(
	// 		<option key={id} value={id}>
	// 			{urgenceIdToString(id)}
	// 		</option>
	// 	);
	// }

	// const statusList: any[] = [];
	// const statusOptions: string[] = [
	// 	'ouvert',
	// 	'en cours',
	// 	'en attente',
	// 	'annulé',
	// 	'résolu',
	// 	'rejeté',
	// 	'en revue',
	// ];
	// for (let i: number = 0; i < statusOptions.length; i++) {
	// 	statusList.push(
	// 		<option key={i} value={statusOptions[i]}>
	// 			{statusOptions[i]}
	// 		</option>
	// 	);
	// }
	// const handleToSpecification = (id: string) => {
	// 	router.push(`/specification/${id}`);
	// };
	// const handleArchive = (id: string) => {
	// 	dispatch(resolveTicketById(id));
	// };
	// const handleOpen = (taskId: number) => {
	// 	setSelectedTaskId(taskId);
	// 	setOpen(true);
	// };
	// const handleClose = () => {
	// 	setOpen(false);
	// };

	// const handleSave = () => {
	// 	setTicketDetails({
	// 		...ticketDetails,
	// 		id: selectedTaskId,
	// 	});

	// 	try {
	// 		dispatch(updateTicketById(ticketDetails)).then((res) => {
	// 			if (res.meta.requestStatus === 'fulfilled') {
	// 				try {
	// 					dispatch(getAllTicketByProjectId(project_id)).then(
	// 						(res: any) => {
	// 							setTicketDetails({}); // Reset ticketDetails
	// 						}
	// 					);
	// 				} catch (error) {
	// 					console.log(error);
	// 				}
	// 			}
	// 		});
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// 	setOpen(false);
	// };

	// useEffect(() => {
	// 	dispatch(getAllTicketByProjectId(project_id));
	// }, [dispatch, project_id]);

	return (
		<>
			<p>see github for the code, code deleted to build the app to test a deploy</p>
		</>
	);
}
