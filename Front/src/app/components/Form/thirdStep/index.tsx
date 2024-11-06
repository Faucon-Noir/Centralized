import React, { useState } from 'react';
import './style.scss';

function ThirdStep() {
	return (
		<div className='third_step_form'>
			<h1>Vous êtes prêt !</h1>
			<p>
				Vous venez de créer votre équipe, ainsi que votre premier
				projet.
			</p>
			<p>
				Il ne vous reste plus qu&apos;a crée vos ticket et profiter de
				votre plateforme.
			</p>
			<button onClick={() => window.location.reload()}>Terminer</button>
		</div>
	);
}

export default ThirdStep;
