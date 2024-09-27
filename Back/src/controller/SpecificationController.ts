import {
	JsonController,
	Param,
	Body,
	Get,
	Post,
	Put,
	Delete,
	Req,
	UseBefore,
	Patch,
} from "routing-controllers";
import { AppDataSource } from "../db/data-source";
import { Planning } from "../entity/Planning";
import { Project } from "../entity/Project";
import { Team } from "../entity/Team";
import { Cdc } from "../entity/Specification";
import { CheckAuth } from "../middleware/Auth";
import { User } from "../entity/User";

import "reflect-metadata";

import axios from "axios";
import * as fs from "fs";
import * as dotenv from "dotenv";
import { Ticket } from "../entity/Ticket";
import { StatusEnum } from "../enum";
import { SuccessDto, ErrorDto } from "../dto/ResultDto";
import { SpecificationDto } from "../dto/SpecificationDto";
import { dirname } from "path";
dotenv.config();

// TODO: Retourner un statut pending tant que l'ia n'as aps terminé de créer un

/**
 * Traite une string pour y extirper toutes les dates
 * @param {string} input
 * @param {string} startDateString
 * @returns {Date[]}
 */
function parseDurations(input: string, startDateString: string): Date[] {
	const durations: Date[] = [];

	const startDate = new Date(startDateString);

	// Define mappings for different units
	const unitMappings: { [key: string]: string } = {
		semaine: "week",
		semaines: "weeks",
		week: "week",
		weeks: "weeks",
		jour: "day",
		jours: "days",
		day: "day",
		days: "days",
		j: "day",
		d: "days",
		heures: "hour",
		heure: "hour",
		hour: "hour",
		hours: "hours",
		h: "hours",
	};

	// Regular expression to match each duration entry
	const regex = /(\d+)\s*([a-zA-Z]+)/g;

	// Match all duration entries in the input string
	let match;
	while ((match = regex.exec(input)) !== null) {
		const value = parseInt(match[1]);
		const unit = unitMappings[match[2].toLowerCase()];

		if (!isNaN(value) && unit) {
			let newDate: Date;

			switch (unit) {
				case "week":
				case "weeks":
					newDate = new Date(
						startDate.getTime() + value * 7 * 24 * 60 * 60 * 1000
					);
					break;
				case "day":
				case "days":
					newDate = new Date(
						startDate.getTime() + value * 24 * 60 * 60 * 1000
					);
					break;
				case "hour":
				case "hours":
					newDate = new Date(
						startDate.getTime() + value * 60 * 60 * 1000
					);
					break;
				default:
					continue; // Unsupported unit
			}

			durations.push(newDate);
		}
	}

	return durations;
}

/**
 * Créé des tickets pour chaque date trouvé dans l'échéancier
 * @param {Project} params
 * @param {Project} project_input
 * @param {Planning} planning_input
 * @param {User} user
 * @param {any} planningRepository
 * @param {any} ticketRepository
 */
async function createTicket(
	params: Project,
	project_input: Project,
	planning_input: Planning,
	user: User,
	planningRepository: any,
	ticketRepository: any
) {
	//On traite l'échéance pour ne récuperer que les dates
	const resultArray = parseDurations(
		params.getForecast(),
		JSON.stringify(project_input.getStartDate())
	);
	let forecastarray = params.getForecast().split(/[;,]/);

	//On recherche l'id du planning pour l'attribuer au nouveau projet
	const planning: Planning = await planningRepository.findOne({
		where: { id: planning_input.getId() },
	});
	if (!planning) throw new Error("Planning not found");

	//On créé un ticket pour chaque date trouvé
	if (resultArray.length > 0) {
		resultArray.forEach(async (date, index) => {
			const ticket: Ticket = new Ticket(
				forecastarray[index], // title
				"", // description
				0, // urgenceId
				StatusEnum.Open, // status
				planning.getId(), // planningId
				project_input.getStartDate(), // start_date
				date, // end_date
				new Date()
			);
			ticket.setUser(user);
			ticket.setPlanning(planning);
			await ticketRepository.save(ticket);
			console.log(`Ticket ${index + 1} créé: ${ticket.getId()}`);
		});
	} else {
		console.log("Pas de durée trouvé, pas de ticket créé");
	}
}
let requestStatus = {
	finished: false,
	data: null
}
@JsonController()
export class SpecificationController {

	constructor(
		private planningRepository,
		private projectRepository,
		private cdcRepository,
		private teamRepository,
		private userRepository,
		private ticketRepository
	) {
		this.planningRepository = AppDataSource.getRepository(Planning);
		this.projectRepository = AppDataSource.getRepository(Project);
		this.cdcRepository = AppDataSource.getRepository(Cdc);
		this.teamRepository = AppDataSource.getRepository(Team);
		this.userRepository = AppDataSource.getRepository(User);
		this.ticketRepository = AppDataSource.getRepository(Ticket);
	}


	/**
	 * @swagger
	 * /project/{teamid}/{userid}:
	 *   post:
	 *     tags:
	 *       - Cdc
	 *     summary: Create a new project
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: teamid
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: The team ID
	 *       - in: path
	 *         name: userid
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: The user ID
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               name:
	 *                 type: string
	 *               description:
	 *                 type: string
	 *               functionality:
	 *                 type: string
	 *               forecast:
	 *                 type: string
	 *               startDate:
	 *                 type: string
	 *                 format: date
	 *               endDate:
	 *                 type: string
	 *                 format: date
	 *               budget:
	 *                 type: number
	 *               technology:
	 *                 type: string
	 *               constraints:
	 *                 type: string
	 *               validation:
	 *                 type: string
	 *               teamUser:
	 *                 type: string
	 *     responses:
	 *       200:
	 *         description: Project created
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 success:
	 *                   type: string
	 *       default:
	 *         description: Unexpected error
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: string
	 */
	@Post("/project/:teamid/:userid")
	@UseBefore(CheckAuth)
	/**
	 * Creates a new project.
	 *
	 * @param params - The project parameters.
	 * @param req - The request object.
	 * @param teamid - The team ID.
	 * @param userid - The user ID.
	 * @returns A success message if the project is created, or an error message if there is an error.
	 */
	public async newproject(
		@Body() params: Project,
		@Req() req: any,
		@Param("teamid") teamid: string,
		@Param("userid") userid: string
	) {
		requestStatus.finished = false;
		requestStatus.data = null;
		//On recherche l'id de la team pour l'attribuer au nouveau projet
		const team: Team = await this.teamRepository.findOne({
			where: { id: teamid },
		});
		if (!team) throw new Error("Team not found");

		//On recherche l'id de l'user pour l'attribuer au nouveau projet
		const user: User = await this.userRepository.findOne({
			where: { id: userid },
		});
		if (!user) throw new Error("User not found");

		const project: Project = await this.projectRepository.find({
			where: { user: { id: userid } },
		});
		let project_nbr = Object.keys(project).length;

		//On initie project_input qu'on rentrera en base de donnée
		var project_input: Project = params;
		project_input.setTeam(team);
		project_input.setUser(user);

		//On initie cdc_input qu'on entre en base de donnée en attendant la réponse de l'ia
		var cdc = "Données en attente";
		var cdc_input: Cdc = new Cdc(cdc);
		cdc_input.setTeam(team);
		cdc_input.setUser(user);
		project_input.setColor(project_nbr++);

		await this.projectRepository.save(project_input);
		console.log(`Projet créé: ${project_input.getId()}`);
		try {
			//On créé la requete a l'ia
			const dataread = await fs.promises.readFile(
				__filename + `/../../template/Template_1.txt`,
				"utf8"
			);
			let content =
				"La génération doit etre en HTML. En suivant ce plan: " +
				dataread +
				" Génère un cahier des charges comme si un humain l'avais rédigé en ajoutant des informations correspondant au projet et en developpant d'avantage le projet pour remplir toutes les catégories pour un projet appelé " +
				params.getName() +
				". Description du projet: " +
				params.getDescription() +
				". Développe d'avantage la description du projet et justifie le besoin de ce projet. Liste des fonctionnalités: " +
				params.getFunctionality() +
				". Developpe la rédatio autour de ces fonctionnalité. Planning prévisionnel: " +
				params.getForecast() +
				". Date de début: " +
				params.getStartDate() +
				". Date de fin: " +
				params.getEndDate() +
				". Budget: " +
				params.getBudget() +
				". Estimme comment ce budget va etre dépensé et justifie le. Technologies du projet: " +
				params.getTechnology() +
				". Jusitifie le choix de ses technologies dans un developpement complet. Les contraintes techniques: " +
				params.getConstraints() +
				". Condition de validation du projet: " +
				params.getValidation() +
				". Chef de projet: " +
				user.getFirstname() +
				" " +
				user.getLastname() +
				". Nom de l'équipe: " +
				team.getName() +
				". Chaque membre de l'équipe et leurs role: " +
				params.getTeamUser();

			//on definie le model et le message à l'ia
			const data = {
				model: process.env.IA_MODEL,
				messages: [{ role: "user", content: content }],
				temperature: 0,
			};

			//On prépare la configuration avec la clef d'api openia et le type
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${process.env.API_KEY}`,
				},
			};

			//on definie le model de backup et le message à l'ia
			const databackup = {
				model: process.env.BACKUP_IA_MODEL,
				messages: [{ role: "user", content: content }],
				temperature: 0,
			};

			//On prépare la configuration avec la clef d'api backup et le type
			const configbackup = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${process.env.BACKUP_API_KEY}`,
				},
			};

			// Requete axios a l'api open ai
			console.log("requete ia");
			axios
				.post(process.env.IA_URL, data, config)
				.then((response) => {
					console.log(response.data.choices[0].message.content);
					cdc = response.data.choices[0].message.content;
					cdc = cdc.replace(/```html/g, "");
					cdc = cdc.split("```")[0];
					cdc_input.setCdc(cdc);
					cdc_input.setProject(project_input);
					this.cdcRepository.save(cdc_input);
					console.log(`Cahier des charges créé`);
					requestStatus.finished = true;
					requestStatus.data = response.data;
					return cdc;
				})
				.catch(async (error) => {
					console.error("Error:", error);
					// If the first request fails, try a backup URL
					console.log("Backup request ia");
					try {
						const backupResponse = await axios.post(
							process.env.BACKUP_IA_URL,
							databackup,
							configbackup
						);
						console.log(
							backupResponse.data.choices[0].message.content
						);
						cdc = backupResponse.data.choices[0].message.content;
						cdc_input.setCdc(cdc);
						cdc_input.setProject(project_input);
						this.cdcRepository.save(cdc_input);
						console.log(`Cahier des charges créé (backup)`);
						requestStatus.finished = true;
						requestStatus.data = cdc_input;
						return cdc;
					} catch (backupError) {
						console.error("Backup Error:", backupError);
						// Handle the backup error appropriately (e.g., throw, log, or return a default value).
					}
				});
			//On initie planning_input qu'on rentrera en base de donnée
			const planning_input: Planning = new Planning(
				params.getStartDate(),
				params.getEndDate()
			);
			planning_input.setProject(project_input);
			if (!planning_input) throw new Error("Planning not created");
			await this.planningRepository.save(planning_input);
			console.log(`Planning créé: ${planning_input.getId()}`);

			//on appelle la fonction de création de ticket
			createTicket(
				params,
				project_input,
				planning_input,
				user,
				this.planningRepository,
				this.ticketRepository
			);

			return { status: requestStatus.finished };
		} catch (error) {
			return { error: error.message };
		}
	}

	@Get("/specification/check-status")
	@UseBefore(CheckAuth)
	public async checkStatus() {
		return { status: requestStatus.finished };
	}
	/**
	 * @swagger
	 * /cdc/{id}:
	 *   get:
	 *     tags:
	 *       - Cdc
	 *     summary: Retrieve a single Cdc entity by its ID
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         schema:
	 *           type: string
	 *         required: true
	 *         description: The ID of the Cdc entity
	 *     responses:
	 *       200:
	 *         description: The retrieved Cdc entity if found
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Cdc'
	 *       default:
	 *         description: Unexpected error
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: string
	 */
	@Get("/cdc/:id")
	@UseBefore(CheckAuth)
	/**
	 * Retrieves a single Cdc entity by its ID.
	 * @param id - The ID of the Cdc entity.
	 * @returns The retrieved Cdc entity if found, otherwise an error object.
	 */
	public async getOne(
		@Param("id") id: string
	): Promise<SpecificationDto | ErrorDto> {
		try {
			const cdc: SpecificationDto = await this.cdcRepository.findOne({
				where: { id },
			});
			if (!cdc) throw new Error("Cdc not found");
			return cdc;
		} catch (err) {
			return { error: err.message };
		}
	}

	/**
	 * @swagger
	 * /cdc/user/{userid}:
	 *   get:
	 *     tags:
	 *       - Cdc
	 *     summary: Retrieves all CDCs associated with a specific user
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: userid
	 *         schema:
	 *           type: string
	 *         required: true
	 *         description: The ID of the user
	 *     responses:
	 *       200:
	 *         description: A CDC object
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Cdc'
	 *       default:
	 *         description: Unexpected error
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: string
	 */
	@Get("/cdc/user/:userid")
	@UseBefore(CheckAuth)
	/**
	 * Retrieves all CDCs associated with a specific user.
	 * @param userid - The ID of the user.
	 * @returns A Promise that resolves to the retrieved CDCs or an error object.
	 */
	public async getAllCdcByUser(
		@Param("userid") userid: string
	): Promise<SpecificationDto | ErrorDto> {
		try {
			const cdc: SpecificationDto = await this.cdcRepository.find({
				where: { user: { id: userid } },
			});
			if (!cdc) throw new Error("Cdc not found");
			return cdc;
		} catch (err) {
			return { error: err.message };
		}
	}

	/**
	 * @swagger
	 * /cdc/project/{projectid}:
	 *   get:
	 *     tags:
	 *       - Cdc
	 *     summary: Retrieves all CDCs associated with a specific project
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: projectid
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: The ID of the project
	 *     responses:
	 *       200:
	 *         description: A CDC object
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Cdc'
	 *       default:
	 *         description: Unexpected error
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: string
	 */
	@Get("/cdc/project/:projectid")
	@UseBefore(CheckAuth)
	/**
	 * Retrieves all CDCs associated with a specific project.
	 * @param projectid - The ID of the project.
	 * @returns A Promise that resolves to the retrieved CDCs, or an error object if not found.
	 */
	public async getAllCdcByProject(
		@Param("projectid") projectid: string
	): Promise<SpecificationDto | ErrorDto> {
		try {
			const cdc: SpecificationDto = await this.cdcRepository.findOne({
				where: { project: { id: projectid } },
			});
			if (!cdc) throw new Error("Cdc not found");
			return cdc;
		} catch (err) {
			return { error: err.message };
		}
	}

	/**
	 * @swagger
	 * /cdc/{id}:
	 *   delete:
	 *     tags:
	 *       - Cdc
	 *     summary: Removes a Cdc by its ID
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: The ID of the Cdc to remove
	 *     responses:
	 *       200:
	 *         description: Cdc deleted
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 success:
	 *                   type: string
	 *       default:
	 *         description: Unexpected error
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: string
	 */
	@Delete("/cdc/:id")
	@UseBefore(CheckAuth)
	/**
	 * Removes a Cdc by its ID.
	 * @param id - The ID of the Cdc to remove.
	 * @returns A promise that resolves to an object with a success property if the Cdc is deleted successfully, or an error property if an error occurs.
	 */
	public async remove(
		@Param("id") id: string
	): Promise<SuccessDto | ErrorDto> {
		try {
			const cdc: SpecificationDto = await this.cdcRepository.findOne({
				where: { id },
			});
			if (!cdc) throw new Error("Cdc not found");
			await this.cdcRepository.remove(cdc);
			return { success: "Cdc deleted" };
		} catch (err) {
			return { error: err.message };
		}
	}

	/**
	 * @swagger
	 * /cdc/{id}:
	 *   patch:
	 *     tags:
	 *       - Cdc
	 *     summary: Update a Cdc record
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: The id of the Cdc record to update
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/Cdc'
	 *     responses:
	 *       200:
	 *         description: Cdc record updated
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 success:
	 *                   type: string
	 *       default:
	 *         description: Unexpected error
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: string
	 */
	@Patch("/cdc/:id")
	@UseBefore(CheckAuth)
	/**
	 * Updates a Cdc record with the specified id.
	 * @param id - The id of the Cdc record to update.
	 * @param data - The updated data for the Cdc record.
	 * @returns An object indicating the success or error message.
	 */
	public async update(
		@Param("id") id: string,
		@Body() data: Cdc
	): Promise<SuccessDto | ErrorDto> {
		try {
			const cdc = await this.cdcRepository.findOne({
				where: { id },
			});
			if (!cdc) throw new Error("Cdc not found");

			await this.cdcRepository.save({ ...cdc, ...data });
			return { success: "Cdc updated" };
		} catch (err) {
			return { error: err.message };
		}
	}
}
