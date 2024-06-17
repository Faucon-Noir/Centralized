import {
	CreateDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

export abstract class BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	public getId(): string {
		return this.id;
	}
	public getCreatedAt(): Date {
		return this.createdAt;
	}
	public getUpdatedAt(): Date {
		return this.updatedAt;
	}
	public setCreatedAt(createdAt: Date): void {
		this.createdAt = createdAt;
	}
	public setUpdatedAt(updatedAt: Date): void {
		this.updatedAt = updatedAt;
	}
}
