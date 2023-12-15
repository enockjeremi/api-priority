import { Module } from '@nestjs/common';
import { TasksController } from './controllers/tasks.controller';
import { TasksService } from './services/tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from './entities/task.entity';
import { AttributesModule } from './attributes/attributes.module';
import { PriorityService } from './attributes/services/priority.service';
import { StatusService } from './attributes/services/status.service';
import { Status } from './attributes/entities/status.entity';
import { Priority } from './attributes/entities/priority.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tasks, Status, Priority]),
    AttributesModule,
  ],
  controllers: [TasksController],
  providers: [TasksService, StatusService, PriorityService],
})
export class TasksModule {}
