import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { IsEmail } from "class-validator";
import { TeamUser } from "./TeamUser";
import { Ticket } from "./Ticket";
import { Cdc } from "./Specification";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  private id: string;

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

  @CreateDateColumn()
  private created_at: Date;

  @OneToMany(() => TeamUser, (teamUser) => teamUser.user)
  public teamUser: TeamUser[];

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  public ticket: Ticket[];

  @OneToMany(() => Cdc, (cdc) => cdc.user)
  public cdc: Cdc[];

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
    this.lastname = lastname;
    this.firstname = firstname;
    this.mail = mail;
    this.phone = phone;
    this.bio = bio;
    this.password = password;
    this.avatar = avatar;
  }

  public getId(): string {
    return this.id;
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

  public getCreated_at(): Date {
    return this.created_at;
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

  public setCdc(cdc: Cdc[]) {
    this.cdc = this.cdc;
  }
  public getCdc(): Cdc[] {
    return this.cdc;
  }
}
