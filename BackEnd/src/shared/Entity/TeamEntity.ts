import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	OneToMany,
	JoinColumn,
	ManyToOne,
	OneToOne,
} from "typeorm";
import { TeamUser } from "./TeamUserEntity";
import { Specification } from "./SpecificationEntity";
import { BaseEntity } from "./BaseEntity";
import { Project } from "./ProjectEntity";
import { User } from "./UserEntity";

@Entity()
export class Team extends BaseEntity {
	@Column({ nullable: true })
	avatar: string;

	@Column()
	private name: string;

	@CreateDateColumn()
	private created_at: Date;

	@OneToMany(() => TeamUser, (teamUser) => teamUser.team)
	public teamUser: TeamUser[];

	@OneToMany(() => Specification, (Specification) => Specification.team)
	public Specification: Specification[];

	constructor(avatar: string, name: string) {
		super();
		this.avatar = avatar;
		this.name = name;
	}

	public getName(): string {
		return this.name;
	}
	public setName(name: string): void {
		this.name = name;
	}
	public getAvatar(): string {
		return this.avatar;
	}
	public setAvatar(avatar: string): void {
		this.avatar = avatar;
	}
	public getCreated_at(): Date {
		return this.created_at;
	}
	public getTeamUser(): TeamUser[] {
		return this.teamUser;
	}
	public setTeamUser(teamUser: TeamUser[]) {
		this.teamUser = this.teamUser;
	}
	public setSpecification(Specification: Specification[]) {
		this.Specification = this.Specification;
	}
	public getSpecification(): Specification[] {
		return this.Specification;
	}
}
