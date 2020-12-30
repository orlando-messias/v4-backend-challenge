import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail, MinLength } from "class-validator";

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @MinLength(6, { message: 'Password must contains at least 6 characters' })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

};
