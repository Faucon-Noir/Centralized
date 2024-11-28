// components/PollingStripe.tsx
import { useEffect, useState } from 'react';
import { useTask } from '../../../contexts/isReq'; // Assurez-vous que c'est le bon chemin
import './style.scss';
import React from 'react';
export default function PollingStripe({status}: {status:string}) {

	const { isTaskComplete, completeTask } = useTask();
	const [showPopup, setShowPopup] = useState(false);

	// Polling pour vérifier l'état de la tâche
	useEffect(() => {
		let intervalId: any;

			if (!isTaskComplete) {
				setShowPopup(true); // Affiche la popup quand le polling commence

				const checkTaskStatus = () => {
					intervalId = setInterval(async () => {
						setShowPopup(false); // Fermer la popup
					    clearInterval(intervalId); // Arrêter le polling
					}, 20000); // Polling toutes les 20 secondes
				};

				checkTaskStatus();
			}
			return () => clearInterval(intervalId); // Cleanup l'interval si le composant se démonte
	}, [
		isTaskComplete,
		completeTask,
	]);

	return (
		<>
			{showPopup && (status === "success") && (
				<div className='req colorSuccess'>
					<p>Paiement de l'abonnement effectué avec succès.</p>
					<p>Vous pouvez dès maintenant vous connecter pour découvrir Centralized.</p>
				</div>
			)}
			{showPopup && (status === "error") && (
				<div className='req colorError'>
					<p>Le paiement de l'abonnement n'a pas abouti.</p>
					<p>Veuillez vous connecter afin de relancer le processus de paiement.</p>
				</div>
			)}
		</>
	);
}
