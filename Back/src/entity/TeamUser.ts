import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  ArrayContainedBy,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Team } from "./Team";

@Entity()
export class TeamUser {
  @PrimaryGeneratedColumn()
  private id: string;

  @ManyToOne(() => User, (user) => user.teamUser)
  public user: User;

  @ManyToOne(() => Team, (team) => team.teamUser)
  public team: Team;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  private created_at: Date;

  public getId(): string {
    return this.id;
  }
  public getCreatedAt(): Date {
    return this.created_at;
  }
  public setCreatedAt(created_at: Date): Date {
    return (this.created_at = created_at);
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
