import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn
} from "typeorm";
import { Length, MaxLength } from "class-validator";

import Tag from "./Tag";

@Entity('tools')
export default class Tool {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	@MaxLength(50, { message: 'LINK must be shorther than or equal to 50 characters' })
	link: string;

	@Column()
	@Length(10, 200, { message: 'DESCRIPTION must be between 10 and 200 characters long' })
	description: string;

	@CreateDateColumn({ name: 'created_At', select: false })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_At', select: false })
	updatedAt: Date;

	@OneToMany(() => Tag, (tag) => tag.tool, { cascade: true, eager: true })
	tags: Tag[];

};
