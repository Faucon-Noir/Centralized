/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import './style.scss';
import { FormEvent, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { numberToColor } from '@/app/helpers';
import dynamic from 'next/dynamic';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';
import {
	ButtonSubmitSpecificationCy,
	EditorCy,
	PopUpSpecificationCy,
	TitleSpecificationCy,
} from '@/app/const/specification/const';
import { decryptData } from '@/app/security/decrypt';
import { encryptData } from '@/app/security/encrypt';

const CustomEditor = dynamic(() => import('@/app/components/customEditor'), {
	ssr: false,
});

function SpecificationEdit({
	userData,
	updateUserData,
}: {
	userData: any;
	updateUserData: any;
}) {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [projectMap, setProjectMap] = useState<{ [key: string]: any }>({});
	const [projectPageID, setprojectPageID] = useState('');
	const [text, setText] = useState<string | undefined>('');
	const [showPopPup, setShowPopPup] = useState(false);
	const baseUrl = process.env.NEXT_PUBLIC_API_URL;

	useEffect(() => {
		if (userData.project.length > 0) {
			let tempMap: { [key: string]: any } = {}; // Crée un objet temporaire pour stocker les projets
			for (let line of userData.project) {
				// tempMap[line.id] = {
				// 	...line,
				// 	cdc: {
				// 		...line.cdc,
				// 		cdc: decryptData(line.cdc.cdc), // Décrypter le champ texte
				// 	},
				// };
				tempMap[line.id] = line;
			}
			setProjectMap(tempMap);
		}
		setprojectPageID(new URL(window.location.href).pathname.split('/')[2]);
		setLoading(false);
	}, [userData]);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const token: any = localStorage.getItem('token');
		// const encryptedText = encryptData(text || '');

		// TODO: data a revoir => x n'exsite pas sur le type EventTarget
		axios
			.patch(
				`${baseUrl}cdc/${projectMap[projectPageID]?.cdc?.id}`,
				{
					cdc: text,
				},
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			.then(function (response) {
				if (response.status === 200) {
					setShowPopPup(true);
					setTimeout(() => {
						setShowPopPup(false);
					}, 10000);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	const handleChangeContentText = useCallback(
		(value: string) => {
			if (value !== text) {
				setText(value);
			}
		},
		[setText, text]
	);

	// TODO: Spinner
	if (loading) {
		return <div>Chargement en cours...</div>;
	}

	return (
		<div className='spec_id'>
			<div className='right_container'>
				<div className='Presentation'>
					<div
						data-cy={TitleSpecificationCy}
						className='TitrePage'
						style={{
							color: numberToColor(
								projectMap[projectPageID]?.color !== undefined
									? projectMap[projectPageID]?.color
									: 0
							),
						}}
					>
						{' '}
						{projectMap[projectPageID] ? (
							<h1>Mon cahier des charges</h1>
						) : null}
					</div>
				</div>
				<form onSubmit={handleSubmit}>
					<div className='box-specification'>
						<CustomEditor
							data-cy={EditorCy}
							content={projectMap[projectPageID]?.cdc?.cdc}
							onChange={(value: string) =>
								handleChangeContentText(value)
							}
						/>
						<button
							data-cy={ButtonSubmitSpecificationCy}
							type='submit'
						>
							<CheckIcon />
						</button>
					</div>
				</form>
				{showPopPup ? (
					<div className='reqLoad'>
						<img
							data-cy={PopUpSpecificationCy}
							src='/assets/icons/icon-cross.svg'
							alt=''
							className='cross'
							onClick={() => setShowPopPup(false)}
						/>
						<p>Modification</p>
						<p style={{ fontSize: '10px' }}>
							Votre cahier des charges à été modifié avec succes
						</p>
					</div>
				) : null}
			</div>
		</div>
	);
}


SpecificationEdit.displayName = "SpecificationEdit"

export default SpecificationEdit;
