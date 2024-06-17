import {
	Entity,
	Column,
	JoinColumn,
	OneToOne,
	OneToMany,
	ManyToOne,
	CreateDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Project } from "./ProjectEntity";
import { Ticket } from "./TicketEntity";
import { BaseEntity } from "./BaseEntity";
import { Team } from "./TeamEntity";
import { User } from "./UserEntity";
@Entity()
export class Planning extends BaseEntity {
	@Column()
	private start_date: Date;

	@Column()
	private end_date: Date;

	@OneToOne(() => Project, { persistence: false }) // Init one to one relation with User
	@JoinColumn() // Join user table with FavoriteList table
	public project: Project;

	@OneToMany(() => Ticket, (ticket) => ticket.planning)
	public ticket: Ticket[];

	constructor(start_date: Date, end_date: Date) {
		super();
		this.start_date = start_date;
		this.end_date = end_date;
	}

	public setStartDate(start_date: Date): void {
		this.start_date = start_date;
	}
	public getStartDate(): Date {
		return this.start_date;
	}
	public setEndDate(end_date: Date): void {
		this.end_date = end_date;
	}
	public getEndDate(): Date {
		return this.end_date;
	}
	public getProject(): Project {
		return this.project;
	}
	public setProject(project: Project) {
		this.project = project;
	}
	public setTicket(ticket: Ticket[]) {
		this.ticket = this.ticket;
	}
	public getTicket(): Ticket[] {
		return this.ticket;
	}
}
