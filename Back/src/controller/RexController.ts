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
	Controller,
} from "routing-controllers";
import { AppDataSource } from "../db/data-source";
import { Rex } from "../entity/Rex";
import { Project } from "../entity/Project";
import { CheckAuth } from "../middleware/Auth";

import "reflect-metadata";

import * as dotenv from "dotenv";
import { SuccessDto, ErrorDto } from "../dto/ResultDto";
import { RexDto } from "../dto/RexDto";
dotenv.config();

@Controller()
export class RexController {
	private clientUrl = "http://localhost:8000";

	constructor(private rexRepository, private projectRepository) {
		this.rexRepository = AppDataSource.getRepository(Rex);
		this.projectRepository = AppDataSource.getRepository(Project);
	}

	/**
	 * @swagger
	 * /rex:
	 *   post:
	 *     tags:
	 *       - Rex
	 *     summary: Create a new Rex
	 *     security:
	 *       - bearerAuth: []
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/Rex'
	 *     responses:
	 *       200:
	 *         description: Rex created
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
	@Post("/rex")
	@UseBefore(CheckAuth)
	/**
	 * Creates a new Rex.
	 * @param data - The data for the new Rex.
	 * @returns A promise that resolves to an object indicating the success or error message.
	 */
	public async createRex(@Body() data: Rex): Promise<SuccessDto | ErrorDto> {
		try {
			const project = await this.projectRepository.findOne({
				where: { id: data.getProject() },
			});
			if (!project) {
				throw new Error("Project not found");
			}
			const dataproject = { status: true };
			const rex: Rex = data;
			if (!rex) throw new Error("Rex not created");
			await this.projectRepository.save({ ...project, ...dataproject });
			await this.rexRepository.save(rex);
			return { success: "Rex created" };
		} catch (error) {
			return { error: error.message };
		}
	}

	/**
	 * @swagger
	 * /rex/{id}:
	 *   get:
	 *     tags:
	 *       - Rex
	 *     summary: Retrieve a Rex by its ID
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: The Rex ID
	 *     responses:
	 *       200:
	 *         description: Rex retrieved
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Rex'
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
	@Get("/rex/:id")
	@UseBefore(CheckAuth)
	/**
	 * Retrieves a single Rex entity by its ID.
	 * @param id - The ID of the Rex entity to retrieve.
	 * @returns The retrieved Rex entity if found, otherwise an object with an error message.
	 */
	public async getOne(@Param("id") id: string): Promise<RexDto | ErrorDto> {
		try {
			const rex: RexDto = await this.rexRepository.findOne({
				where: { id },
			});
			if (!rex) throw new Error("Rex not found");
			return rex;
		} catch (err) {
			return { error: err.message };
		}
	}

	/**
	 * @swagger
	 * /rex/project/{projectid}:
	 *   get:
	 *     tags:
	 *       - Rex
	 *     summary: Retrieve all Rex objects associated with a specific project
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: projectid
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: The project ID
	 *     responses:
	 *       200:
	 *         description: Rex objects retrieved
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: '#/components/schemas/Rex'
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
	@Get("/rex/project/:projectid")
	@UseBefore(CheckAuth)
	/**
	 * Retrieves all Rex objects associated with a specific project.
	 * @param projectid - The ID of the project.
	 * @returns A Promise that resolves to an array of Rex objects.
	 * @throws If the Rex objects are not found, an error is thrown.
	 */
	public async getAllRexByProject(
		@Param("projectid") projectid: string
	): Promise<RexDto | ErrorDto> {
		try {
			const rex: RexDto = await this.rexRepository.findOne({
				where: { project: { id: projectid } },
			});
			if (!rex) throw new Error("Rex not found");
			return rex;
		} catch (err) {
			return { error: err.message };
		}
	}

	/**
	 * @swagger
	 * /rex/{id}:
	 *   patch:
	 *     tags:
	 *       - Rex
	 *     summary: Update a Rex by its ID
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: The Rex ID
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/Rex'
	 *     responses:
	 *       200:
	 *         description: Rex updated
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
	@Patch("/rex/:id")
	@UseBefore(CheckAuth)
	/**
	 * Updates a Rex entity by its ID.
	 * @param id - The ID of the Rex entity to update.
	 * @param data - The updated data for the Rex entity.
	 * @returns An object indicating the success or error message of the update operation.
	 */
	public async update(
		@Param("id") id: string,
		@Body() data: RexDto
	): Promise<SuccessDto | ErrorDto> {
		try {
			const rex: Rex = await this.rexRepository.findOne({
				where: { id },
			});
			if (!rex) throw new Error("Rex not found");

			await this.rexRepository.save({ ...rex, ...data });
			return { success: "Rex updated" };
		} catch (err) {
			return { error: err.message };
		}
	}

	/**
	 * @swagger
	 * /rex/{id}:
	 *   delete:
	 *     tags:
	 *       - Rex
	 *     summary: Delete a Rex by its ID
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: The Rex ID
	 *     responses:
	 *       200:
	 *         description: Rex deleted
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
	@Delete("/rex/:id")
	@UseBefore(CheckAuth)
	/**
	 * Removes a Rex entity by its ID.
	 * @param id - The ID of the Rex entity to be removed.
	 * @returns A promise that resolves to an object indicating the success or error message.
	 */
	public async remove(
		@Param("id") id: string
	): Promise<SuccessDto | ErrorDto> {
		try {
			const rex: RexDto = await this.rexRepository.findOne({
				where: { id },
			});
			if (!rex) throw new Error("Rex not found");
			await this.rexRepository.remove(rex);
			return { success: "Rex deleted" };
		} catch (err) {
			return { error: err.message };
		}
	}
}
