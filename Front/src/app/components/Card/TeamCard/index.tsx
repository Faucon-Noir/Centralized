import React, { useEffect, useState } from 'react';
import './style.scss';
import axios from 'axios';

export default function TeamCard({ team, userData }: { team: any, userData: any }) {
	const [teamData, setTeamData] = useState([{
		id: 0
	}]);
	const [selectedTeam, setSelectedTeam] = useState(team);
	const [mailToAdd, setMailToAdd] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [validEmail, setValidEmail] = useState(false);

	useEffect(() => {
		try {
			axios.get("http://localhost:8000/api/teamuser/" + team.id, {
				headers: { Authorization: `Bearer ${userData.user.token}` },
			}).then(res => {
				if (res.status == 200) {
					setTeamData(res.data);
				}
			})

		} catch (e) {
			console.log(e)
		}
	}, [team.id, userData.user.token])

	function validateEmail(email: any) {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	}

	async function deleteUserFromTeam(selectedTeamUser: any) {
		console.log(selectedTeamUser);
		try {
			await axios.delete("http://localhost:8000/api/teamuser/" + selectedTeamUser.id, {
				headers: { Authorization: `Bearer ${userData.user.token}` },
			}).then(res => {
				if (res.status === 200) {
					if (selectedTeamUser.user.id == userData.user.id) window.location.reload()
					else {
						setTeamData(prevItems =>
							prevItems.filter(item => item.id !== selectedTeamUser.id)
						);
					}

				}
			});
		} catch (e) {
			console.log(e);
		}
	}

	async function addMateToTeam(email: any, teamid: any) {
		console.log(email, teamid)
		let response = await axios.post(`http://localhost:8000/api/teamuser`, { user: email, team: teamid },
			{ headers: { Authorization: `Bearer ${userData.user.token}` } })
	}


	async function handleFinish() {
		let response = await axios.patch("http://localhost:8000/api/team/" + selectedTeam.id, selectedTeam, {
			headers: { Authorization: `Bearer ${userData.user.token}` },
		})
		if (response.status == 200) {
			for (let mate of mailToAdd.split(",")) {
				if (!validateEmail(mate.trim()) && mate.trim().length > 0) {
					setValidEmail(true);
				} else {
					console.log("ok")
					await addMateToTeam(mate.trim(), selectedTeam.id)
				}
			}
		}
		window.location.reload();
	}

	return (
		<>
			<div className='card_team' onClick={() => setShowModal(true)}>
				<div className='card-header yellow'>
					<img src={"/media/" + team.avatar} alt='avatar' className='avatar'></img>
				</div>
				<div className='card-body'>
					<h2 className='team-name'>{team.name}</h2>
					<div className='card-footer'>
						<div className='team-info'>
							<i className='icon'>👥</i>
							<span>{teamData?.length} personnes</span>
						</div>
					</div>
				</div>
			</div>
			{showModal ? <div className='team_modal_card'>
				<div className='team_main_modal_card'>
					<img src='/assets/icons/icon-cross.svg' alt='' className='cross' onClick={() => setShowModal(false)} />

					<div className='team_main_modal_content'>
						<div className='image_container'>
							<img src={"/media/" + team.avatar} alt='avatar' className='avatar'></img>

						</div>
						<div className='right_modal_container'>
							<input type="text" value={selectedTeam.name} onChange={e => setSelectedTeam({ ...selectedTeam, name: e.target.value })} />
							<div className='user_container'>
								{teamData ? teamData.map((item: any) => (
									<div className='one_user' key={item.id}>
										<p><img src="/assets/icons/user.png" alt="" /> : {item.user.lastname} {item.user.firstname}</p>{item.user.id === userData.user.id ? <p>(vous)</p> : null}
										<p><img src="/assets/icons/email.png" alt="" />  : {item.user.mail}</p>
										<img src="/assets/icons/bin.png" className='bin_img' alt="" onClick={() => deleteUserFromTeam(item)} />
									</div>
								)) : null}
							</div>
							{/* to do ajouter un membre a une team */}
							<input type="text" placeholder='Ajouter des membres (email)' onChange={e => setMailToAdd(e.target.value)} />
							{/* to do ajouter un membre a une team */}
							<button onClick={() => handleFinish()}>Terminé</button>
						</div>
					</div>
				</div>
			</div> : null}
		</>
	);
}
