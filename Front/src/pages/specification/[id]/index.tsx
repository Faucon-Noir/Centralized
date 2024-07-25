'use client';

import { FormEvent } from 'react';
import { useRouter } from 'next/router';
import './style.scss';
import { Grid } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CustomEditor from '@/app/components/customEditor';
import CheckIcon from '@mui/icons-material/Check';
import { useCallback } from 'react';
import Dashboard from '@/app/components/Dashboard/Dashboard';
import { useDispatch } from 'react-redux';
import { AppDispatch, useTypedSelector } from '@/app/store';
import { getAllTeamsByUserId } from '@/app/store/slices/teamSlice';
import { updateSpecificationById } from '@/app/store/slices/specificationSlice';

export default function SpecificationEdit() {
	const router = useRouter();
	const [project, setProject] = useState<string>('');
	const [specification, setSpecification] = useState<string>('');
	const [mySpecification, setMySpecification] = useState<{ charge: string }>({
		charge: '',
	});
	let contentText: string = '';
	const [text, setText] = useState<string | undefined>(contentText);

	const handleChangeContentText = useCallback(
		(value: string) => {
			if (value !== text) {
				setText(value);
			}
		},
		[setText, text]
	);

	const dispatch: AppDispatch = useDispatch();
	const { userId } = useTypedSelector((state) => state.auth);
	useEffect(() => {
		dispatch(getAllTeamsByUserId(userId)); // TODO
	}, [dispatch, userId]);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		// const token: any = localStorage.getItem('token');
		// axios
		// 	.patch(
		// 		`http://localhost:8000/api/cdc/${specification}`,
		// 		{
		// 			cdc: text,
		// 		},
		// 		{ headers: { Authorization: `Bearer ${token}` } }
		// 	)
		dispatch(updateSpecificationById({ id: specification, cdc: text }))
			.then(function (response) {
				if (response.meta.requestStatus === 'fulfilled') {
					router.push(`/specification/${project}`);
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	return (
		<div>
			<Grid container>
				<Grid xs={2}>
					<Dashboard page='specification' />
				</Grid>
				<Grid xs={10}>
					<form onSubmit={handleSubmit}>
						<div className='box-specification'>
							<CustomEditor
								content={mySpecification.charge}
								onChange={(value: string) =>
									handleChangeContentText(value)
								}
							/>
							<button type='submit'>
								<CheckIcon />
							</button>
						</div>
					</form>
				</Grid>
			</Grid>
		</div>
	);
}
