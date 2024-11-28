import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
	OneToOne
} from "typeorm";
import { Team } from "./Team";
import { User } from "./User";
import { Cdc } from './Specification';

@Entity()
export class Project {
	@PrimaryGeneratedColumn("uuid")
	private id: string;

	@Column()
	private name: string;

	@Column("text")
	private description: string;

	@Column("text")
	private functionality: string;

	@Column("text")
	private forecast: string;

	@Column()
	private start_date: Date;

	@Column()
	private end_date: Date;

	@Column("text")
	private budget: string;

	@Column("text")
	private technology: string;

	@Column("text")
	private constraints: string;

	@Column("text")
	private validation: string;

	@Column()
	private color: number;

	@Column({ default: 'Member' })
	private teamRole: string;

	@Column()
	private template: string;

	@Column()
	private status: boolean;

	@ManyToOne((type) => User)
	@JoinColumn()
	private user: User;

	@ManyToOne((type) => Team) // Init many to one relation with Localisation
	@JoinColumn()
	public team: Team; // Join user table with Localisation table

	@OneToOne(() => Cdc, (cdc) => cdc.project) // Init many to one relation with Localisation
	public cdc: Cdc; // Join user table with Localisation table

	constructor(
		name: string,
		description: string,
		functionality: string,
		forecast: string,
		start_date: Date,
		end_date: Date,
		budget: string,
		technology: string,
		constraints: string,
		validation: string,
		template: string,
		status: boolean,
		teamRole: string,
		color: number
	) {
		this.name = name;
		this.description = description;
		this.functionality = functionality;
		this.forecast = forecast;
		this.start_date = start_date;
		this.end_date = end_date;
		this.budget = budget;
		this.technology = technology;
		this.constraints = constraints;
		this.validation = validation;
		this.template = template;
		this.status = status;
		this.teamRole = teamRole;
		this.color = color;
	}

	public getId(): string {
		return this.id;
	}
	public getName(): string {
		return this.name;
	}
	public setDescription(description: string): void {
		this.description = description;
	}
	public getDescription(): string {
		return this.description;
	}
	public setFunctionality(functionality: string): void {
		this.functionality = functionality;
	}
	public getFunctionality(): string {
		return this.functionality;
	}
	public setForecast(forecast: string): void {
		this.forecast = forecast;
	}
	public getForecast(): string {
		return this.forecast;
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
	public setBudget(budget: string): void {
		this.budget = budget;
	}
	public getBudget(): string {
		return this.budget;
	}
	public setTechnology(technology: string): void {
		this.technology = technology;
	}
	public getTechnology(): string {
		return this.technology;
	}
	public setConstraints(constraints: string): void {
		this.constraints = constraints;
	}
	public getConstraints(): string {
		return this.constraints;
	}
	public setValidation(validation: string): void {
		this.validation = validation;
	}
	public getValidation(): string {
		return this.validation;
	}
	public setTemplate(template: string): void {
		this.template = template;
	}
	public getTemplate(): string {
		return this.template;
	}
	public setStatus(status: boolean): void {
		this.status = status;
	}
	public getStatus(): boolean {
		return this.status;
	}
	public getTeam(): Team {
		return this.team;
	}
	public setTeam(team: Team) {
		this.team = team;
	}
	public setUser(user: User) {
		this.user = user;
	}
	public getUser(): User {
		return this.user;
	}
	public setTeamRole(teamRole: string): void {
		this.teamRole = teamRole;
	}
	public getTeamRole(): string {
		return this.teamRole;
	}
	public setColor(color: number): void {
		this.color = color;
	}
	public getColor(): number {
		return this.color;
	}
}
