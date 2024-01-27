import { Exclude } from 'class-transformer';
import { Tasks } from './task.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class Workspaces {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  name: string;

  @OneToMany(() => Tasks, (tasks) => tasks.workspaces)
  @JoinColumn({ name: 'workspaces_id' })
  tasks: Tasks[];

  @ManyToOne(() => Users, (user) => user.tasks)
  @JoinColumn({ name: 'user_id' })
  user: Users;

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
