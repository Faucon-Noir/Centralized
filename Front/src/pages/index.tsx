/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import 'swiper/css';
import './style.scss';
import 'swiper/css/pagination';

import { useRef, useState } from 'react';
import Link from 'next/link';
import React from 'react';

export default function WelcomePage() {
	const [currentImage, setCurrentImage] = useState(
		'/assets/vitrine/second-1.png'
	);
	const [selectedText, setSelectedText] = useState('Text 1');

	const handleTextClick = (image: string, text: string) => {
		setCurrentImage(image);
		setSelectedText(text);
	};
	const listContainerRef = useRef<HTMLDivElement>(null);
	const [scrollAmount, setScrollAmount] = useState(0);

	const handleNextClick = () => {
		const container = listContainerRef.current;
		if (container) {
			const containerWidth = container.clientWidth;
			const scrollWidth = container.scrollWidth;

			let newScrollAmount = scrollAmount + containerWidth;
			if (newScrollAmount >= scrollWidth) {
				newScrollAmount = 0; // Reset to start
			}

			container.scroll({
				left: newScrollAmount,
				behavior: 'smooth',
			});

			setScrollAmount(newScrollAmount);
		}
	};
	return (
		<>
			<header className='header'>
				<img
					src='/assets/logo/ColorLogoLineBlack.png'
					alt='Logo'
					className='logo'
				/>
				<Link href='/login'>Connexion</Link>
			</header>
			<section className='first'>
				<div className='text'>
					<h1>Travailler ensemble plus facilement</h1>
					<p>
						Simplifier votre quotidien en gérant vos projet plus
						simplement
					</p>
					<form className='input'>
						<input
							type='text'
							id='email'
							name='E-mail'
							placeholder='E-mail'
						></input>
						<input
							type='submit'
							value='Inscrivez-vous !'
							id='submit'
						></input>
					</form>
				</div>
				<div className='img-container'>
					<img
						src='/assets/vitrine/MacBook_Air_2022.png'
						alt='ordi'
						className='ordi'
					/>
				</div>
			</section>
			<section className='second'>
				<h2>Centralisez vos besoins</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
					do eiusmod tempor incididunt ut labore et dolore magna
					aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat.
				</p>
				<div className='container'>
					<div className='box-container'>
						<div
							onClick={() =>
								handleTextClick(
									'/assets/vitrine/second-1.png',
									'Text 1'
								)
							}
							className={
								selectedText === 'Text 1' ? 'selected-box' : 'unselected-box'
							}
						>
							<div className='box'>
								<h3 className='title'>Cahier des charges</h3>
								<p className='description'>
									Gagnez du temps sur la création de vos
									cahiers des charges grace à notre
									Intelligence artificielle!
								</p>
							</div>
						</div>
						<div
							onClick={() =>
								handleTextClick(
									'/assets/vitrine/second-2.png',
									'Text 2'
								)
							}
							className={
								selectedText === 'Text 2' ? 'selected-box' : 'unselected-box'
							}
						>
							<div className='box'>
								<h3 className='title'>Plannifiez vos projet</h3>
								<p className='description'>
									Générez automatiquement vos tickets pour
									gagner du temps, et gagner du temps sur
									l'organisation.
								</p>
							</div>
						</div>
						<div
							onClick={() =>
								handleTextClick(
									'/assets/vitrine/second-3.png',
									'Text 3'
								)
							}
							className={
								selectedText === 'Text 3' ? 'selected-box' : 'unselected-box'
							}
						>
							<div className='box'>
								<h3 className='title'>Gérer vos équipes</h3>
								<p className='description'>
									Créer et gérer vos équipes et vos projet
									avec simplicité.
								</p>
							</div>
						</div>
					</div>
					<div className='img-container'>
						<img src={currentImage} alt='Displayed Image' />
					</div>
				</div>
			</section>
			{/*<section className='third'>*/}
			{/*	<h1>Améliorer votre manière de travailler</h1>*/}
			{/*	<button onClick={handleNextClick} className='arrow'>*/}
			{/*		<div className='round'>*/}
			{/*			<p>&gt;</p>*/}
			{/*		</div>*/}
			{/*	</button>*/}
			{/*	<br></br>*/}
			{/*	<div className='container'>*/}
			{/*		<div className='listContainer' ref={listContainerRef}>*/}
			{/*			<div className='block'>*/}
			{/*				<div className='icon'>📦</div>*/}
			{/*				<div className='title'>Title 1</div>*/}
			{/*				<div className='description'>Description 1</div>*/}
			{/*			</div>*/}
			{/*			<div className='block'>*/}
			{/*				<div className='icon'>🛠</div>*/}
			{/*				<div className='title'>Title 2</div>*/}
			{/*				<div className='description'>Description 2</div>*/}
			{/*			</div>*/}
			{/*			<div className='block'>*/}
			{/*				<div className='icon'>🚀</div>*/}
			{/*				<div className='title'>Title 3</div>*/}
			{/*				<div className='description'>Description 3</div>*/}
			{/*			</div>*/}
			{/*			<div className='block'>*/}
			{/*				<div className='icon'>📦</div>*/}
			{/*				<div className='title'>Title 1</div>*/}
			{/*				<div className='description'>Description 1</div>*/}
			{/*			</div>*/}
			{/*			<div className='block'>*/}
			{/*				<div className='icon'>🛠</div>*/}
			{/*				<div className='title'>Title 2</div>*/}
			{/*				<div className='description'>Description 2</div>*/}
			{/*			</div>*/}
			{/*			<div className='block'>*/}
			{/*				<div className='icon'>🚀</div>*/}
			{/*				<div className='title'>Title 3</div>*/}
			{/*				<div className='description'>Description 3</div>*/}
			{/*			</div>*/}
			{/*			<div className='block'>*/}
			{/*				<div className='icon'>📦</div>*/}
			{/*				<div className='title'>Title 1</div>*/}
			{/*				<div className='description'>Description 1</div>*/}
			{/*			</div>*/}
			{/*			<div className='block'>*/}
			{/*				<div className='icon'>🛠</div>*/}
			{/*				<div className='title'>Title 2</div>*/}
			{/*				<div className='description'>Description 2</div>*/}
			{/*			</div>*/}
			{/*			<div className='block'>*/}
			{/*				<div className='icon'>🚀</div>*/}
			{/*				<div className='title'>Title 3</div>*/}
			{/*				<div className='description'>Description 3</div>*/}
			{/*			</div>*/}
			{/*			/!* Add more blocks as needed *!/*/}
			{/*		</div>*/}
			{/*	</div>*/}
			{/*</section>*/}
			{/*<section className='price'>*/}
			{/*	<h1>Des prix adaptés à vos besoins</h1>*/}
			{/*	<h3></h3>*/}
			{/*	/!* <button className='offer'>Comparaison</button> *!/*/}
			{/*	<div className='gridprice'>*/}
			{/*		<div className='box'>*/}
			{/*			<h3>STANDARD</h3>*/}
			{/*			<h1>*/}
			{/*				6<span className='currency'>€</span>*/}
			{/*			</h1>*/}
			{/*			<p className='info'>par utilisateur et par mois</p>*/}
			{/*			<br></br>*/}
			{/*			<p className='user'>*/}
			{/*				Pour les petites équipes qui ont peu de projet à la*/}
			{/*				fois.*/}
			{/*			</p>*/}
			{/*			<p className='limite'>*/}
			{/*				Les utilisateur sont limités à la création de 5*/}
			{/*				projets par mois.*/}
			{/*			</p>*/}
			{/*			<a href='#'>*/}
			{/*				<button>S&pos;inscrire</button>*/}
			{/*			</a>*/}
			{/*		</div>*/}
			{/*		<div className='box premium'>*/}
			{/*			<h3>PREMIUM</h3>*/}
			{/*			<h1>*/}
			{/*				12<span className='currency'>€</span>*/}
			{/*			</h1>*/}
			{/*			<p className='info'>par utilisateur et par mois</p>*/}
			{/*			<br></br>*/}
			{/*			<p className='user'>*/}
			{/*				Pour les équipes qui ont besoins de gérer plusieurs*/}
			{/*				projet à la fois.*/}
			{/*			</p>*/}
			{/*			<p className='limite'>*/}
			{/*				Les utilisateur sont limités à la création de 20*/}
			{/*				projets par mois.*/}
			{/*			</p>*/}
			{/*			<a href='#'>*/}
			{/*				<button>S&pos;inscrire</button>*/}
			{/*			</a>*/}
			{/*		</div>*/}
			{/*		<div className='box right'>*/}
			{/*			<h3>ENTERPRISE</h3>*/}
			{/*			<h1>*/}
			{/*				15<span className='currency'>€</span>*/}
			{/*			</h1>*/}
			{/*			<p className='info'>*/}
			{/*				par utilisateur et par mois, facturation annuelle*/}
			{/*			</p>*/}
			{/*			<br></br>*/}
			{/*			<p className='user'>*/}
			{/*				Pour les entreprises qui produisent plusieurs*/}
			{/*				projets à la fois.*/}
			{/*			</p>*/}
			{/*			<p className='limite'>*/}
			{/*				Les utilisateur sont limités à la création de 50*/}
			{/*				projets par mois.*/}
			{/*			</p>*/}
			{/*			<a href='#'>*/}
			{/*				<button>Contacter notre équipe</button>*/}
			{/*			</a>*/}
			{/*		</div>*/}
			{/*	</div>*/}
			{/*</section>*/}
			{/*<section className='pre-footer'>*/}
			{/*	<div className='text'>*/}
			{/*		<h1>Simplifier, Centraliser, Ameliorer</h1>*/}
			{/*		<h3>Accompagner vos projet dès maintenant</h3>*/}
			{/*	</div>*/}
			{/*	<form className='input'>*/}
			{/*		<input*/}
			{/*			type='text'*/}
			{/*			id='email'*/}
			{/*			name='E-mail'*/}
			{/*			placeholder='E-mail'*/}
			{/*		></input>*/}
			{/*		<input*/}
			{/*			type='submit'*/}
			{/*			value='Inscrivez-vous !'*/}
			{/*			id='submit'*/}
			{/*		></input>*/}
			{/*	</form>*/}
			{/*</section>*/}
			{/*<footer className='footer'>*/}
			{/*	<div className='container debut'>*/}
			{/*		<div className='box'>*/}
			{/*			<img*/}
			{/*				src='/assets/logo/WhiteLogoLeft.png'*/}
			{/*				alt='Logo'*/}
			{/*				className='logo'*/}
			{/*			/>*/}
			{/*			<br></br>*/}
			{/*		</div>*/}
			{/*		<div className='box'>*/}
			{/*			<div className='inbox'>*/}
			{/*				<Link href='/login'>Connexion</Link>*/}
			{/*			</div>*/}
			{/*		</div>*/}
			{/*		<div className='box'>*/}
			{/*			<div className='inbox'>*/}
			{/*				<a href='#'>*/}
			{/*					A propos de Centralized*/}
			{/*					<h6>*/}
			{/*						Qui sommes nous? Découvrez tout ce qu&pos;il*/}
			{/*						y a à savoir sur nous*/}
			{/*					</h6>*/}
			{/*				</a>*/}
			{/*			</div>*/}
			{/*		</div>*/}
			{/*		<div className='box'>*/}
			{/*			<div className='inbox'>*/}
			{/*				<a href='#'>*/}
			{/*					Nous contacter*/}
			{/*					<h6>Besoin d&pos;aide? Contactez-nous!</h6>*/}
			{/*				</a>*/}
			{/*			</div>*/}
			{/*		</div>*/}
			{/*	</div>*/}
			{/*	<div className='container bottom'>*/}
			{/*		<div className='box bottom line'>*/}
			{/*			<div className='inbox'>*/}
			{/*				<a href='#'>*/}
			{/*					<h6>Conditions</h6>*/}
			{/*				</a>*/}
			{/*			</div>*/}
			{/*			<div className='inbox'>*/}
			{/*				<a href='#'>*/}
			{/*					<h6>Politique de confidentialité</h6>*/}
			{/*				</a>*/}
			{/*			</div>*/}
			{/*		</div>*/}
			{/*		<div className='box bottom'>*/}
			{/*			<div className='inbox'>*/}
			{/*				<h6>Copyright © 2024 Centralized</h6>*/}
			{/*			</div>*/}
			{/*		</div>*/}
			{/*		<div className='box bottom media'>*/}
			{/*			<div className='social'>*/}
			{/*				<div className='container'>*/}
			{/*					<div className='effect thurio'>*/}
			{/*						<div className='buttons'>*/}
			{/*							<a*/}
			{/*								href='https://x.com/Centralized_app'*/}
			{/*								target='_blank'*/}
			{/*								className='tw'*/}
			{/*								title='Join us on Twitter'*/}
			{/*							>*/}
			{/*								<img*/}
			{/*									src='/assets/vitrine/twitter.png'*/}
			{/*									className='fa fa-twitter'*/}
			{/*									aria-hidden='true'*/}
			{/*								/>*/}
			{/*							</a>*/}
			{/*							<a*/}
			{/*								href='#'*/}
			{/*								target='_blank'*/}
			{/*								className='insta'*/}
			{/*								title='Join us on Instagram'*/}
			{/*							>*/}
			{/*								<img*/}
			{/*									src='/assets/vitrine/instagram.png'*/}
			{/*									className='fa fa-instagram'*/}
			{/*									aria-hidden='true'*/}
			{/*								/>*/}
			{/*							</a>*/}
			{/*							<a*/}
			{/*								href='https://www.linkedin.com/in/Centralized/'*/}
			{/*								target='_blank'*/}
			{/*								className='in'*/}
			{/*								title='Join us on Linked In'*/}
			{/*							>*/}
			{/*								<img*/}
			{/*									src='/assets/vitrine/linkedin.png'*/}
			{/*									className='fa fa-linkedin'*/}
			{/*									aria-hidden='true'*/}
			{/*								/>*/}
			{/*							</a>*/}
			{/*						</div>*/}
			{/*					</div>*/}
			{/*				</div>*/}
			{/*			</div>*/}
			{/*		</div>*/}
			{/*	</div>*/}
			{/*</footer>*/}
		</>
	);
}
