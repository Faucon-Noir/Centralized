import {
	JsonController,
	Param,
	Body,
	Get,
	Post,
	Delete,
	UseBefore,
	Patch,
} from "routing-controllers";
import { AppDataSource } from "../db/data-source";
import { Ticket } from "../entity/Ticket";
import { Planning } from "../entity/Planning";
import { User } from "../entity/User";
import { CheckAuth } from "../middleware/Auth";

import "reflect-metadata";

import * as dotenv from "dotenv";
import { SuccessDto, ErrorDto } from "../dto/ResultDto";
import { TicketDto } from "../dto/TicketDto";
dotenv.config();

@JsonController()
export class TicketController {
	private clientUrl = "http://localhost:8000";

	constructor(
		private ticketRepository,
		private planningRepository,
		private userRepository
	) {
		this.ticketRepository = AppDataSource.getRepository(Ticket);
		this.planningRepository = AppDataSource.getRepository(Planning);
		this.userRepository = AppDataSource.getRepository(User);
	}

	/**
	 * @swagger
	 * /ticket:
	 *   post:
	 *     tags:
	 *       - Ticket
	 *     summary: Create a new ticket
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/Ticket'
	 *     responses:
	 *       200:
	 *         description: The ticket was created
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Ticket'
	 */
	@Post("/ticket")
	@UseBefore(CheckAuth)
	/**
	 * Creates a new ticket.
	 * @param data - The ticket data.
	 * @returns An object indicating the success or error message.
	 */
	public async createTicket(
		@Body() data: Ticket
	): Promise<SuccessDto | ErrorDto> {
		try {
			const planning = await this.planningRepository.findOne({
				where: { id: data.getPlanning() },
			});
			if (!planning) {
				throw new Error("Planning not found");
			}

			const user = await this.userRepository.findOne({
				where: { id: data.getUser() },
			});
			if (!user) {
				throw new Error("User not found");
			}

			const ticket: Ticket = data;
			ticket.setPlanning(planning);
			ticket.setUser(user);
			if (!ticket) throw new Error("Ticket not created");

			await this.ticketRepository.save(ticket);
			return { success: "Ticket created" };
		} catch (error) {
			return { error: error.message };
		}
	}

	/**
	 * @swagger
	 * /ticket/{id}:
	 *   patch:
	 *     tags:
	 *       - Ticket
	 *     summary: Update a ticket
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: The ticket ID
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/Ticket'
	 *     responses:
	 *       200:
	 *         description: The ticket was updated
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Ticket'
	 */
	@Patch("/ticket/:id")
	@UseBefore(CheckAuth)
	/**
	 * Updates a ticket with the specified ID.
	 * @param id - The ID of the ticket to update.
	 * @param data - The updated ticket data.
	 * @returns An object indicating the success or error message.
	 */
	public async update(
		@Param("id") id: string,
		@Body() data: Ticket
	): Promise<SuccessDto | ErrorDto> {
		try {
			const ticket: Ticket = await this.ticketRepository.findOne({
				where: { id },
			});
			if (!ticket) throw new Error("Ticket not found");

			await this.ticketRepository.save({ ...ticket, ...data });
			return { success: "Ticket updated" };
		} catch (err) {
			return { error: err.message };
		}
	}

	/**
	 * @swagger
	 * /ticket/{id}:
	 *   get:
	 *     tags:
	 *       - Ticket
	 *     summary: Retrieve a single ticket by its ID
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: The ID of the ticket to retrieve
	 *     responses:
	 *       200:
	 *         description: The ticket was found
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Ticket'
	 *       404:
	 *         description: The ticket was not found
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Error'
	 */
	@Get("/ticket/:id")
	@UseBefore(CheckAuth)
	/**
	 * Retrieves a single ticket by its ID.
	 * @param id - The ID of the ticket to retrieve.
	 * @returns The ticket object if found, otherwise an error object.
	 */
	public async getOne(@Param("id") id: string): Promise<Ticket | ErrorDto> {
		try {
			const ticket: Ticket = await this.ticketRepository.findOne({
				where: { id },
			});
			if (!ticket) throw new Error("Account not found");
			return ticket;
		} catch (err) {
			return { error: err.message };
		}
	}

	/**
	 * @swagger
	 * /ticket/planning/{planningid}:
	 *   get:
	 *     tags:
	 *       - Ticket
	 *     summary: Récupère tous les tickets associés à une planification spécifique
	 *     parameters:
	 *       - in: path
	 *         name: planningid
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: L'ID de la planification
	 *     responses:
	 *       200:
	 *         description: Les tickets ont été récupérés avec succès
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Ticket'
	 *       404:
	 *         description: Les tickets n'ont pas été trouvés
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Error'
	 */
	@Get("/ticket/planning/:planningid")
	@UseBefore(CheckAuth)
	/**
	 * Retrieves all tickets associated with a specific planning.
	 * @param planningid - The ID of the planning.
	 * @returns A Promise that resolves to the ticket associated with the planning, or an error object if not found.
	 */
	public async getAllTicketByPlanning(
		@Param("planningid") planningid: string
	): Promise<Ticket | ErrorDto> {
		try {
			const ticket: Ticket = await this.ticketRepository.find({
				where: { planning: { id: planningid } },
			});
			if (!ticket) throw new Error("Ticket not found");
			return ticket;
		} catch (err) {
			return { error: err.message };
		}
	}

	/**
	 * @swagger
	 * /ticket/project/{projectid}:
	 *   get:
	 *     tags:
	 *       - Ticket
	 *     summary: Récupère tous les tickets associés à un projet spécifique
	 *     parameters:
	 *       - in: path
	 *         name: projectid
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: L'ID du projet
	 *     responses:
	 *       200:
	 *         description: Les tickets ont été récupérés avec succès
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Ticket'
	 *       404:
	 *         description: Les tickets n'ont pas été trouvés
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Error'
	 */
	@Get("/ticket/project/:projectid")
	@UseBefore(CheckAuth)
	/**
	 * Retrieves all tickets associated with a specific project.
	 * @param projectid - The ID of the project.
	 * @returns A promise that resolves to the array of tickets or an error object.
	 */
	public async getAllTicketByProject(
		@Param("projectid") projectid: string
	): Promise<Ticket | ErrorDto> {
		try {
			const planning: Planning = await this.planningRepository.find({
				where: { project: { id: projectid } },
			});
			const ticket: Ticket = await this.ticketRepository.find({
				where: { planning: { id: planning[0].getId() } },
			});
			if (!ticket) throw new Error("Ticket not found");
			return ticket;
		} catch (err) {
			return { error: err.message };
		}
	}

	/**
	 * @swagger
	 * /ticket/user/{userid}:
	 *   get:
	 *     tags:
	 *       - Ticket
	 *     summary: Récupère tous les tickets associés à un utilisateur spécifique
	 *     parameters:
	 *       - in: path
	 *         name: userid
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: L'ID de l'utilisateur
	 *     responses:
	 *       200:
	 *         description: Les tickets ont été récupérés avec succès
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Ticket'
	 *       404:
	 *         description: Les tickets n'ont pas été trouvés
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Error'
	 */
	@Get("/ticket/user/:userid")
	@UseBefore(CheckAuth)
	/**
	 * Retrieves all tickets associated with a specific user.
	 * @param userid - The ID of the user.
	 * @returns A Promise that resolves to the ticket associated with the user, or an error message if not found.
	 */
	public async getAllTicketByUser(
		@Param("userid") userid: string
	): Promise<TicketDto[] | ErrorDto> {
		try {
			const ticket = await this.ticketRepository
				.createQueryBuilder("ticket")
				.innerJoin(
					"ticket.planning",
					"planning",
					"ticket.user = :userid",
					{ userid: userid }
				)
				.select(["ticket", "planning.project"])
				.getRawMany();

			if (!ticket) throw new Error("Ticket not found");
			return ticket;
		} catch (err) {
			return { error: err.message };
		}
	}

	/**
	 * @swagger
	 * /ticket/{id}:
	 *   delete:
	 *     tags:
	 *       - Ticket
	 *     summary: Supprime un ticket par son ID
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: L'ID du ticket à supprimer
	 *     responses:
	 *       200:
	 *         description: Le ticket a été supprimé avec succès
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 success:
	 *                   type: string
	 *                   description: Message de succès
	 *       404:
	 *         description: Le ticket n'a pas été trouvé
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: string
	 *                   description: Message d'erreur
	 */
	@Delete("/ticket/:id")
	@UseBefore(CheckAuth)
	/**
	 * Removes a ticket by its ID.
	 * @param id - The ID of the ticket to be removed.
	 * @returns A promise that resolves to an object with a success property if the ticket is deleted successfully, or an error property if an error occurs.
	 */
	public async remove(
		@Param("id") id: string
	): Promise<SuccessDto | ErrorDto> {
		try {
			const ticket: Ticket = await this.ticketRepository.findOne({
				where: { id },
			});
			if (!ticket) throw new Error("Ticket not found");
			await this.ticketRepository.remove(ticket);
			return { success: "Ticket deleted" };
		} catch (err) {
			return { error: err.message };
		}
	}
}
