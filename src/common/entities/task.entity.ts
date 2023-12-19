import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from './status.entity';
import { Priority } from './priority.entity';
import { Users } from './users.entity';

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  name: string;

  @Column({ type: String })
  goals: string;

  @Column({ type: String })
  deadline: Date;

  @Column({ type: String })
  remarks: string;

  @ManyToOne(() => Priority, (priority) => priority.tasks)
  @JoinColumn({ name: 'priority_id' })
  priority: Priority;

  @ManyToOne(() => Status, (status) => status.tasks)
  @JoinColumn({ name: 'status_id' })
  status: Status;

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
