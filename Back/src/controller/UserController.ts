import {
	JsonController,
	Param,
	Body,
	Get,
	Post,
	Delete,
	Req,
	UseBefore,
	Patch,
	UploadedFiles,
} from "routing-controllers";
import { AppDataSource } from "../db/data-source";
import { User } from "../entity/User";
import { CheckAuth } from "../middleware/Auth";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as crypto from "crypto";
import "reflect-metadata";
import { NodeMailerSendEmail } from "../email/NodeMailer";
import { multerConfig } from "../config/multer";

import * as dotenv from "dotenv";
import { UserDto } from "../dto/UserDto";
import {
	ErrorDto,
	ErrorAuthDto,
	SuccessDto,
	SuccessAuthDto,
} from "../dto/ResultDto";
dotenv.config();

@JsonController()
export class UserController {
	private clientUrl = "http://localhost:8000";
	private mailer = new NodeMailerSendEmail();

	constructor(private userRepository) {
		this.userRepository = AppDataSource.getRepository(User);
	}

	/**
	 * @swagger
	 * /register:
	 *   post:
	 *     tags:
	 *       - User
	 *     summary: Registers a new user
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/User'
	 *     responses:
	 *       200:
	 *         description: An object indicating the success message if registration is successful
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 success:
	 *                   type: string
	 *       default:
	 *         description: An object containing the error message
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: string
	 */
	@Post("/register")
	/**
	 * Registers a new user.
	 *
	 * @param data - The user data to be registered.
	 * @returns An object indicating the success or error message.
	 */
	public async register(
		@Body() data: User
	): Promise<SuccessAuthDto | ErrorDto> {
		try {
			// verif object existing in data source
			const hasAccountWithEmail: User = await this.userRepository.findOne(
				{
					where: { mail: data.getMail() },
				}
			);
			if (hasAccountWithEmail)
				throw new Error("Account existing. Please Login");

			if (data.getPassword() == "" || !data.getPassword())
				throw new Error("No password provide");

			if (data.getPassword().includes(" "))
				throw new Error("Space cannot be in a password");
			// hash password
			const hash = await bcrypt.hash(data.getPassword(), 10);

			// create object with condition
			const user: User = data;
			if (!user) throw new Error("Account not created");
			user.setPassword(hash);

			await this.userRepository.save(user);

			const token = jwt.sign(
				{
					id: user.getId(),
					roles: user.getRoles(),
				},
				process.env.SEC_KEY,
				{
					expiresIn: "24h",
				}
			);
			if (!token) throw new Error("Error authentication");

			return { success: "Account created", token: token };
		} catch (error) {
			return { error: error.message };
		}
	}

	/**
	 * @swagger
	 * /login:
	 *   post:
	 *     tags:
	 *       - User
	 *     summary: Authenticates a user and generates a JWT token for further authorization
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               mail:
	 *                 type: string
	 *               password:
	 *                 type: string
	 *     responses:
	 *       200:
	 *         description: An object containing the success message and the generated token if authentication is successful
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 success:
	 *                   type: string
	 *                 token:
	 *                   type: string
	 *       default:
	 *         description: An object containing the error message
	 *         content:
	 *           application/json:
	 *             schema:
	 *               type: object
	 *               properties:
	 *                 error:
	 *                   type: string
	 */
	@Post("/login")
	/**
	 * Authenticates a user and generates a JWT token for further authorization.
	 *
	 * @param data - The user data containing the email and password.
	 * @param req - The request object.
	 * @returns An object containing the success message and the generated token if authentication is successful,
	 *          otherwise an object containing the error message.
	 */
	public async login(
		@Body() data: User,
		@Req() req: any
	): Promise<SuccessAuthDto | ErrorDto> {
		try {
			// find object in data source
			const user: User = await this.userRepository.findOne({
				where: { mail: data.getMail() },
			});
			if (!user) throw new Error("Account not found");

			// check if password conform
			const isValid = await bcrypt.compare(
				data.getPassword(),
				user.getPassword()
			);
			if (!isValid) throw new Error("Identifiant/password incorrect");

			const token = jwt.sign(
				{
					id: user.getId(),
					roles: user.getRoles(),
				},
				process.env.SEC_KEY,
				{
					expiresIn: "24h",
				}
			);
			if (!token) throw new Error("Error authentication");

			// await this.mailer.sendMailTicket(
			//   user.getMail(),
			//   "Centralized : votre ticket à été avec succès !",
			//   user.getLastname()
			// );

			return { success: "Account login", token: token };
		} catch (error) {
			return { error: error.message };
		}
	}

	/**
	 * @swagger
	 * /user/{id}:
	 *   get:
	 *     tags:
	 *       - User
	 *     summary: Retrieves a single user by their ID
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         schema:
	 *           type: string
	 *         required: true
	 *         description: The ID of the user to retrieve
	 *     responses:
	 *       200:
	 *         description: The user object if found
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/User'
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
	@Get("/user/:id")
	@UseBefore(CheckAuth)
	/**
	 * Retrieves a single user by their ID.
	 * @param id - The ID of the user to retrieve.
	 * @returns The user object if found, otherwise an error object.
	 */
	public async getOne(@Param("id") id: string): Promise<UserDto | ErrorDto> {
		try {
			const user: UserDto = await this.userRepository.findOne({
				where: { id },
			});
			if (!user) throw new Error("Account not found");
			return user;
		} catch (err) {
			return { error: err.message };
		}
	}

	/**
	 * @swagger
	 * /user/mail/{id}:
	 *   get:
	 *     tags:
	 *       - User
	 *     summary: Retrieves a single user by their mail
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: mail
	 *         schema:
	 *           type: string
	 *         required: true
	 *         description: The mail of the user to retrieve
	 *     responses:
	 *       200:
	 *         description: The user object if found
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/User'
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
	@Get("/user/mail/:mail")
	@UseBefore(CheckAuth)
	/**
	 * Retrieves a single user by their email.
	 * @param id - The ID of the user to retrieve.
	 * @returns The user object if found, otherwise an error object.
	 */
	public async getOneByMail(
		@Param("mail") mail: string
	): Promise<UserDto | ErrorDto> {
		try {
			const user: UserDto = await this.userRepository.findOne({
				where: { mail },
			});
			if (!user) throw new Error("Account not found");
			return user;
		} catch (err) {
			return { error: err.message };
		}
	}

	/**
	 * @swagger
	 * /user/{id}:
	 *   patch:
	 *     tags:
	 *       - User
	 *     summary: Updates a user account
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: The ID of the user account to update
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             $ref: '#/components/schemas/User'
	 *     responses:
	 *       200:
	 *         description: Account updated
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
	@Patch("/user/:id")
	@UseBefore(CheckAuth)
	/**
	 * Updates a user account.
	 * @param id - The ID of the user account to update.
	 * @param data - The updated user data.
	 * @returns An object indicating the success or error message.
	 */
	//   public async update(@Param("id") id: string, @Body() data: User) {
	// try {
	//   const user: User = await this.userRepository.findOne({ where: { id } });
	//       if (!user) throw new Error("Account not found");
	public async update(
		@Param("id") id: string,
		@Body() data: User,
		@UploadedFiles("avatar", { options: multerConfig })
		storedFiles: Array<any>
	): Promise<SuccessDto | ErrorDto> {
		try {
			var user: User = await this.userRepository.findOne({
				where: { id },
			});
			if (!user) throw new Error("Account not found");

			if (storedFiles) {
				const files = storedFiles.map((file) => {
					data.setAvatar(file.filename);
					this.userRepository.save({ ...user, ...data });
				});
			}

			if (data.getPassword() != undefined) {
				// hash password
				const hash = await bcrypt.hash(data.getPassword(), 10);
				data.setPassword(hash);
				this.userRepository.save({ ...user, ...data });
				return { success: "Account updated" };
			}

			this.userRepository.save({ ...user, ...data });
			return { success: "Account updated" };
		} catch (err) {
			return { error: err.message };
		}
	}

	/**
	 * @swagger
	 * /user/{id}:
	 *   delete:
	 *     tags:
	 *       - User
	 *     summary: Removes a user account
	 *     security:
	 *       - bearerAuth: []
	 *     parameters:
	 *       - in: path
	 *         name: id
	 *         required: true
	 *         schema:
	 *           type: string
	 *         description: The ID of the user account to be removed
	 *     responses:
	 *       200:
	 *         description: Account deleted
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
	@Delete("/user/:id/")
	@UseBefore(CheckAuth)
	/**
	 * Removes a user account.
	 * @param id - The ID of the user account to be removed.
	 * @returns A promise that resolves to an object with a success property if the account is deleted, or an error property if an error occurs.
	 */
	public async remove(
		@Param("id") id: string
	): Promise<SuccessDto | ErrorDto> {
		try {
			const user: UserDto = await this.userRepository.findOne({
				where: { id },
			});
			if (!user) throw new Error("Account not found");
			await this.userRepository.remove(user);
			return { success: "Account deleted" };
		} catch (err) {
			return { error: err.message };
		}
	}

	/**
	 * @swagger
	 * /requestResetPassword:
	 *   post:
	 *     tags:
	 *       - User
	 *     summary: Requests a password reset for a user
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               mail:
	 *                 type: string
	 *     responses:
	 *       200:
	 *         description: The password reset link
	 *         content:
	 *           text/plain:
	 *             schema:
	 *               type: string
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
	@Post("/requestResetPassword")
	@UseBefore(CheckAuth)
	/**
	 * Requests a password reset for a user.
	 * @param data - The user data.
	 * @param req - The request object.
	 * @returns The password reset link or an error object.
	 */
	public async requestResetPassword(
		@Body() data: User,
		@Req() req: any
	): Promise<string | ErrorDto> {
		try {
			const user: User = await this.userRepository.findOne({
				where: { mail: data.getMail() },
			});
			if (!user) throw new Error("Account not found");

			let resetToken = crypto.randomBytes(32).toString("hex");
			const hash = await bcrypt.hash(resetToken, 10);

			req.session.token = hash;

			// url page reset password
			const link = `${
				this.clientUrl
			}/passwordReset?token=${resetToken}&id=${user.getId()}`;
			return link;
		} catch (error) {
			return { error: error.message };
		}
	}

	/**
	 * @swagger
	 * /user/resetPassword:
	 *   patch:
	 *     tags:
	 *       - User
	 *     summary: Resets the password for a user
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               token:
	 *                 type: string
	 *               password:
	 *                 type: string
	 *               id:
	 *                 type: string
	 *     responses:
	 *       200:
	 *         description: Password reset
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
	@Patch("/resetPassword")
	@UseBefore(CheckAuth)
	/**
	 * Resets the password for a user.
	 * @param data - The data containing the password reset token and new password.
	 * @param req - The request object.
	 * @returns An object indicating the success or error message.
	 */
	public async resetPassword(
		@Body() data: any,
		@Req() req: any
	): Promise<SuccessDto | ErrorDto> {
		try {
			let passwordResetToken = await req.session.token;
			if (!passwordResetToken)
				throw new Error("Invalid or expired password reset token");

			const isValid = await bcrypt.compare(
				data.token,
				passwordResetToken
			);
			if (!isValid)
				throw new Error("Invalid or expired password reset token");

			const hash = await bcrypt.hash(data.password, 10);

			const user: User = await this.userRepository.findOne({
				where: { id: data.id },
			});
			if (!user) throw new Error("Account not found");
			user.setPassword(hash);

			await this.userRepository.save(user);

			return { success: "Password reset" };
		} catch (error) {
			return { error: error.message };
		}
	}
}
