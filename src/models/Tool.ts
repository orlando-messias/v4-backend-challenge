import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn
} from "typeorm";

import Tag from "./Tag";

@Entity('tools')
export default class Tool {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	link: string;

	@Column()
	description: string;

	@CreateDateColumn({ name: 'created_At', select: false })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_At', select: false })
	updatedAt: Date;

	@OneToMany(() => Tag, (tag) => tag.tool, { cascade: true, eager: true })
	tags: Tag[];

};
