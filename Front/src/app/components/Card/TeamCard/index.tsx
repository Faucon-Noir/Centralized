import React, { useEffect, useState } from 'react';
import './style.scss';
import axios from 'axios';

export default function TeamCard({ team, userData }: { team: any, userData: any }) {
	const [nbrMembers, setNbrMember] = useState(0)
	useEffect(() => {
		try {
			axios.get("http://localhost:8000/api/teamuser/" + team.id, {
				headers: { Authorization: `Bearer ${userData.user.token}` },
			}).then(res => {
				if (res.status == 200) {
					setNbrMember(res.data.length);
				}
			})

		} catch (e) {
			console.log(e)
		}
	}, [team.id, userData.user.token])
	return (
		<>
			<div className='card'>
				<div className='card-header yellow'>
					<img
						src={"/media/" + team.avatar}
						alt='avatar'
						className='avatar'
					></img>
				</div>
				<div className='card-body'>
					<h2 className='team-name'>{team.name}</h2>
					<div className='card-footer'>
						<div className='team-info'>
							<i className='icon'>👥</i>
							<span>{nbrMembers} personnes</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
