import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Project } from "./Project";
import { User } from "./User";
import { Team } from "./Team";
@Entity()
export class Cdc {
  @PrimaryGeneratedColumn("uuid")
  private id: string;

  @Column({ length: 15000 })
  private cdc: string;

  @OneToOne(() => Project, (project) => project.cdc, { persistence: false }) // Init one to one relation with User
  @JoinColumn() // Join user table with FavoriteList table
  public project: Project;

  @ManyToOne(() => User, (user) => user.cdc)
  public user: User;

  @ManyToOne(() => Team, (team) => team.teamUser)
  public team: Team;

  constructor(cdc: string) {
    this.cdc = cdc;
  }

  public getId(): string {
    return this.id;
  }
  public setCdc(cdc: string): void {
    this.cdc = cdc;
  }
  public getCdc(): string {
    return this.cdc;
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
