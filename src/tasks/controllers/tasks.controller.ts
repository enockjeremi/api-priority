import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto } from '../dto/tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskServices: TasksService) {}
  @Get()
  getAll() {
    return this.taskServices.getAll();
  }
  @Post()
  create(@Body() data: CreateTaskDto) {
    return this.taskServices.create(data);
  }
  @Get(':task_id')
  getOne(@Param('task_id') id: number) {
    return this.taskServices.getOne(id);
  }
}
