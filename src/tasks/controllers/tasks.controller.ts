import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto, UpdateTaskDto } from '../dto/tasks.dto';
import { UserID } from 'src/auth/decorators/user-id.decorator';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskServices: TasksService) {}

  @Get()
  getAll(@UserID() userId: number) {
    return this.taskServices.getAll(userId);
  }

  @Get('all-status/:workspaces_id')
  getAllByStatus(
    @UserID() userId: number,
    @Param('workspaces_id') workspaces_id: number,
  ) {
    return this.taskServices.getAllByStatus(userId, workspaces_id);
  }

  @Public()
  @Get('status-priority')
  getStatusAndPriorityList() {
    return this.taskServices.getSatusAndPriorityList();
  }

  @Get('all-ids')
  getAllIDs(@UserID() userId: number) {
    return this.taskServices.getAllIDs(userId);
  }

  @Post()
  create(@Body() data: CreateTaskDto, @UserID() userId: number) {
    return this.taskServices.create(data, userId);
  }

  @Get(':task_id')
  getOne(@Param('task_id') id: number, @UserID() userId: number) {
    return this.taskServices.getOne(id, userId);
  }

  @Put(':task_id')
  update(
    @Body() data: UpdateTaskDto,
    @UserID() userId: number,
    @Param('task_id') id: number,
  ) {
    return this.taskServices.update(id, userId, data);
  }

  @Patch(':task_id/status/:status_id')
  changeTaskStatus(
    @Param('task_id') task_id: number,
    @Param('status_id') status_id: number,
    @UserID() userId: number,
  ) {
    return this.taskServices.changeTaskStatus(task_id, userId, status_id);
  }

  @Patch(':task_id/priority/:priority_id')
  changeTaskPriority(
    @Param('task_id') task_id: number,
    @Param('priority_id') priority_id: number,
    @UserID() userId: number,
  ) {
    return this.taskServices.changeTaskPriority(task_id, userId, priority_id);
  }

  @Delete(':task_id')
  delete(@Param('task_id') id: number, @UserID() userId: number) {
    return this.taskServices.delete(id, userId);
  }
}
