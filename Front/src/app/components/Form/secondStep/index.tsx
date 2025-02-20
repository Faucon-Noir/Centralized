import React, { useState } from 'react';
import './style.scss';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useTask } from '../../../contexts/isReq';

function SecondStep({
	userData,
	setUserStep,
}: {
	userData: any;
	setUserStep: any;
}) {
	const router = useRouter();
	const { startTask } = useTask();
	const [project, setProject] = useState<any>({
		team: '',
		user: userData?.user?.id,
		name: '',
		description: '',
		functionality: '',
		forecast: '',
		start_date: '',
		end_date: '',
		budget: '',
		technology: '',
		constraints: '',
		validation: '',
		teamRole: '',
		template: 0,
		status: false,
	});
	const baseUrl = process.env.NEXT_PUBLIC_API_URL;
	async function handleSubmit() {
		// setUserStep(3)
		// add user to project
		// start the request create specification
		await axios.post(
			`${baseUrl}project/${project.team}/${project.user}`,
			project,
			{ headers: { Authorization: `Bearer ${userData?.user?.token}` } }
		);

		startTask(); // Met à jour l'état global que la tâche a démarré
		setUserStep(3);
		// router.push('/home');
	}
	return (
		<div className='step2form'>
			<div className='wrapperform'>
				<h1>Crée un nouveau projet</h1>
				<div className='w-45'>
					<div className='small'>
						<input
							type='text'
							placeholder='Titre du projet'
							onChange={(e) =>
								setProject({
									...project,
									name: e.target.value.trim(),
								})
							}
							required
						/>
						<input
							type='text'
							placeholder='Description du projet'
							onChange={(e) =>
								setProject({
									...project,
									description: e.target.value.trim(),
								})
							}
						/>
					</div>
					<div>
						<textarea
							placeholder='Fonctionnalités du projet'
							rows={5}
							cols={50}
							onChange={(e) =>
								setProject({
									...project,
									functionality: e.target.value.trim(),
								})
							}
						/>
						<textarea
							placeholder='Technologies du projet'
							rows={5}
							cols={30}
							onChange={(e) =>
								setProject({
									...project,
									technology: e.target.value.trim(),
								})
							}
						/>
					</div>
					<div>
						<textarea
							placeholder="Planning prévisionnel&#10;&#x0A;
							Remplir le formulaire: 1 heure, Repartir les tickets: 2 jours; Finir le projet: 3 mois"
							rows={5}
							cols={50}
							onChange={(e) =>
								setProject({
									...project,
									forecast: e.target.value.trim(),
								})
							}
						/>
						<textarea
							placeholder="Répartition de l'équipe"
							rows={5}
							cols={100}
							onChange={(e) =>
								setProject({
									...project,
									teamRole: e.target.value.trim(),
								})
							}
						/>
					</div>
					<div className='small'>
						<input
							type='date'
							placeholder='Date de début'
							onChange={(e) =>
								setProject({
									...project,
									start_date: e.target.value.trim(),
								})
							}
						/>
						<input
							type='date'
							placeholder='Date de fin'
							onChange={(e) =>
								setProject({
									...project,
									end_date: e.target.value.trim(),
								})
							}
						/>
					</div>
					<div className='centered'>
						<input
							type='text'
							placeholder='Budget prévisionnel'
							onChange={(e) =>
								setProject({
									...project,
									budget: e.target.value.trim(),
								})
							}
						/>
						<select
							onChange={(e) =>
								setProject({
									...project,
									team: e.target.value.trim(),
								})
							}
							required
						>
							<option value=''>Veuillez choisir une équipe</option>
							{userData?.team
								? userData?.team.map((item: any) => (
									<option
										key={item.team.id}
										value={item.team.id}
									>
										{item.team.name}
									</option>
								))
								: null}
						</select>
						
					</div>
					<div>
						<textarea
							placeholder='Contraintes du projet'
							rows={5}
							cols={30}
							onChange={(e) =>
								setProject({
									...project,
									constraints: e.target.value.trim(),
								})
							}
						/>
						<textarea
							placeholder='Conditions de validation'
							rows={5}
							cols={30}
							onChange={(e) =>
								setProject({
									...project,
									validation: e.target.value.trim(),
								})
							}
						/>
					</div>
					<button
						onClick={handleSubmit}
						disabled={
							!project.name ||
							!project.description ||
							!project.functionality ||
							!project.forecast ||
							!project.start_date ||
							!project.end_date ||
							!project.budget ||
							!project.technology ||
							!project.constraints ||
							!project.validation ||
							!project.team ||
							!project.teamRole
						}
					>
						Générer
					</button>
				</div>
			</div>
		</div>
	);
}

export default SecondStep;
