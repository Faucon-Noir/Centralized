import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  Index,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { IsEmail } from "class-validator";
import { TeamUser } from "./TeamUser";
import { Cdc } from "./Cdc";

@Entity()
export class Team {
  @PrimaryGeneratedColumn("uuid")
  private id: string;

  @Column({ nullable: true })
  avatar: string;

  @Column()
  private name: string;

  @CreateDateColumn()
  private created_at: Date;

  @OneToMany(() => TeamUser, (teamUser) => teamUser.team)
  public teamUser: TeamUser[];

  @OneToMany(() => Cdc, (cdc) => cdc.team)
  public cdc: Cdc[];

  constructor(avatar: string, name: string) {
    this.avatar = avatar;
    this.name = name;
  }

  public getId(): string {
    return this.id;
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
  public setCdc(cdc: Cdc[]) {
    this.cdc = this.cdc;
  }
  public getCdc(): Cdc[] {
    return this.cdc;
  }
}
