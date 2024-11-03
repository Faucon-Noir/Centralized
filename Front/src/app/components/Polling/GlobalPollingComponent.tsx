// components/GlobalPollingComponent.tsx
import { useEffect, useState } from 'react';
import { useTask } from '../../contexts/isReq'; // Assurez-vous que c'est le bon chemin
import axios from 'axios';
import { BarLoader } from 'react-spinners';
import UserData from '@/utils/User/UserData';
import './GlobalPoll.scss';
import React from 'react';
export default function GlobalPollingComponent() {
	const { isTaskStarted, isTaskComplete, completeTask } = useTask();
	const [showPopup, setShowPopup] = useState(false);

	const [userData, setUserData] = useState<any>({
		project: [
			{
				rex: [],
				ticket: [],
			},
		],
		team: [],
		user: [],
		specification: [],
	});

	useEffect(() => {
		UserData().then((result) => {
			setUserData(result);
		});
	}, []);

	// Polling pour vérifier l'état de la tâche
	useEffect(() => {
		let intervalId: any;

		if (isTaskStarted && !isTaskComplete) {
			setShowPopup(true); // Affiche la popup quand le polling commence

			const checkTaskStatus = () => {
				intervalId = setInterval(async () => {
					try {
						let responseStatus = await axios.get(
							`http://localhost:8000/api/specification/check-status`,
							{
								headers: {
									Authorization: `Bearer ${userData.user.token}`,
								},
							}
						);
						if (responseStatus.data.status === true) {
							completeTask(); // Marquer la tâche comme terminée
							setShowPopup(false); // Fermer la popup
							clearInterval(intervalId); // Arrêter le polling
						}
					} catch (error) {
						console.error('Erreur lors du polling', error);
						clearInterval(intervalId);
					}
				}, 10000); // Polling toutes les 10 secondes
			};

			checkTaskStatus();
		}

		return () => clearInterval(intervalId); // Cleanup l'interval si le composant se démonte
	}, [isTaskStarted, isTaskComplete, completeTask, userData.user.token]);

	return (
		<>
			{showPopup && (
				<div className='reqLoad'>
					<p>Création de votre cahier des charges...</p>
					<p style={{ fontSize: '10px' }}>
						Génération de votre cahier des charges par IA.
					</p>
					<BarLoader
						color='white'
						loading={true}
						speedMultiplier={1}
						width={200}
					/>
				</div>
			)}
		</>
	);
}
