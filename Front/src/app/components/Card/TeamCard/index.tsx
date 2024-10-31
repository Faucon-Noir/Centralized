import React from 'react';
import './style.scss';

export default function TeamCard(name: any) {
	return (
		<>
			<div className='card'>
				<div className='card-header yellow'>
					<img
						src='/assets/avatar_team.png'
						alt='avatar'
						className='avatar'
					></img>
				</div>
				<div className='card-body'>
					<h2 className='team-name'>{name.name}</h2>
					<p className='role'>contact</p>
					<div className='card-footer'>
						<div className='team-info'>
							<i className='icon'>👥</i>
							<span>13 personnes</span>
						</div>
						<div className='actions'>
							<i className='icon'>✏️</i>
							<i className='icon'>🔗</i>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
