import styled from '@mui/system/styled';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/router';
import { useTypedSelector } from '@/app/store';
import { AppDispatch } from '../../app/store/index';
import { useDispatch } from 'react-redux';

export default function useData(
	setTeam: any,
	team: any,
	addUserCreate?: any,
	selectedTeamId?: any
) {
	const dispatch: AppDispatch = useDispatch();

	const router = useRouter();
	const mail_array_create = addUserCreate?.split(/,\s?/);
	const token = useTypedSelector((state) => state.auth.token);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const allowedTypes = ['image/png', 'image/jpeg'];
			const maxSize = 2 * 1024 * 1024; // 2Mo
			if (allowedTypes.includes(file.type) && file.size <= maxSize) {
				setTeam({ ...team, avatar: file });
			} else {
				alert(
					'Le fichier doit être une image de type png ou jpeg et ne doit pas dépasser 2Mo'
				);
			}
		} else {
			console.log('No file selected');
		}
	};

	// Multer Create
	async function handleCreateSubmit(e: any) {
		e.preventDefault();
		const decodeToken: any = jwtDecode(token ?? '');
		const user_id = decodeToken['id'];
		const formData = new FormData();
		Object.keys(team).forEach((key) => {
			formData.append(key, team[key]);
		});

		// TODO: rework le useEffect (un souci de type est présent sur le res.payload.id)
		// dispatch(postCreateTeam(formData)).then((res) => {
		// 	if (res.meta.requestStatus === 'fulfilled') {
		// 		mail_array_create.forEach((element: any, index: any) => {
		// 			dispatch(getUserByMail(element)).then((res) => {
		// 				mail_array_create[index] = res.payload.id;
		// 			});
		// 		});
		// 	}
		// });
		axios
			.post(`http://localhost:8000/api/team/${user_id}`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				},
			})
			.then(function (response) {
				console.log(response);
				if (response.status === 200) {
					mail_array_create.forEach((element: any, index: any) => {
						axios
							.get(
								`http://localhost:8000/api/user/mail/${element}`,
								{
									headers: {
										Authorization: `Bearer ${token}`,
									},
								}
							)
							.then(function (res) {
								mail_array_create[index] = res.data.id;
							});
					});
					mail_array_create.forEach((element: any) => {
						axios.post(
							`http://localhost:8000/api/teamuser`,
							{
								user: element,
								team: selectedTeamId,
							},
							{
								headers: {
									Authorization: `Bearer ${token}`,
								},
							}
						);
					});
					router.push('/team');
				}
			})
			.catch(function (error) {
				console.log('error', error);
				router.push('/team');
			});
	}

	const VisuallyHiddenInput = styled('input')({
		clip: 'rect(0 0 0 0)',
		clipPath: 'inset(50%)',
		height: 1,
		overflow: 'hidden',
		position: 'absolute',
		bottom: 0,
		left: 0,
		whiteSpace: 'nowrap',
		width: 1,
	});
	return {
		handleFileChange,
		// handleEditSubmit,
		handleCreateSubmit,
		VisuallyHiddenInput,
	};
}
