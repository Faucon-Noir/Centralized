import {
	Entity,
	Column,
	OneToMany,
	JoinColumn,
	ManyToOne,
	OneToOne,
} from "typeorm";
import { IsEmail } from "class-validator";
import { TeamUser } from "./TeamUserEntity";
import { Ticket } from "./TicketEntity";
import { Specification } from "./SpecificationEntity";
import { BaseEntity } from "./BaseEntity";
import { Project } from "./ProjectEntity";
import { Team } from "./TeamEntity";

@Entity()
export class User extends BaseEntity {
	@Column({ nullable: true })
	private avatar: string;

	@Column()
	private lastname: string;

	@Column()
	private firstname: string;

	@Column({ unique: true })
	@IsEmail()
	private mail: string;

	@Column({ nullable: true })
	private phone: string;

	@Column({ nullable: true })
	private bio: string;

	@Column()
	private password: string;

	@OneToMany(() => TeamUser, (teamUser) => teamUser.user)
	public teamUser: TeamUser[];

	@OneToMany(() => Ticket, (ticket) => ticket.user)
	public ticket: Ticket[];

	@OneToMany(() => Specification, (specification) => specification.user)
	public specification: Specification[];

	private roles;

	constructor(
		lastname: string,
		firstname: string,
		mail: string,
		phone: string,
		bio: string,
		password: string,
		avatar: string
	) {
		super();
		this.lastname = lastname;
		this.firstname = firstname;
		this.mail = mail;
		this.phone = phone;
		this.bio = bio;
		this.password = password;
		this.avatar = avatar;
	}

	public getAvatar(): string {
		return this.avatar;
	}
	public setAvatar(avatar: string): void {
		this.avatar = avatar;
	}

	public getLastname(): string {
		return this.lastname;
	}
	public setLastname(lastname: string): void {
		this.lastname = lastname;
	}

	public getFirstname(): string {
		return this.firstname;
	}
	public setFirstname(firstname: string): void {
		this.firstname = firstname;
	}

	public getPassword(): string {
		return this.password;
	}
	public setPassword(password: string): void {
		this.password = password;
	}
	public getMail(): string {
		return this.mail;
	}
	public setMail(Mail: string): void {
		this.mail = Mail;
	}
	public getPhone(): string {
		return this.phone;
	}
	public setPhone(phone: string): void {
		this.phone = phone;
	}
	public getBio(): string {
		return this.bio;
	}
	public setBio(bio: string): void {
		this.bio = bio;
	}

	public getRoles() {
		this.roles = ["USER"];
		return this.roles;
	}
	public setTeamUser(teamUser: TeamUser[]) {
		this.teamUser = this.teamUser;
	}
	public getTeamUser(): TeamUser[] {
		return this.teamUser;
	}

	public setTicket(ticket: Ticket[]) {
		this.ticket = this.ticket;
	}
	public getTicket(): Ticket[] {
		return this.ticket;
	}

	public setSpecification(specification: Specification[]) {
		this.specification = this.specification;
	}
	public getSpecification(): Specification[] {
		return this.specification;
	}
}
