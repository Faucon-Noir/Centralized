import React, { useState } from 'react';
import { ButtonGroupStyle, MainBoxStyle } from './style';
import {
	Box,
	ButtonGroup,
	Checkbox,
	Container,
	FormControlLabel,
	Link,
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Poppins } from 'next/font/google';
import confetti from 'canvas-confetti';
import {
	CGUButtonCy,
	ForgotPasswordLinkCy,
	SwitchLoginButtonCy,
	MailFieldCy,
	NameFieldCy,
	PasswordFieldCy,
	PhoneFieldCy,
	SwitchRegisterButtonCy,
	SurnameFieldCy,
	SubmitButtonCy,
	RegistrationFormCy,
} from './const';

const poppins = Poppins({ subsets: ['latin'], weight: '600' });

function RegistrationForm() {
	const router = useRouter();
	const [isRegister, setIsRegister] = useState<boolean>(false);
	const [isErrorLogin, setIsErrorLogin] = useState<number>(0);
	const [isErrorRegister, setIsErrorRegister] = useState<number>(0);
	const [user, setUser] = useState({
		lastname: '',
		firstname: '',
		mail: '',
		phone: '',
		password: '',
	});
	const baseUrl = process.env.NEXT_PUBLIC_API_URL;
	function handleRedirect(e: any) {
		e.preventDefault();

		if (isRegister == false) {
			setIsErrorLogin(0);
			axios
				.post(`${baseUrl}login`, {

					mail: user.mail.trim(),
					password: user.password.trim(),
				})
				.then(function (response) {
					console.log(response);
					if (response.status === 200 && response.data.success) {
						localStorage.setItem('token', response.data.token);
						console.log('logged in');
						router.push('/home');
					} else {
						setIsErrorLogin(1);
					}
				})
				.catch(function (error) {
					console.log(error);
					setIsErrorLogin(1);
				});
		} else {
			setIsErrorRegister(0);

			axios
				.post(`${baseUrl}register`, {
					lastname: user.lastname.trim(),
					firstname: user.firstname.trim(),
					mail: user.mail.trim(),
					phone: user.phone.trim(),
					password: user.password.trim(),
				})
				.then(function (response) {
					if (response.status === 200 && response.data.success) {
						for (let index = 0; index < 20; index++) {
							confetti({
								origin: {
									x: Math.random() - 0.1,
									y: Math.random() - 0.1,
								},
							});
						}

						setTimeout(() => {
							setIsErrorLogin(0);
							setIsErrorRegister(0);
							localStorage.setItem('token', response.data.token);
							router.push('/home');
						}, 1000);
					} else if (
						response.data.error &&
						response.data.error == 'Account existing. Please Login'
					) {
						setIsErrorRegister(1);
					} else {
						setIsErrorRegister(2);
					}
				})
				.catch(function (error) {
					console.log(error);
					setIsErrorRegister(1);
				});
		}
	}

	return (
		<Container data-cy={RegistrationFormCy} maxWidth='sm'>
			<h1 className='welcome'>Bienvenue ✌🏻</h1>
			<Box sx={MainBoxStyle}>
				<Box
					sx={{
						backgroundColor: '#0293FC',
						padding: '4px',
						borderRadius: '16px',
					}}
				>
					<ButtonGroup variant='contained' sx={ButtonGroupStyle}>
						<button
							data-cy={SwitchRegisterButtonCy}
							className='auth_button register_button'
							onClick={() => setIsRegister(true)}
							style={{
								color: isRegister ? 'black' : 'white',
								backgroundColor: isRegister
									? '#FFFFFF'
									: '#0293FC',
							}}
						>
							Inscription
						</button>
						<button
							data-cy={SwitchLoginButtonCy}
							className='auth_button login_button'
							onClick={() => setIsRegister(false)}
							style={{
								color: isRegister ? 'white' : 'black',
								backgroundColor: isRegister
									? '#0293FC'
									: '#FFFFFF',
							}}
						>
							Connexion
						</button>
					</ButtonGroup>
				</Box>
				<div className='form_container'>
					{isRegister ? (
						<div className='line first-line'>
							<div className='row'>
								<label htmlFor='Nom'>Nom</label>
								<input
									data-cy={NameFieldCy}
									type='text'
									placeholder='Jean'
									onChange={(e) =>
										setUser({
											...user,
											firstname: e.target.value,
										})
									}
								/>
							</div>
							<div className='row'>
								<label htmlFor='Nom'>Prénom</label>
								<input
									data-cy={SurnameFieldCy}
									type='text'
									placeholder='Dupont'
									onChange={(e) =>
										setUser({
											...user,
											lastname: e.target.value,
										})
									}
								/>
							</div>
						</div>
					) : null}
					<div className='line second-line'>
						<div className='row full'>
							<label htmlFor='Nom'>Email</label>
							<input
								data-cy={MailFieldCy}
								type='text'
								placeholder='Exemple@gmail.com'
								onChange={(e) =>
									setUser({ ...user, mail: e.target.value })
								}
							/>
						</div>
					</div>
					{isRegister ? (
						<div className='line third-line'>
							<div className='row '>
								<label htmlFor='Nom'>Téléphone portable</label>
								<input
									data-cy={PhoneFieldCy}
									type='Number'
									placeholder='+33 7 XX XX XX XX'
									onChange={(e) =>
										setUser({
											...user,
											phone: e.target.value,
										})
									}
								/>
							</div>
						</div>
					) : null}
					<div className='line fourth-line'>
						<div className='row '>
							<label data-cy={PasswordFieldCy} htmlFor='Nom'>
								Choisissez un mot de passe
							</label>
							<input
								type='password'
								placeholder='**********'
								onChange={(e) =>
									setUser({
										...user,
										password: e.target.value,
									})
								}
							/>
						</div>
					</div>
					{isRegister ? (
						// TODO: ajouter le lien aux CGU
						<FormControlLabel
							data-cy={CGUButtonCy}
							required
							control={<Checkbox />}
							label="J'accepte les conditions d'utilisation"
						/>
					) : (
						<Link
							data-cy={ForgotPasswordLinkCy}
							href='/forgotPassword'
							underline='hover'
							style={{ color: '#0293FC', fontSize: '12px' }}
						>
							Mot de passe oublié ?
						</Link>
					)}
					{isRegister ? (
						isErrorRegister == 0 ? (
							''
						) : (
							<p className='error_message'>
								{isErrorRegister == 1
									? "L'adresse mail existe déjà"
									: "Le compte n'a pas pu être créé"}
							</p>
						)
					) : isErrorLogin == 0 ? (
						''
					) : (
						<p className='error_message'>
							L&apos;adresse mail ou le mot de passe est incorrect
						</p>
					)}
					<button
						data-cy={SubmitButtonCy}
						className='login_button'
						onClick={(e) => handleRedirect(e)}
					>
						{isRegister ? "Je m'inscris" : 'Je me connecte'}
					</button>
				</div>
			</Box>
		</Container>
	);
}

export default RegistrationForm;
