import RegistrationForm from '@/app/components/Form/registrationForm';
import React from 'react';
import './style.scss';
import {
	BlueGridCy,
	PlanningImgCy,
	PlanningsLabelCy,
	ProjectImgCy,
	ProjectsLabelCy,
	RexImgCy,
	RexLabelCy,
	SpecificationImgCy,
	SpecificationLabelCy,
	TeamsImgCy,
	TeamsLabelCy,
	TicketImgCy,
	TicketsLabelCy,
	WhiteGridCy,
	WhiteLogoImgCy,
	WhiteLogoLabelCy,
} from '@/app/const/login/const';

function LoginPage() {
	return (
		<div className='login_container'>
			<div data-cy={WhiteGridCy} className='main_container'>
				<RegistrationForm />
			</div>
			<div data-cy={BlueGridCy} className='logo_container'>
				<div className='logo'>
					<img
						data-cy={WhiteLogoImgCy}
						src='/assets/logo/WhiteLogoUnder.png'
						alt='Logo'
					/>
					<p data-cy={WhiteLogoLabelCy}>
						Travaillez ensemble plus facilement 🤝
					</p>
				</div>
				<div className='icons'>
					<div className='common projects'>
						<img
							data-cy={ProjectImgCy}
							src='/assets/icons/project.svg'
							alt=''
						/>
						<p data-cy={ProjectsLabelCy}>Mes projets</p>
					</div>
					<div className='common plannings'>
						<img
							data-cy={PlanningImgCy}
							src='/assets/icons/planning.svg'
							alt=''
						/>
						<p data-cy={PlanningsLabelCy}>Mon Planning</p>
					</div>
					<div
						data-cy={SpecificationImgCy}
						className='common specification'
					>
						<img src='/assets/icons/specification.svg' alt='' />
						<p data-cy={SpecificationLabelCy}>Cahier des charges</p>
					</div>
					<div className='common tickets'>
						<img
							data-cy={TicketImgCy}
							src='/assets/icons/tickets.svg'
							alt=''
						/>
						<p data-cy={TicketsLabelCy}>Tickets</p>
					</div>
					<div className='common teams'>
						<img
							data-cy={TeamsImgCy}
							src='/assets/icons/teams.svg'
							alt=''
						/>
						<p data-cy={TeamsLabelCy}>Équipe</p>
					</div>
					<div className='common rex'>
						<img
							data-cy={RexImgCy}
							src='/assets/icons/rex.svg'
							alt=''
						/>
						<p data-cy={RexLabelCy}>Rex</p>
					</div>
				</div>
			</div>
		</div>
	);
}

LoginPage.displayName = "LoginPage"

export default LoginPage;
