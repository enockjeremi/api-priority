import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto, UpdateTaskDto } from '../dto/tasks.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly taskServices: TasksService,
    private readonly jwtServices: JwtService,
    private configServices: ConfigService,
  ) {}

  decodeToken(token: any) {
    const decoded = this.jwtServices.verify(token.replace('Bearer ', ''), {
      secret: this.configServices.get('JWT_ACCESS_TOKEN_SECRET'),
    });
    return decoded.sub;
  }

  @Get()
  getAll(@Headers() header: any) {
    const id = this.decodeToken(header.authorization);
    console.log(id);
    return this.taskServices.getAll(id);
  }

  @Post()
  create(@Body() data: CreateTaskDto, @Headers() header: any) {
    const id = this.decodeToken(header.authorization);
    return this.taskServices.create(data, id);
  }

  @Get(':task_id')
  getOne(@Param('task_id') id: number, @Headers() header: any) {
    const user = this.decodeToken(header.authorization);
    return this.taskServices.getOne(id, user);
  }

  @Put(':task_id')
  update(@Body() data: UpdateTaskDto, @Param('task_id') id: number) {
    return this.taskServices.update(id, data);
  }

  @Patch(':task_id/status/:status_id')
  changeTaskStatus(
    @Param('task_id') task_id: number,
    @Param('status_id') status_id: number,
    @Headers() header: any,
  ) {
    const user = this.decodeToken(header.authorization);
    return this.taskServices.changeTaskStatus(task_id, user, status_id);
  }

  @Patch(':task_id/priority/:priority_id')
  changeTaskPriority(
    @Param('task_id') task_id: number,
    @Param('priority_id') priority_id: number,
    @Headers() header: any,
  ) {
    const user = this.decodeToken(header.authorization);
    return this.taskServices.changeTaskPriority(task_id, user, priority_id);
  }

  @Delete(':task_id')
  delete(@Param('task_id') id: number, @Headers() header: any) {
    const user = this.decodeToken(header.authorization);
    return this.taskServices.delete(id, user);
  }
}
