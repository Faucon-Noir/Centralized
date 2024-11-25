/* eslint-disable @next/next/no-img-element */
'use client';
// import 'swiper/css';
import './style.scss';
// import 'swiper/css/pagination';

import { useRef, useState } from 'react';
import Link from 'next/link';
import React from 'react';

// Icons
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';

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
	console.log(process.env.NEXT_PUBLIC_API_URL);
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
				Alliance de simplicité et d&apos;efficacité pour une gestion de projet optimale. Avec ses fonctionnalités intuitives de suivi, chaque tâche, équipe et objectif est parfaitement visible et maîtrisé.
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
								selectedText === 'Text 1'
									? 'selected-box'
									: 'unselected-box'
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
								selectedText === 'Text 2'
									? 'selected-box'
									: 'unselected-box'
							}
						>
							<div className='box'>
								<h3 className='title'>Plannifiez vos projet</h3>
								<p className='description'>
									Générez automatiquement vos tickets pour
									gagner du temps, et gagner du temps sur
									l&apos;organisation.
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
								selectedText === 'Text 3'
									? 'selected-box'
									: 'unselected-box'
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

			<section className='third'>
				<h1>Améliorer votre manière de travailler</h1>
				<button onClick={handleNextClick} className='arrow'>
					<div className='round'>
						{/* <p>&gt;</p> */}
						<ChevronRightIcon sx={{ height: 32, width: 32 }} />
					</div>
				</button>
				<br />
				<div className='container'>
					<div className='listContainer' ref={listContainerRef}>
						<div className='block'>
							<div className='icon'>💡</div>
							<div className='title'>Gestion de projet</div>
							<div className='description'>
								Planifiez et suivez vos projets de bout en bout
							</div>
						</div>
						<div className='block'>
							<div className='icon'>📊</div>
							<div className='title'>Gestion des tâches</div>
							<div className='description'>
								Organisez et priorisez chaque tâche avec une
								vision claire
							</div>
						</div>
						<div className='block'>
							<div className='icon'>🚀</div>
							<div className='title'>Suivi des équipes</div>
							<div className='description'>
								Gérez vos équipes efficacement et suivez les
								contribution
							</div>
						</div>
						<div className='block'>
							<div className='icon'>📅</div>
							<div className='title'>Calendrier intégré</div>
							<div className='description'>Visualisez les deadlines et les jalons clés en un coup d&apos;œil</div>
						</div>
						<div className='block'>
							<div className='icon'>🎟️</div>
							<div className='title'>Gestion des tickets</div>
							<div className='description'>
								Suivez les demandes et résolvez les incidents
								via un kanban intuitif
							</div>
						</div>
						<div className='block'>
							<div className='icon'>🚀</div>
							<div className='title'>Cahiers des charges</div>
							<div className='description'>Créez des spécifications de projet en quelques clics grâce à l&apos;IA</div>
						</div>
						<div className='block'>
							<div className='icon'>✨</div>
							<div className='title'>Retour d&apos;expérience</div>
							<div className='description'>Analysez les résultats et optimisez vos processus pour les futurs projets</div>
						</div>
						<div className='block'>
							<div className='icon'>📈</div>
							<div className='title'>Performance</div>
							<div className='description'>Évaluez l&apos;avancement et la performance en temps réel</div>
						</div>
						{/* /!* Add more blocks as needed *!/ */}
					</div>
				</div>
			</section>

			<section className='price'>
				<h2>Des prix adaptés à vos besoins</h2>
				{/* <button className='offer'>Comparaison</button> */}
				<div className='grid-price'>
					<article className='box'>
						<div className='edition'>
							Standard
							<div className='price'>
								6<span className='currency'>€</span>
							</div>
							<p className='info'>Par utilisateur et par mois</p>
						</div>
						<div className='description'>
							<p className='user'>
								Pour les petites équipes qui ont peu de projet à
								la fois.
							</p>
							<p className='limit'>
								Les utilisateur sont limités à la création de 5
								projets par mois.
							</p>
						</div>
						<a href='#'>S&apos;inscrire</a>
					</article>
					<article className='box premium'>
						<div className='edition'>
							Premium
							<div className='price'>
								12<span className='currency'>€</span>
							</div>
							<p className='info'>Par utilisateur et par mois</p>
						</div>
						<div className='description'>
							<p className='user'>
								Pour les équipes qui ont besoins de gérer
								plusieurs projet à la fois.
							</p>
							<p className='limit'>
								Les utilisateur sont limités à la création de 20
								projets par mois.
							</p>
						</div>
						<a href='#'>S&apos;inscrire</a>
					</article>
					<article className='box'>
						<div className='edition'>
							Entreprise
							<div className='price'>
								15<span className='currency'>€</span>
							</div>
							<p className='info'>
								Par utilisateur et par mois, facturation
								annuelle
							</p>
						</div>
						<div className='description'>
							<p className='user'>
								Pour les entreprises qui produisent plusieurs
								projets à la fois.
							</p>
							<p className='limit'>
								Les utilisateur sont limités à la création de 50
								projets par mois.
							</p>
						</div>
						<a href='#'>Contacter notre équipe</a>
					</article>
				</div>
			</section>

			<section className='pre-footer'>
				<div className='text'>
					<h2>Simplifier, Centraliser, Ameliorer</h2>
					<p>Accompagner vos projet dès maintenant</p>
				</div>
				<form className='inputs'>
					<input
						type='text'
						id='email'
						name='E-mail'
						placeholder='E-mail'
					></input>
					<button id='submit' type='submit'>
						Inscrivez-vous !
					</button>
				</form>
			</section>

			<footer className='footer'>
				<div className='firstLine'>
					<div className='imgContainer'>
						<img
							src='/assets/logo/WhiteLogoLeft.png'
							alt='Logo'
							className='logo'
						/>
					</div>
					<div className='hrefContainer'>
						<Link href='/login'>Connexion</Link>
					</div>
					<div className='whoContainer'>
						<a href='#'>
							A propos de Centralized
							<h6>
								Qui sommes nous? Découvrez tout ce
								qu&apos;il y a à savoir sur nous
							</h6>
						</a>
					</div>
					<div className='whoContainer'>
						<a href='#'>
							Nous contacter
							<h6>
								Besoin d&apos;aide? Contactez-nous !
							</h6>
						</a>
					</div>
				</div>
				<div className='secondLine'>
					<div className='whoContainer'>
						<a href='#'>
							<h6>Conditions</h6>
						</a>
					</div>
					<div className='whoContainer'>
						<a href='#'>
							<h6>Politique de confidentialité</h6>
						</a>
					</div>
					<div className='whoContainer'>
						<a href='#'>
							<h6>Copyright © 2024 Centralized</h6>
						</a>

					</div>
					<div className='box bottom media'>
						<div className='social'>
							<div className='container'>
								<div className='effect thurio'>
									<div className='buttons'>
										<a
											href='https://x.com/Centralized_app'
											target='_blank'
											className='tw'
											title='Join us on Twitter'
										>
											<XIcon
												sx={{
													transform: 'rotate(-45deg)',
												}}
											/>
										</a>
										<a
											href='#'
											target='_blank'
											className='insta'
											title='Join us on Instagram'
										>
											<InstagramIcon
												sx={{
													transform: 'rotate(-45deg)',
												}}
											/>
										</a>
										<a
											href='https://www.linkedin.com/in/Centralized/'
											target='_blank'
											// className='in'
											title='Join us on LinkedIn'
										>
											<LinkedInIcon
												sx={{
													transform: 'rotate(-45deg)',
												}}
											/>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/*
					
				<div className='container bottom'>
					<div className='box bottom line'>
						<div className='inbox'>
							<a href='#'>
								<h6>Conditions</h6>
							</a>
						</div>
						<div className='inbox'>
							<a href='#'>
								<h6>Politique de confidentialité</h6>
							</a>
						</div>
					</div>
					<div className='box bottom'>
						<div className='inbox'>
							<h6>Copyright © 2024 Centralized</h6>
						</div>
					</div>
					 */}
			</footer >
		</>
	);
}
