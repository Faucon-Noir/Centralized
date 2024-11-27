import { JsonController, Param, Body, Get, Delete, UseBefore, Patch } from "routing-controllers";
import { AppDataSource } from "../db/data-source";
import { Project } from "../entity/Project";
import { Cdc } from "../entity/Specification";
import { Team } from "../entity/Team";
import { CheckAuth } from "../middleware/Auth";
import "reflect-metadata";
import * as dotenv from "dotenv";
import { ErrorDto, SuccessDto } from "../dto/ResultDto";
import { ProjectDto } from "../dto/ProjectDto";
import { SpecificationDto } from "../dto/SpecificationDto";

dotenv.config();

@JsonController()
export class ProjectController {
	constructor(private projectRepository, private cdcRepository, private teamRepository) {
		this.projectRepository = AppDataSource.getRepository(Project);
		this.cdcRepository = AppDataSource.getRepository(Cdc);
		this.teamRepository = AppDataSource.getRepository(Team);
	}

	/**
	 * @swagger
	 * /project/{id}:
	 *   get:
	 *     tags:
	 *       - Project
	 *     summary: Retrieves a single project by its ID.
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: The ID of the project to retrieve.
	 *     responses:
	 *       200:
	 *         description: The project object if found.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Project'
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
	@Get("/project/:id")
	@UseBefore(CheckAuth)
	/**
	 * Retrieves a single project by its ID.
	 * @param id - The ID of the project to retrieve.
	 * @returns The project object if found, otherwise an error object.
	 */
	public async getOne(@Param("id") id: string) {
		try {
			const project: ProjectDto = await this.projectRepository.findOne({
				where: { id },
			});
			if (!project) throw new Error("Project not found");
			const cdc: SpecificationDto = await this.cdcRepository.findOne({
				where: { project: { id: id } },
			});
			return { projectData: project, cdcData: cdc };
		} catch (err) {
			return { error: err.message };
		}
	}

	/**
	 * @swagger
	 * /project/user/{userid}:
	 *   get:
	 *     tags:
	 *       - Project
	 *     summary: Retrieves all projects associated with a specific user.
	 *     parameters:
	 *       - in: path
	 *         name: userid
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: The ID of the user.
	 *     responses:
	 *       200:
	 *         description: The project object if found.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Project'
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
	@Get("/project/user/:userid")
	@UseBefore(CheckAuth)
	/**
	 * Retrieves all projects associated with a specific user.
	 * @param userid - The ID of the user.
	 * @returns A Promise that resolves to the project associated with the user.
	 * @throws An error if the project is not found.
	 */
	public async getAllPojectByUser(@Param("userid") userid: string) {
		try {
			const project = await this.projectRepository
			.createQueryBuilder("project")
			// Pour s'assurer que le projet est bien géré par une équipe de l'utilisateur
			.innerJoin("project.team", "team")
			.innerJoinAndSelect("project.cdc", "cdc")
			.innerJoin("team.teamUser", "teamUser")
			.innerJoin(
				"teamUser.user",
				"TeamLimit",
				"teamUser.user = :userid",
				{ userid: userid }
			)
			.getMany();
			return project;
		} catch (err) {
			return { error: err.message };
		}
	}

	/**
	 * @swagger
	 * /project/{id}:
	 *   delete:
	 *     tags:
	 *       - Project
	 *     summary: Removes a project by its ID.
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: The ID of the project to be removed.
	 *     responses:
	 *       200:
	 *         description: The project was successfully deleted.
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
	@Delete("/project/:id")
	@UseBefore(CheckAuth)
	/**
	 * Removes a project by its ID.
	 * @param id - The ID of the project to be removed.
	 * @returns A promise that resolves to an object indicating the success or error message.
	 */
	public async remove(@Param("id") id: string): Promise<SuccessDto | ErrorDto> {
		try {
			const project: ProjectDto = await this.projectRepository.findOne({
				where: { id },
			});
			if (!project) throw new Error("Project not found");
			await this.projectRepository.remove(project);
			return { success: "Project deleted" };
		} catch (err) {
			return { error: err.message };
		}
	}

	/**
	 * @swagger
	 * /project/{id}:
	 *   patch:
	 *     tags:
	 *       - Project
	 *     summary: Updates a project by its ID.
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: The ID of the project to be updated.
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/Project'
	 *     responses:
	 *       200:
	 *         description: The project was successfully updated.
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
	@Patch("/project/:id")
	@UseBefore(CheckAuth)
	/**
	 * Updates a project with the specified ID.
	 * @param id - The ID of the project to update.
	 * @param data - The updated project data.
	 * @returns An object indicating the success or error message.
	 */
	public async update(@Param("id") id: string, @Body() data: ProjectDto): Promise<SuccessDto | ErrorDto> {
		try {
			const project: Project = await this.projectRepository.findOne({
				where: { id },
			});
			if (!project) throw new Error("Project not found");

			await this.projectRepository.save({ ...project, ...data });
			return { success: "Project updated" };
		} catch (err) {
			return { error: err.message };
		}
	}
}
