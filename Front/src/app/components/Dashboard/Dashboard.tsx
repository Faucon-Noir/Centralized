'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import './Dashboard.scss';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import { Icon } from '@mui/material';
import { numberToColor } from '@/app/helpers';
export default function Dashboard({ page = '', userData, updateUserData }: { page: String, userData: any, updateUserData: any }) {
	const [selctedMap, setSelctedMap] = useState<{ [key: string]: any }>({});
	const [loading, setLoading] = useState(true); // Ajouter un état de chargement
	const router = useRouter();

	function logout() {
		localStorage.removeItem('token');
		localStorage.setItem('connected', 'false');
		router.push('/login');
	}

	useEffect(() => {
		if (userData?.project?.length > 0) {
			let selectedP = localStorage.getItem("selectedP");
			let tempSelectedMap: { [key: string]: any } = {}; // Crée un objet temporaire pour stocker les projets

			// Parcourir les projets dans userData.project
			for (let project of userData.project) {
				if (selectedP != null) {
					for (let pid of selectedP.split(",")) {
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
		let selectedP = localStorage.getItem("selectedP")?.split(",");
		if (selectedP) {
			let index = selectedP.indexOf(id);
			if (index != -1) {
				selectedP.splice(index, 1);
				localStorage.setItem("selectedP", selectedP.join(","));

				// 2. Supprimer l'ID dans `selctedMap`
				setSelctedMap((prevSelctedMap) => {
					const updatedSelctedMap = { ...prevSelctedMap }; // Créer une copie de `selctedMap`
					delete updatedSelctedMap[id]; // Supprimer l'entrée correspondant à `id`
					return updatedSelctedMap; // Retourner l'objet mis à jour
				});
				window.location.reload()
			}
		}
	}

	if (loading) {
		return <div>Chargement des projets...</div>;
	}

	return (
		<>
			<div className='dashboard'>
				<div className='centralized_logo'>
					<img src='/assets/logo/WhiteLogoLeft.png' alt='Logo' className='logo' />
				</div>
				<div className='home_button'>
					<a href='/'>
						<button className={page == 'HomePage' ? 'dashboard_button active' : 'dashboard_button'}>
							<img src='/assets/icons/home_icon.svg' alt='' /> Tableau de bord
						</button>
					</a>
				</div>
				<div className='dashboard_nav'>
					<a href="/planning"><button className={page == 'Planning' ? 'dashboard_button active' : 'dashboard_button'}><img src="/assets/icons/planning.svg" alt="" />Mon Planning</button></a>
					<a href="/specification"><button className={page == 'Specification' ? 'dashboard_button active' : 'dashboard_button'}><img src="/assets/icons/specification.svg" alt="" />Mes projets</button></a>
					{Object.keys(selctedMap).length > 0 ? (
						<div className='selectedContainer'>
							{Object.values(selctedMap).map((project, index) => (
								<div className='projectOpen' key={index}>
									<button className='pName'>
										<img src="/assets/icons/icon-cross.svg" alt="" className='cross' onClick={() => deleteSelected(project.id)} />
										<Icon sx={{ color: numberToColor(project.color), height: '35px', width: '35px', }}>
											<FolderCopyIcon fontSize='large' />
										</Icon>
										<p>{project.name}</p>
									</button>
									<div className='submenu'>
										<a href={"/specification/" + project.id}>
											<button className="submenu_btn">
												<img src="/assets/icons/project.svg" alt="" />
												<p>Cahier des charges</p>
											</button>
										</a>
										<a href={"/ticket/" + project.id}>
											<button className="submenu_btn">
												<img src="/assets/icons/tickets.svg" alt="" />
												<p>Tickets</p>
											</button>
										</a>
										<a href={"/ticket/" + project.id}>
											<button className="submenu_btn">
												<img src="/assets/icons/rex.svg" alt="" />
												<p>Rex</p>
											</button>
										</a>
									</div>
								</div>
							))}
						</div>
					) : null}
				</div>
				<div className='dashboard_profile'>
					<a href='/account'>
						<button className={page == 'account' ? 'dashboard_button active' : 'dashboard_button'}>
							<img src='/assets/icons/user.svg' alt='' /> Mon compte
						</button>
					</a>
					<button className='dashboard_button red' onClick={() => logout()}>
						<img src='/assets/icons/x.svg' alt='' /> Déconnexion
					</button>
				</div>
			</div>
		</>
	);
}
