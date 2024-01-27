import { Module } from '@nestjs/common';
import { TasksController } from './controllers/tasks.controller';
import { TasksService } from './services/tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from '../common/entities/task.entity';
import { AttributesModule } from './attributes/attributes.module';
import { PriorityService } from './attributes/services/priority.service';
import { StatusService } from './attributes/services/status.service';
import { Status } from '../common/entities/status.entity';
import { Priority } from '../common/entities/priority.entity';
import { WorkspacesService } from 'src/workspaces/services/workspaces.service';
import { Workspaces } from '../common/entities/workspaces.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tasks, Status, Priority, Workspaces]),
    AttributesModule,
  ],
  controllers: [TasksController],
  providers: [TasksService, StatusService, PriorityService, WorkspacesService],
})
export class TasksModule {}
