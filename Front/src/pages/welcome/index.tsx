/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import 'swiper/css';
import './style.scss';
import 'swiper/css/pagination';

import { useEffect, useState } from 'react';

export default function WelcomePage() {
    const [currentImage, setCurrentImage] = useState('/assets/vitrine/second-1.png');
    const [selectedText, setSelectedText] = useState('Text 1');

    const handleTextClick = (image: string, text: string) => {
        setCurrentImage(image);
        setSelectedText(text);
    };
    return (
        <>
            <div className='header'>
                <img src="/assets/logo/ColorLogoLineBlack.png" alt="Logo" className='logo' />
                <div className='connexion'><a href='/login'>Connexion</a></div>
            </div>
            <div className='first'>
                <div className='text'>
                    <h1>Travailler ensemble plus facilement</h1>
                    <h3>Simplifier votre quotidien en gérant vos projet plus simplement</h3>
                    <form className='input'>
                        <input type='text' id='email' name='E-mail' placeholder='E-mail'></input><br></br>
                        <input type='submit' value='Inscrivez-vous !' id='submit'></input>
                    </form>
                </div>
                <img src="/assets/vitrine/MacBook_Air_2022.png" alt="ordi" className='ordi' />
            </div>
            <div className='second'>
                <h1>Centralisez vos besoins</h1>
                <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h3>
                <div className='container'>
                    <div className='textList'>
                        <div
                            onClick={() => handleTextClick('/assets/vitrine/second-1.png', 'Text 1')}
                            className={selectedText === 'Text 1' ? 'selected' : 'Test'}
                        >
                            <div className='box'>
                                <h4 className='title'>Cahier des charges</h4>
                                <h5 className='description'>Gagnez du temps sur la création de vos cahiers des charges grace à notre Intelligence artificielle!</h5>
                            </div>
                        </div>
                        <div
                            onClick={() => handleTextClick('/assets/vitrine/second-2.png', 'Text 2')}
                            className={selectedText === 'Text 2' ? 'selected' : 'Test'}
                        >
                            <div className='box'>
                                <h4 className='title'>Plannifiez vos projet</h4>
                                <h5 className='description'>Générez automatiquement vos tickets pour gagner du temps, et gagner du temps sur l'organisation.</h5>
                            </div>
                        </div>
                        <div
                            onClick={() => handleTextClick('/assets/vitrine/second-3.png', 'Text 3')}
                            className={selectedText === 'Text 3' ? 'selected' : 'Test'}
                        >
                            <div className='box'>
                                <h4 className='title'>Gérer vos équipes</h4>
                                <h5 className='description'>Créer et gérer vos équipes et vos projet avec simplicité.</h5>
                            </div>
                        </div>
                    </div>
                    <div className='imageContainer'>
                        <img src={currentImage} alt="Displayed Image" />
                    </div>
                </div>
            </div>
            <div className='price'>
                <h1>Des prix adaptés à vos besoins</h1>
                <h3></h3>
                {/* <button className='offer'>Comparaison</button> */}
                <div className='gridprice'>
                    <div className='box'>
                        <h3>STANDARD</h3>
                        <h1>6<span className="currency">€</span></h1>
                        <p className='info'>par utilisateur et par mois</p><br></br>
                        <p className='user'>Pour les petites équipes qui ont peu de projet à la fois.</p>
                        <p className='limite'>Les utilisateur sont limités à la création de 5 projets par mois.</p>
                        <a href='#'><button>S'inscrire</button></a>
                    </div>
                    <div className='box'>
                        <h3>PREMIUM</h3>
                        <h1>12<span className="currency">€</span></h1>
                        <p className='info'>par utilisateur et par mois</p><br></br>
                        <p className='user'>Pour les équipes qui ont besoins de gérer plusieurs projet à la fois.</p>
                        <p className='limite'>Les utilisateur sont limités à la création de 20 projets par mois.</p>
                        <a href='#'><button>S'inscrire</button></a>
                    </div>
                    <div className='box right'>
                        <h3>ENTERPRISE</h3>
                        <h1>15<span className="currency">€</span></h1>
                        <p className='info'>par utilisateur et par mois, facturation annuelle</p><br></br>
                        <p className='user'>Pour les entreprises qui produisent plusieurs projets à la fois.</p>
                        <p className='limite'>Les utilisateur sont limités à la création de 50 projets par mois.</p>
                        <a href='#'><button>Contacter notre équipe</button></a>
                    </div>
                </div>
            </div>

        </>
    );
}