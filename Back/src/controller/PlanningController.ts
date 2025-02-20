import { JsonController, Param, Body, Get, Post, Delete, UseBefore, Patch } from "routing-controllers";
import { AppDataSource } from "../db/data-source";
import { Planning } from "../entity/Planning";
import { Project } from "../entity/Project";
import { CheckAuth } from "../middleware/Auth";
import "reflect-metadata";
import * as dotenv from "dotenv";
import { PlanningDto } from "../dto/PlanningDto";
import { ErrorDto, SuccessDto } from "../dto/ResultDto";

dotenv.config();

@JsonController()
export class PlanningController {
	constructor(private planningRepository, private projectRepository) {
		this.planningRepository = AppDataSource.getRepository(Planning);
		this.projectRepository = AppDataSource.getRepository(Project);
	}

	/**
	 * @swagger
	 * /planning:
	 *   post:
	 *     tags:
	 *       - Planning
	 *     summary: Creates a new planning.
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/Planning'
	 *     responses:
	 *       200:
	 *         description: The planning was successfully created.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 success:
	 *                   type: string
	 *       400:
	 *         description: Error message.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: string
	 */
	@Post("/planning")
	@UseBefore(CheckAuth)
	/**
	 * Creates a new planning.
	 * @param data The planning data.
	 * @returns An object indicating the success or error message.
	 */
	public async createPlanning(@Body() data: Planning): Promise<SuccessDto | ErrorDto> /*: Promise<PlanningDto | ErrorDto>*/ {
		try {
			const project = await this.projectRepository.findOne({
				where: { id: data.getProject() },
			});
			if (!project) {
				throw new Error("Project not found");
			}

			const planning: Planning = data;
			if (!planning) throw new Error("Planning not created");

			await this.planningRepository.save(planning);
			return { success: "Planning created" };
		} catch (error) {
			return { error: error.message };
		}
	}

	/**
	 * @swagger
	 * /planning/{id}:
	 *   get:
	 *     tags:
	 *       - Planning
	 *     summary: Retrieves a single planning by its ID.
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: The ID of the planning to retrieve.
	 *     responses:
	 *       200:
	 *         description: The planning object if found.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Planning'
	 *       400:
	 *         description: Error message.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: string
	 */
	@Get("/planning/:id")
	@UseBefore(CheckAuth)
	/**
	 * Retrieves a single planning by its ID.
	 * @param id - The ID of the planning to retrieve.
	 * @returns The planning object if found, otherwise an error object.
	 */
	public async getOne(@Param("id") id: string): Promise<Planning | ErrorDto> {
		try {
			const planning: Planning = await this.planningRepository.findOne({
				where: { id },
			});
			if (!planning) throw new Error("Account not found");
			return planning;
		} catch (err) {
			return { error: err.message };
		}
	}

	/**
	 * @swagger
	 * /planning/{id}:
	 *   get:
	 *     tags:
	 *       - Planning
	 *     summary: Retrieves a single planning by its ID.
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: The ID of the planning to retrieve.
	 *     responses:
	 *       200:
	 *         description: The planning object if found.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Planning'
	 *       400:
	 *         description: Error message.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: string
	 */
	@Get("/planning/project/:projectid")
	@UseBefore(CheckAuth)
	/**
	 * Retrieves all planning items for a given project.
	 * @param projectid - The ID of the project.
	 * @returns A Promise that resolves to the planning items for the project, or an error object if not found.
	 */
	public async getAllPlanningByProject(@Param("projectid") projectid: string): Promise<Planning | ErrorDto> {
		try {
			const planning: Planning = await this.planningRepository.find({
				where: { project: { id: projectid } },
			});
			if (!planning) throw new Error("Planning not found");
			return planning;
		} catch (err) {
			return { error: err.message };
		}
	}

	/**
	 * @swagger
	 * /planning/user/{userid}:
	 *   get:
	 *     tags:
	 *       - Planning
	 *     summary: Retrieves all plannings IDs and project name by their user ID.
	 *     parameters:
	 *       - in: path
	 *         name: userid
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: The ID of the user to retrieve.
	 *     responses:
	 *       200:
	 *         description: The planning object if found.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Planning'
	 *       400:
	 *         description: Error message.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: string
	 */
	@Get("/planning/user/:userid")
	@UseBefore(CheckAuth)
	/**
	 * Retrieves all projects name and plannings IDs associated with a specific user.
	 * @param userid - The ID of the user.
	 * @returns A Promise that resolves to the project associated with the user.
	 * @throws An error if the project is not found.
	 */
	public async getAllPlanningByUser(@Param("userid") userid: string): Promise<PlanningDto[] | ErrorDto> {
		try {
			const plannings = await this.planningRepository
				.createQueryBuilder("planning")
				.innerJoin("planning.project", "project", "project.user = :userid", { userid: userid })
				.select(["planning.id", "project.name"])
				.getRawMany();

			if (!plannings) throw new Error("Planning not found");
			return plannings;
		} catch (err) {
			return { error: err.message };
		}
	}

	/**
	 * @swagger
	 * /planning/{id}:
	 *   delete:
	 *     tags:
	 *       - Planning
	 *     summary: Removes a planning by its ID.
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: The ID of the planning to be removed.
	 *     responses:
	 *       200:
	 *         description: The planning was successfully deleted.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 success:
	 *                   type: string
	 *       400:
	 *         description: Error message.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: string
	 */
	@Delete("/planning/:id")
	@UseBefore(CheckAuth)
	/**
	 * Removes a planning by its ID.
	 * @param id - The ID of the planning to be removed.
	 * @returns A promise that resolves to an object indicating the success or error message.
	 */
	public async remove(@Param("id") id: string): Promise<SuccessDto | ErrorDto> {
		try {
			const planning: Planning = await this.planningRepository.findOne({
				where: { id },
			});
			if (!planning) throw new Error("Planning not found");
			await this.planningRepository.remove(planning);
			return { success: "Planning deleted" };
		} catch (err) {
			return { error: err.message };
		}
	}

	@Patch("/planning/:id")
	@UseBefore(CheckAuth)
	/**
	 * Updates a planning record.
	 * @param id - The ID of the planning record to update.
	 * @param data - The updated data for the planning record.
	 * @returns An object indicating the success or error message of the update operation.
	 */
	public async update(@Param("id") id: string, @Body() data: Planning): Promise<SuccessDto | ErrorDto> /*: Promise<PlanningDto | ErrorDto>*/ {
		try {
			const planning: Planning = await this.planningRepository.findOne({
				where: { id },
			});
			if (!planning) throw new Error("Planning not found");

			await this.planningRepository.save({ ...planning, ...data });
			return { success: "Planning updated" };
		} catch (err) {
			return { error: err.message };
		}
	}
}
