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
    OneToOne,
    OneToMany,
} from "typeorm"
import { Project } from "./Project"
@Entity()
export class Rex {

    @PrimaryGeneratedColumn("uuid")
    private id: string

    @Column()
    private answer1: string
    @Column()
    private answer2: string
    @Column()
    private answer3: string

    @OneToOne(() => Project, { persistence: false }) // Init one to one relation with User
    @JoinColumn() // Join user table with FavoriteList table
    public project: Project

    constructor(answer1: string, answer2: string, answer3: string) {
        this.answer1 = answer1;
        this.answer2 = answer2;
        this.answer3 = answer3;
    }

    public getId(): string {
        return this.id;
    }
    public setAnswer1(answer1: string): void {
        this.answer1 = answer1;
    }
    public getAnswer1(): string {
        return this.answer1;
    }
    public setAnswer2(answer2: string): void {
        this.answer2 = answer2;
    }
    public getAnswer2(): string {
        return this.answer2;
    }
    public setAnswer3(answer3: string): void {
        this.answer3 = answer3;
    }
    public getAnswer3(): string {
        return this.answer3;
    }

    public getProject(): Project {
        return this.project;
    }
    public setProject(project: Project) {
        this.project = project;
    }

}
