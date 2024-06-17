import { Entity, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { Planning } from "./PlanningEntity";
import { User } from "./UserEntity";
import { BaseEntity } from "./BaseEntity";
import { Project } from "./ProjectEntity";
import { Team } from "./TeamEntity";
@Entity()
export class Ticket extends BaseEntity {
	@Column()
	private title: string;

	@Column()
	private description: string;
	@Column()
	private urgenceId: number;

	@Column()
	private status:
		| "ouvert"
		| "en cours"
		| "en attente"
		| "annulé"
		| "résolu"
		| "rejeté"
		| "en revue";

	@Column()
	private start_date: Date;

	@Column()
	private end_date: Date;

	@Column({ nullable: true })
	public planningId: string;

	@ManyToOne(() => Planning, (planning) => planning.ticket)
	@JoinColumn({ name: "planningId" })
	public planning: Planning;

	@ManyToOne(() => User, (user) => user.ticket)
	public user: User;

	constructor(
		title: string,
		description: string,
		urgenceId: number,
		status:
			| "ouvert"
			| "en cours"
			| "en attente"
			| "annulé"
			| "résolu"
			| "rejeté"
			| "en attente"
			| "en revue",
		planningId: string,
		start_date: Date,
		end_date: Date
	) {
		super();
		this.title = title;
		this.description = description;
		this.urgenceId = urgenceId;
		this.status = status;
		this.planningId = planningId;
		this.start_date = start_date;
		this.end_date = end_date;
	}

	public setTitle(title: string): void {
		this.title = title;
	}
	public getTitle(): string {
		return this.title;
	}
	public setDescription(description: string): void {
		this.description = description;
	}
	public getDescription(): string {
		return this.description;
	}
	public setUrgenceId(urgenceId: number): void {
		this.urgenceId = urgenceId;
	}
	public getUrgenceId(): number {
		return this.urgenceId;
	}
	public setStatus(
		status:
			| "ouvert"
			| "en cours"
			| "en attente"
			| "annulé"
			| "résolu"
			| "rejeté"
			| "en attente"
			| "en revue"
	): void {
		this.status = status;
	}
	public getStatus(): string {
		return this.status;
	}
	public setPlanningId(): string {
		return this.planningId;
	}
	public getPlanningId(): string {
		return this.planningId;
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
	public getPlanning(): Planning {
		return this.planning;
	}
	public setPlanning(planning: Planning) {
		this.planning = planning;
	}
	public getUser(): User {
		return this.user;
	}
	public setUser(user: User) {
		this.user = user;
	}
}
