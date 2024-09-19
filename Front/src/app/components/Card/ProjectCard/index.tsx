import Image from 'next/image';
import './style.scss';
import FolderIcon from '@mui/icons-material/Folder';
import { Icon } from '@mui/material';
import { numberToColor } from '@/app/helpers';

export default function ProjetCard({ name, totalTickets, id, projectId, updateUserData, userData }: { name: any, totalTickets: any, id: any, projectId: any, updateUserData: any, userData: any }) {
	function addSelectedProject() {
		let selectedP = localStorage.getItem("selectedP");
		if (selectedP != null) {
			let selectedPArr = selectedP.split(",");
			for (let line of selectedPArr) {
				if (line == projectId) {
					return
				}
			}
			localStorage.setItem("selectedP", selectedP + "," + projectId);
		}
		else localStorage.setItem("selectedP", projectId);

		updateUserData({ ...userData, selectedProjects: [...userData.selectedProjects, projectId] })
	}
	return (
		<div className='projetcard' onClick={() => addSelectedProject()}>
			<div className='projetcard-left'>
				<Icon
					sx={{
						color: numberToColor(id),
						height: '35px',
						width: '35px',
						marginBottom: '10px',
					}}
				>
					<FolderIcon fontSize='large' />
				</Icon>
				<h2>{name}</h2>
				<p>{(totalTickets = !0 ? totalTickets : 0)} tickets</p>
			</div>
		</div>
	);
}
