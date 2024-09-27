import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from "typeorm";
import { Planning } from "./Planning";
import { User } from "./User";
import { StatusEnum } from "../enum";
@Entity()
export class Ticket {
  @PrimaryGeneratedColumn("uuid")
  private id: string;

  @Column()
  private title: string;

  @Column()
  private description: string;
  @Column()
  private urgenceId: number;

  @Column()
  private status: StatusEnum;

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

  @UpdateDateColumn()
  private updated_at: Date;

  constructor(
    title: string,
    description: string,
    urgenceId: number,
    status: StatusEnum,
    planningId: string,
    start_date: Date,
    end_date: Date,
    updated_at: Date
  ) {
    this.title = title;
    this.description = description;
    this.urgenceId = urgenceId;
    this.status = status;
    this.planningId = planningId;
    this.start_date = start_date;
    this.end_date = end_date;
    this.updated_at = updated_at
  }

  public getId(): string {
    return this.id;
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
  public setStatus(status: StatusEnum): void {
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

  public setUpdated_at(updated_at: Date): void {
    this.updated_at = updated_at;
  }
  public getUpdated_at(): Date {
    return this.updated_at;
  }
}

