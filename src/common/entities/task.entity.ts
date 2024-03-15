import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from './status.entity';
import { Priority } from './priority.entity';
import { Users } from './users.entity';
import { Workspaces } from './workspaces.entity';

@Entity()
export class Tasks {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  name: string;

  @Column({ type: String })
  description: string;

  @ManyToOne(() => Priority, (priority) => priority.tasks)
  @JoinColumn({ name: 'priority_id' })
  priority: Priority;

  @ManyToOne(() => Status, (status) => status.tasks)
  @JoinColumn({ name: 'status_id' })
  status: Status;

  @ManyToOne(() => Workspaces, (workspaces) => workspaces.tasks, {
    onDelete: 'CASCADE',
  })
  workspaces: Workspaces;

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
