import { Module } from '@nestjs/common';
import { TasksController } from './controllers/tasks.controller';
import { TasksService } from './services/tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from './entities/task.entity';
import { AttributesModule } from './attributes/attributes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tasks]), AttributesModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
