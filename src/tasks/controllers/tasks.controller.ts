import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto, UpdateTaskDto } from '../dto/tasks.dto';

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

  @Put(':task_id')
  update(@Body() data: UpdateTaskDto, @Param('task_id') id: number) {
    return this.taskServices.update(id, data);
  }

  @Patch(':task_id/status/:status_id')
  changeTaskStatus(
    @Param('task_id') task_id: number,
    @Param('status_id') status_id: number,
  ) {
    return this.taskServices.changeTaskStatus(task_id, status_id);
  }

  @Patch(':task_id/priority/:priority_id')
  changeTaskPriority(
    @Param('task_id') task_id: number,
    @Param('priority_id') priority_id: number,
  ) {
    return this.taskServices.changeTaskPriority(task_id, priority_id);
  }

  @Get(':task_id')
  delete(@Param('task_id') id: number) {
    return this.taskServices.delete(id);
  }
}
