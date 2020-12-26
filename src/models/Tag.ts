import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import Tool from "./Tool";

@Entity('tags')
export default class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Tool, (tool) => tool.tags, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  tool: Tool;
};
