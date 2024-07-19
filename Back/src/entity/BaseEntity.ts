import {
	CreateDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

// TODO: A mettre en héritage pour toutes les entités
// Permet d'uniformiser les entités et éviter d'avoir 20 fois les mêmes colonnes partout avec des noms différents (ou carrément absentes)
// Exemple depuis un autre projet: export class ABCDEntity extends BaseEntity{}
export abstract class BaseEntity {
	@PrimaryGeneratedColumn()
	id: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
