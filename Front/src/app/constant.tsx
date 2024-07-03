import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import GroupsIcon from '@mui/icons-material/Groups';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';
import { NavItemProps } from './type';

export const navItem = (isRight: boolean): NavItemProps => [
	{
		id: '1',
		icon: <CottageOutlinedIcon fontSize={isRight ? 'large' : 'medium'} />,
		name: 'Accueil',
		alias: 'accueil',
		url: '/',
	},
	{
		id: '2',
		icon: <CalendarTodayIcon fontSize={isRight ? 'large' : 'medium'} />,
		name: 'Mon planning',
		alias: 'planning',
		url: '/planning',
	},
	{
		id: '3',
		icon: <AutoStoriesIcon fontSize={isRight ? 'large' : 'medium'} />,
		name: 'Cahier des charges',
		alias: 'specification',
		url: '/specification',
	},
	{
		id: '4',
		icon: <FindInPageOutlinedIcon fontSize={isRight ? 'large' : 'medium'} />,
		name: 'Tickets',
		alias: 'issues',
		url: '/ticket',
	},
	{
		id: '5',
		icon: <GroupsIcon fontSize={isRight ? 'large' : 'medium'} />,
		name: 'Team',
		alias: 'team',
		url: '/team',
	},
	{
		id: '6',
		icon: <ArchiveOutlinedIcon fontSize={isRight ? 'large' : 'medium'} />,
		name: 'Rex',
		alias: 'rex',
		url: '/rex',
	},
]
export const FormSpecification = [
	{
		name: 'name',
		type: 'text',
		label: 'Nom du projet',
		input: [],
		idError: 1,
		NameError: "Veuillez entrer un nom pour le projet",
		placeholder: "Nom du projet"
	},
	{
		name: 'description',
		type: 'textarea',
		label: 'Description du projet',
		input: [],
		idError: 2,
		NameError: "Veuillez entrer une description du projet",
		placeholder: "Site web servant de vitrine"
	},
	{
		name: 'functionality',
		type: 'textarea',
		label: 'Fonctionnalités du projet',
		input: [],
		idError: 3,
		NameError: "Veuillez entrer les fonctionnalités du projet",
		placeholder: "Afficher des produits, prise de rendez-vous"
	},
	{
		name: 'forecast',
		type: 'textarea',
		label: 'Planning prévisionnel',
		input: [],
		idError: 4,
		NameError: "Veuillez entrer le planning prévisionnel du projet",
		placeholder: "Créer les pages web: 12 heures; Créer un systeme de prise de rendez-vous: 1 semaine, mettre en ligne le site: 3 jours"
	},
	{
		type: 'date',
		input: [
			{
				name: 'start_date',
				label: 'Début du projet',
				idError: 5,
				NameError: "Veuillez entrer une date pour le début du projet"
			},
			{
				name: 'end_date',
				label: 'Fin du projet',
				idError: 6,
				NameError: "Veuillez entrer une date pour la fin du projet"
			},
		],
	},
	{
		name: 'budget',
		type: 'textarea',
		label: 'Budget prévisionnel',
		input: [],
		idError: 7,
		NameError: "Veuillez entrer le budget prévisionnel du projet",
		placeholder: "1 000€"
	},
	{
		name: 'technology',
		type: 'textarea',
		label: 'Technologies du projet',
		input: [],
		idError: 8,
		NameError: "Veuillez entrer les technologies à utiliser pour le projet",
		placeholder: "NodeJS pour le back, NextJS pour le front"
	},
	{
		name: 'constraints',
		type: 'textarea',
		label: 'Contraintes du projet',
		input: [],
		idError: 9,
		NameError: "Veuillez entrer les contraintes du projet",
		placeholder: "Moins de 3 secondes de chargement, facile d'utilisation"
	},
	{
		name: 'validation',
		type: 'textarea',
		label: 'Conditions de validation',
		input: [],
		idError: 10,
		NameError: "Veuillez entrer les conditions de validation du projet",
		placeholder: "Au moins 10 produits affichés correctement et 10 rendez-vous pris par 10 personnes en même temps"
	},
	{
		name: 'team',
		type: 'select',
		label: 'Equipe du projet',
		input: [],
		idError: 11,
		NameError: "Veuillez sélectionner l'équipe du projet"
	},
	{
		name: 'team_user',
		type: 'textarea',
		label: 'Répartition de l\'équipe',
		input: [],
		idError: 12,
		NameError: "Veuillez entrer la répartition des taches du projet",
		placeholder: "Jean Dupont est le lead-dev, Paul Martin est administrateur système et Thomas Lopez est développeur web"
	}
	// ,
	// {
	// 	name: 'template',
	// 	type: 'buttonGroup',
	// 	label: 'Template',
	// 	input: [],
	// 	idError: 13,
	// 	NameError: "Veuillez sélectionner un template",
	// 	placeholder: "Template du projet"
	// }
]

export const FormSpecificationPopup = [
	{
			name: 'template',
			type: 'buttonGroup',
			label: 'Template',
			input: [],
			idError: 13,
			NameError: "Veuillez sélectionner un template",
			placeholder: "Template du projet"
		}
]

export const ListFichierTemplate = [
	{
		name: "template_1",
		emplacement: "/template/Template_1.txt"},
	{
		name: "template_2",
		emplacement: "/template/Template_2.txt"
	},
	{
		name: "template_3",
		emplacement: "/template/Template_3.txt"
	},
	{
		name: "template_4",
		emplacement: "/template/Template_4.txt"
	},
]

export const creationTicket = [
	{
		name: 'title',
		type: 'text',
		label: 'Nom du ticket',
		input: [],
		idError: 1,
		NameError: "Veuillez entrer un nom de ticket"
	},
	{
		type: 'date',
		input: [
			{
				name: 'start_date',
				label: 'Début du ticket',
				idError: 2,
				NameError: "Veuillez entrer une date de début"
			},
			{
				name: 'end_date',
				label: 'Fin du ticket',
				idError: 3,
				NameError: "Veuillez entrer une date de fin"
			},
		],
	},
	{
		name: 'planningId',
		type: 'select',
		label: 'Projet',
		input: [],
		idError: 4,
		NameError: "Veuillez selectionner un projet"
	},
	{
		name: 'urgenceId',
		type: 'select',
		label: 'Urgence',
		input: [],
		idError: 5,
		NameError: "Veuillez définir un degré d'urgence"
	},
	{
		name: 'description',
		type: 'textarea',
		label: 'Description du ticket',
		input: [],
		idError: 6,
		NameError: "Veuillez donner une description pour le ticket"
	}
]

export const templateList = [
	{
		text: "1. Préambule\n2. Description générale\n3. Exigences fonctionnelles\n4. Exigences non fonctionnelles\nApplication\nAnnexe A : Diagrammes de cas d'utilisation\nAnnexe B : Cas d'utilisation\nAnnexe C : Ensembles de champs\nReporting (trimestriel, financier, social)"
	},
	{
		text: "1 Votre projet\n2 Objectifs\n3 Caractéristiques\n4 Fonctionnalités\n5 Contraintes technique\n6 Structure\n7 Design\n8 Déroulement du projet"
	},
	{
		text: "1 Contexte du projet\n2 Objectifs du projet\n3 Périmètre du projet\n4 Aspects fonctionnels\n5 Aspects techniques\n6 Ressources\n7 Délais\n8 Budget"
	},
	{
		text: "1 Présentation générale du projet\n2 Cible et objectifs\n3 Planning et technologies\n4 Après projet"
	}
]