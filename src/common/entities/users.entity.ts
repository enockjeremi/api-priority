import { Exclude } from 'class-transformer';
import { Tasks } from './task.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Workspaces } from './workspaces.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, unique: true })
  username: string;

  @Column({ type: String, unique: true })
  email: string;

  // @Exclude()
  @Column({ type: String })
  password: string;

  @Column({ type: String, default: 'user' })
  role: string;

  @OneToMany(() => Tasks, (tasks) => tasks.user)
  tasks: Tasks[];

  @OneToMany(() => Workspaces, (workspaces) => workspaces.user)
  workspaces: Workspaces[];

  @Exclude()
  @CreateDateColumn({
    type: 'timestamptz',
    name: 'create_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @Exclude()
  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'update_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
}
