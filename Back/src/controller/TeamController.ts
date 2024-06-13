import {
	JsonController,
	Param,
	Body,
	Get,
	Post,
	Delete,
	UseBefore,
	Patch,
	UploadedFiles,
} from "routing-controllers";
import { AppDataSource } from "../db/data-source";
import { Team } from "../entity/Team";
import { TeamUser } from "../entity/TeamUser";
import { User } from "../entity/User";
import { CheckAuth } from "../middleware/Auth";

import "reflect-metadata";

import * as dotenv from "dotenv";
import { multerConfig } from "../config/multer";
import { TeamUserDto } from "../dto/TeamUserDto";
import { ErrorDto, SuccessDto } from "../dto/ResultDto";
import { UserDto } from "../dto/UserDto";
import { TeamDto } from "../dto/TeamDto";
dotenv.config();

@JsonController()
export class TeamController {
	private clientUrl = "http://localhost:8000";

	constructor(
		private teamRepository,
		private teamuserRepository,
		private userRepository
	) {
		this.teamRepository = AppDataSource.getRepository(Team);
		this.teamuserRepository = AppDataSource.getRepository(TeamUser);
		this.userRepository = AppDataSource.getRepository(User);
	}

	/**
	 * @swagger
	 * /team/{userid}:
	 *   post:
	 *     tags:
	 *       - Team
	 *     summary: Creates a team and adds a user to it
	 *     parameters:
	 *       - in: path
	 *         name: userid
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: The ID of the user to be added to the team
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/Team'
	 *     responses:
	 *       200:
	 *         description: The created team user
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/TeamUser'
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
	@Post("/team/:userid")
	// @UseBefore(CheckAuth)
	/**
	 * Creates a team and adds a user to it.
	 *
	 * @param data - The team data.
	 * @param userid - The ID of the user to be added to the team.
	 * @returns The created team user.
	 */
	public async createTeam(
		@Body() data: Team,
		@Param("userid") userid: string,
		@UploadedFiles("avatar", { options: multerConfig })
		storedFiles: Array<any>
	): Promise<TeamUser | ErrorDto> {
		try {
			const team: Team = data;
			if (!team) throw new Error("Team not created");

			if (storedFiles) {
				const files = storedFiles.map((file) => {
					data.setAvatar(file.filename);
					this.teamRepository.save({ team });
				});
			}

			await this.teamRepository.save(team);

			try {
				const user: User = await this.userRepository.findOne({
					where: { id: userid },
				});
				if (!user) throw new Error("Account not found");

				const teamuser: TeamUser = new TeamUser();
				teamuser.setUser(user);
				teamuser.setTeam(team);
				if (!teamuser) throw new Error("User not added to a Team");

				await this.teamuserRepository.save(teamuser);
				return teamuser;
			} catch (err) {
				return { error: err.message };
			}
		} catch (error) {
			return { error: error.message };
		}
	}

	/**
	 * @swagger
	 * /teamuser:
	 *   post:
	 *     tags:
	 *       - Team
	 *     summary: Adds a user to a team
	 *     security:
	 *       - bearerAuth: []
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/TeamUser'
	 *     responses:
	 *       200:
	 *         description: The added team user
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/TeamUser'
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
	@Post("/teamuser")
	@UseBefore(CheckAuth)
	/**
	 * Adds a user to a team.
	 *
	 * @param data - The data containing the user and team IDs.
	 * @returns The added team user.
	 */
	public async addUserTeam(
		@Body() data: TeamUser
	): Promise<TeamUser | ErrorDto> {
		try {
			var mail = data.getUser();
			const user: User = await this.userRepository.findOne({
				where: { mail },
			});
			if (!user) throw new Error("Account not found");

			const team: Team = await this.teamRepository.findOne({
				where: { id: data.getTeam() },
			});
			if (!team) throw new Error("Team not found");

			const user_in_team = await this.teamuserRepository
				.createQueryBuilder("team_user")
				.leftJoinAndSelect("team_user.user", "user")
				.leftJoinAndSelect("team_user.team", "team")
				.where(
					"user.id = :userId",
					{ userId: data.getUser() },
					"team.id = :teamId",
					{ teamId: data.getTeam() }
				)
				.getCount();

			if (user_in_team >= 1) {
				throw new Error("User is already in this Team");
			}

			const teamuser: TeamUser = data;
			if (!teamuser) throw new Error("User not added to a Team");

			await this.teamuserRepository.save(teamuser);
			return teamuser;
		} catch (err) {
			return { error: err.message };
		}
	}

	/**
	 * @swagger
	 * /teamuser/user/{id}:
	 *   get:
	 *     tags:
	 *       - Team
	 *     summary: Retrieves all teams associated with a user
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: The ID of the user
	 *     responses:
	 *       200:
	 *         description: An array of teams associated with the user
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: '#/components/schemas/Team'
	 *       400:
	 *         description: User not found
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: string
	 */
	@Get("/teamuser/user/:id")
	@UseBefore(CheckAuth)
	/**
	 * Retrieves all teams associated with a user.
	 * @param id - The ID of the user.
	 * @returns A promise that resolves to an array of teams.
	 * @throws An error if the user is not found.
	 */
	public async getAllTeamFromUser(
		@Param("id") id: string
	): Promise<TeamUserDto[] | ErrorDto> {
		try {
			const team_of_user = await this.teamuserRepository
				.createQueryBuilder("team_user")
				.leftJoinAndSelect("team_user.user", "user")
				.leftJoinAndSelect("team_user.team", "team")
				.where("user.id = :userId", { userId: id })
				.getMany();
			if (!team_of_user) throw new Error("User not found");
			return team_of_user;
		} catch (err) {
			return { error: err.message };
		}
	}

	/**
	 * @swagger
	 * /teamuser/{id}:
	 *   get:
	 *     tags:
	 *       - Team
	 *     summary: Retrieves all users from a team
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         schema:
	 *           type: string
	 *         required: true
	 *         description: The ID of the team
	 *     responses:
	 *       200:
	 *         description: A list of users in the team
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: array
	 *               items:
	 *                 $ref: '#/components/schemas/User'
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
	@Get("/teamuser/:id")
	@UseBefore(CheckAuth)
	/**
	 * Retrieves all users from a team.
	 * @param id - The ID of the team.
	 * @returns A Promise that resolves to an array of users in the team.
	 * @throws If the team is not found, an error is thrown.
	 */
	public async getAllUserFromTeam(
		@Param("id") id: string
	): Promise<UserDto[] | ErrorDto> {
		try {
			const users_in_team = await this.teamuserRepository
				.createQueryBuilder("team_user")
				.leftJoinAndSelect("team_user.user", "user")
				.leftJoinAndSelect("team_user.team", "team")
				.where("team.id = :teamId", { teamId: id })
				.getMany();
			if (!users_in_team) throw new Error("Team not found");
			return users_in_team;
		} catch (err) {
			return { error: err.message };
		}
	}

	/**
	 * @swagger
	 * /team/{id}:
	 *   get:
	 *     tags:
	 *       - Team
	 *     summary: Retrieve a single team by its ID
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: The ID of the team to retrieve
	 *     responses:
	 *       200:
	 *         description: The team object if found
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Team'
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
	@Get("/team/:id")
	@UseBefore(CheckAuth)
	/**
	 * Retrieves a single team by its ID.
	 * @param id - The ID of the team to retrieve.
	 * @returns The team object if found, otherwise an error object.
	 */
	public async getOne(@Param("id") id: string): Promise<Team | ErrorDto> {
		try {
			const team: Team = await this.teamRepository.findOne({
				where: { id },
			});
			if (!team) throw new Error("Team not found");
			return team;
		} catch (err) {
			return { error: err.message };
		}
	}

	/**
	 * @swagger
	 * /team/{id}:
	 *   delete:
	 *     tags:
	 *       - Team
	 *     summary: Removes a team by its ID
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         schema:
	 *           type: string
	 *         required: true
	 *         description: The ID of the team to remove
	 *     responses:
	 *       200:
	 *         description: Team deleted
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
	@Delete("/team/:id")
	@UseBefore(CheckAuth)
	/**
	 * Removes a team by its ID.
	 * @param id - The ID of the team to remove.
	 * @returns A promise that resolves to an object indicating the success or error message.
	 */
	public async remove(
		@Param("id") id: string
	): Promise<SuccessDto | ErrorDto> {
		try {
			const team: Team = await this.teamRepository.findOne({
				where: { id },
			});
			if (!team) throw new Error("Team not found");
			await this.teamuserRepository.delete({ team: { id: id } });
			await this.teamRepository.remove(team);
			return { success: "Team deleted" };
		} catch (err) {
			return { error: err.message };
		}
	}

	/**
	 * @swagger
	 * /teamuser/{id}:
	 *   delete:
	 *     tags:
	 *       - Team
	 *     summary: Removes a user from a team
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: The ID of the user to be removed from the team
	 *     responses:
	 *       200:
	 *         description: User deleted from Team
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
	@Delete("/teamuser/:id")
	@UseBefore(CheckAuth)
	/**
	 * Removes a user from a team.
	 * @param id - The ID of the user to be removed from the team.
	 * @returns A success message if the user is successfully removed from the team, or an error message if an error occurs.
	 */
	public async removeUserTeam(
		@Param("id") id: string
	): Promise<SuccessDto | ErrorDto> {
		try {
			const teamuser: TeamUser = await this.teamuserRepository.findOne({
				where: { id },
			});
			if (!teamuser) throw new Error("User cannot be deleted from Team");
			await this.teamuserRepository.remove(teamuser);
			return { success: "User deleted from Team" };
		} catch (err) {
			return { error: err.message };
		}
	}

	/**
	 * @swagger
	 * /project/{teamid}/{userid}:
	 *   post:
	 *     tags:
	 *       - Team
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
	@Patch("/team/:id")
	@UseBefore(CheckAuth)
	/**
	 * Updates a team with the specified ID.
	 * @param id - The ID of the team to update.
	 * @param data - The updated team data.
	 * @returns A promise that resolves to an object indicating the success or error message.
	 */
	//  TODO: Vérifier que j'ai pas fait de la merde sur l'update
	public async update(
		@Param("id") id: string,
		@Body() data: Team,
		@UploadedFiles("avatar", { options: multerConfig })
		storedFiles: Array<any>
	): Promise<SuccessDto | ErrorDto> {
		try {
			const team: Team = await this.teamRepository.findOne({
				where: { id },
			});
			if (!team) throw new Error("Team not found");

			console.log(data);
			// Version avatar
			if (storedFiles) {
				const files = storedFiles.map((file): SuccessDto => {
					data.setAvatar(file.filename);
					this.teamRepository.save({ ...team, ...data });
					return { success: "Team updated" };
				});
			}

			this.teamRepository.save({ ...team, ...data });
			return { success: "Team updated" };
		} catch (err) {
			return { error: err.message };
		}
	}
}
