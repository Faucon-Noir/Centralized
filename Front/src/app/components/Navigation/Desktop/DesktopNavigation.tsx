'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import { Icon } from '@mui/material';
import { numberToColor } from '@/app/helpers';
import Link from 'next/link';
import React from 'react';

export default function DesktopNavigation({
	page = '',
	userData,
	updateUserData,
}: {
	page: String;
	userData: any;
	updateUserData: any;
}) {
	const [selctedMap, setSelctedMap] = useState<{ [key: string]: any }>({});
	const [loading, setLoading] = useState(true); // Ajouter un état de chargement
	const router = useRouter();

	function logout() {
		localStorage.removeItem('token');
		localStorage.setItem('connected', 'false');
		router.push('/');
	}

	useEffect(() => {
		import('./DesktopNav.scss'); // Charge uniquement quand MobileNavigation est monté
		if (userData?.project?.length > 0) {
			let selectedP = localStorage.getItem('selectedP');
			let tempSelectedMap: { [key: string]: any } = {}; // Crée un objet temporaire pour stocker les projets

			// Parcourir les projets dans userData.project
			for (let project of userData.project) {
				if (selectedP != null) {
					for (let pid of selectedP.split(',')) {
						if (pid === project.id) {
							tempSelectedMap[pid] = project; // Ajouter le projet à l'objet temporaire
						}
					}
				}

				// Ajouter les projets sélectionnés
				if (userData.selectedProjects.length > 0) {
					for (let pid of userData.selectedProjects) {
						if (project.id === pid) {
							tempSelectedMap[pid] = project; // Ajouter le projet à l'objet temporaire
						}
					}
				}
			}
			// Mettre à jour l'état `selctedMap` une fois toutes les données collectées
			setSelctedMap(tempSelectedMap);
		}
		setLoading(false); // Une fois que les données sont prêtes, on arrête le chargement
	}, [userData]);

	function deleteSelected(id: any) {
		let selectedP = localStorage.getItem('selectedP')?.split(',');
		if (selectedP) {
			let index = selectedP.indexOf(id);
			if (index != -1) {
				selectedP.splice(index, 1);
				localStorage.setItem('selectedP', selectedP.join(','));

				// 2. Supprimer l'ID dans `selctedMap`
				setSelctedMap((prevSelctedMap) => {
					const updatedSelctedMap = { ...prevSelctedMap }; // Créer une copie de `selctedMap`
					delete updatedSelctedMap[id]; // Supprimer l'entrée correspondant à `id`
					return updatedSelctedMap; // Retourner l'objet mis à jour
				});
				window.location.reload();
			}
		}
	}

	if (loading) {
		return <div>Chargement des projets...</div>;
	}

	return (
		<div className='navigation'>
			<div className='centralized_logo'>
				<img
					src='/assets/logo/WhiteLogoLeft.png'
					alt='Logo'
					className='logo'
				/>
			</div>
			<div className='home_button'>
				<Link href='/home'>
					<button
						className={
							page == 'HomePage'
								? 'navigation_button active'
								: 'navigation_button'
						}
					>
						<img src='/assets/icons/home_icon.svg' alt='' /> Tableau
						de bord
					</button>
				</Link>
			</div>
			<div className='navigation_nav'>
				<Link href='/planning'>
					<button
						className={
							page == 'Planning'
								? 'navigation_button active'
								: 'navigation_button'
						}
					>
						<img src='/assets/icons/planning.svg' alt='' />
						Mon Planning
					</button>
				</Link>
				<Link href='/specification'>
					<button
						className={
							page == 'Specification'
								? 'navigation_button active'
								: 'navigation_button'
						}
					>
						<img src='/assets/icons/specification.svg' alt='' />
						Mes projets
					</button>
				</Link>
				<Link href='/team'>
					<button
						className={
							page == 'Team'
								? 'navigation_button active'
								: 'navigation_button'
						}
					>
						<img src='/assets/icons/teams.svg' alt='' />
						Mes équipes
					</button>
				</Link>

				{Object.keys(selctedMap).length > 0 ? (
					<div className='selectedContainer'>
						{Object.values(selctedMap).map((project, index) => (
							<div className='projectOpen' key={index}>
								<button className='pName'>
									<img
										src='/assets/icons/icon-cross.svg'
										alt=''
										className='cross'
										onClick={() =>
											deleteSelected(project.id)
										}
									/>
									<Icon
										sx={{
											color: numberToColor(project.color),
											height: '35px',
											width: '35px',
										}}
									>
										<FolderCopyIcon fontSize='large' />
									</Icon>
									<p>{project.name}</p>
								</button>
								<div className='submenu'>
									<a href={'http://localhost:3000/specification/' + project.id}>
										<button className='submenu_btn'>
											<img
												src='/assets/icons/project.svg'
												alt=''
											/>
											<p>Cahier des charges</p>
										</button>
									</a>
									<a href={'http://localhost:3000/ticket/' + project.id}>
										<button className='submenu_btn'>
											<img
												src='/assets/icons/tickets.svg'
												alt=''
											/>
											<p>Tickets</p>
										</button>
									</a>
									<a href={'http://localhost:3000/rex/' + project.id} >
										<button className='submenu_btn'>
											<img
												src='/assets/icons/rex.svg'
												alt=''
											/>
											<p>Rex</p>
										</button>
									</a>
								</div>
							</div>
						))}
					</div>
				) : null}
			</div>
			<div className='navigation_profile'>
				<Link href='/account'>
					<button
						className={
							page == 'account'
								? 'navigation_button active'
								: 'navigation_button'
						}
					>
						<img src='/assets/icons/user.svg' alt='' /> Mon compte
					</button>
				</Link>
				<button
					className='navigation_button red'
					onClick={() => logout()}
				>
					<img src='/assets/icons/x.svg' alt='' /> Déconnexion
				</button>
			</div>
		</div>
	);
}
