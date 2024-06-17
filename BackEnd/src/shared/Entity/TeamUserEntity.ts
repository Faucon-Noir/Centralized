import {
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	CreateDateColumn,
} from "typeorm";
import { User } from "./UserEntity";
import { Team } from "./TeamEntity";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class TeamUser extends BaseEntity {
	@ManyToOne(() => User, (user) => user.teamUser)
	public user: User;

	@ManyToOne(() => Team, (team) => team.teamUser)
	public team: Team;

	constructor(user: User, team: Team) {
		super();
		this.user = user;
		this.team = team;
	}

	public getTeam(): Team {
		return this.team;
	}
	public setTeam(team: Team) {
		this.team = team;
	}
	public getUser(): User {
		return this.user;
	}
	public setUser(User: User) {
		this.user = User;
	}
}
