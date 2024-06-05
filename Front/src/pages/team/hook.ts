import styled from '@mui/system/styled'
import axios from 'axios'
import { useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/router'

export default function useData(
	setTeam: any,
	team: any,
	addUser?: any,
	addUserCreate?: any,
	selectedTeamId?: any
) {
	const router = useRouter()
	const mail_array = addUser.split(/,\s?/)
	const mail_array_create = addUserCreate?.split(/,\s?/)

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			const allowedTypes = ['image/png', 'image/jpeg']
			const maxSize = 2 * 1024 * 1024 // 2Mo
			if (allowedTypes.includes(file.type) && file.size <= maxSize) {
				setTeam({ ...team, avatar: file })
			} else {
				alert(
					'Le fichier doit être une image de type png ou jpeg et ne doit pas dépasser 2Mo'
				)
			}
		} else {
			console.log('No file selected')
		}
	}

	// Multer Create
	async function handleCreateSubmit(e: any) {
		e.preventDefault()
		const token: any = localStorage.getItem('token')
		const decodeToken: any = jwtDecode(token)
		const user_id = decodeToken['id']
		const formData = new FormData()
		Object.keys(team).forEach((key) => {
			formData.append(key, team[key])
		})
		axios
			.post(`http://localhost:8000/api/team/${user_id}`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				},
			})
			.then(function (response) {
				console.log(response)
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
								mail_array_create[index] = res.data.id
							})
					})
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
						)
					})
					router.push('/team')
				}
			})
			.catch(function (error) {
				console.log('error', error)
				router.push('/team')
			})
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
	})
	return {
		handleFileChange,
		// handleEditSubmit,
		handleCreateSubmit,
		VisuallyHiddenInput,
	}
}
