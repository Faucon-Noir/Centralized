import {
	CreateDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

// A mettre en place dans une branche secondaire
export abstract class BaseEntity {
	@PrimaryGeneratedColumn()
	id: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
