import React from 'react';
import './style.scss';

export default function TicketCard({
	id,
	title,
	start,
	end,
	urgence,
	updated_at,
}: {
	id: any;
	title: any;
	start: any;
	end: any;
	urgence: 0 | 1 | 2 | 3 | 4;
	updated_at: Date;
}) {
	let urgenceValue = {
		1: 'Faible',
		2: 'Moyenne',
		3: 'Haute',
		4: 'Très Haute',
		0: 'Inconnu',
	};
	let urgenceColor = {
		1: '#8BC729',
		2: '#0083E1',
		3: 'orange',
		4: 'red',
		0: 'gray',
	};
	const date1 = new Date();
	const date2 = new Date(updated_at);
	let lastUpdate = Number(date1) - Number(date2);
	const millisecondsInOneDay = 1000 * 60 * 60 * 24;
	const differenceInDays = lastUpdate / millisecondsInOneDay;
	return (
		<>
			<div
				className='card'
				style={{ borderLeft: '7px solid ' + urgenceColor[urgence] }}
			>
				<h3>{title}</h3>
				<div>
					<p>
						{start
							.substring(0, 10)
							.replace(/^(\d{4})-(\d{2})-(\d{2}).*$/, '$3/$2/$1')
							.replace(/-/g, '/')}
						<br />
						{end
							.substring(0, 10)
							.replace(/^(\d{4})-(\d{2})-(\d{2}).*$/, '$3/$2/$1')
							.replace(/-/g, '/')}
					</p>
					<p>Urgence : {urgenceValue[urgence]}</p>
				</div>
				<p className='card_date'>
					Dernier maj :{' '}
					<strong>
						il y a {differenceInDays.toString().split('.')[0]} jours
					</strong>
				</p>
			</div>
		</>
	);
}
