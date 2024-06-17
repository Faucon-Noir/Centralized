import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
	OneToOne,
} from "typeorm";
import { Project } from "./ProjectEntity";
import { User } from "./UserEntity";
import { Team } from "./TeamEntity";
import { BaseEntity } from "./BaseEntity";
@Entity()
export class Specification extends BaseEntity {
	@Column({ length: 15000 })
	private specification: string;

	@OneToOne(() => Project, { persistence: false }) // Init one to one relation with User
	@JoinColumn() // Join user table with FavoriteList table
	public project: Project;

	@ManyToOne(() => User, (user) => user.specification)
	public user: User;

	@ManyToOne(() => Team, (team) => team.teamUser)
	public team: Team;

	constructor(specification: string) {
		super();
		this.specification = specification;
	}

	public setSpecification(specification: string): void {
		this.specification = specification;
	}
	public getSpecification(): string {
		return this.specification;
	}

	public getProject(): Project {
		return this.project;
	}
	public setProject(project: Project) {
		this.project = project;
	}

	public getUser(): User {
		return this.user;
	}
	public setUser(User: User) {
		this.user = User;
	}

	public getTeam(): Team {
		return this.team;
	}
	public setTeam(team: Team) {
		this.team = team;
	}
}
