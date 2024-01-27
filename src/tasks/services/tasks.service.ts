import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from '../../common/entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto, UpdateTaskDto } from '../dto/tasks.dto';
import { PriorityService } from '../attributes/services/priority.service';
import { StatusService } from '../attributes/services/status.service';
import { WorkspacesService } from '../../workspaces/services/workspaces.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks) private taskRepository: Repository<Tasks>,
    private readonly servicesPriority: PriorityService,
    private readonly servicesStatus: StatusService,
    private readonly servicesWorkspaces: WorkspacesService,
  ) {}

  async getAll(id: number) {
    return this.taskRepository.find({
      where: { user: { id } },
      order: { createAt: 'DESC' },
      relations: ['status', 'priority', 'workspaces'],
    });
  }

  async getAllIDs(id: number) {
    return this.taskRepository.find({
      where: { user: { id } },
      order: { createAt: 'DESC' },
      select: { id: true },
    });
  }

  async create(data: CreateTaskDto, id: any) {
    const newTask = this.taskRepository.create(data);
    const workspaces = await this.servicesWorkspaces.getOne(
      data.workspacesid,
      id,
    );
    console.log(workspaces);
    const status = await this.servicesStatus.getOne(data.statusid);
    const prioriry = await this.servicesPriority.getOne(data.priorityid);

    newTask.user = id;
    newTask.priority = prioriry;
    newTask.status = status;
    newTask.workspaces = workspaces;

    return await this.taskRepository.save(newTask);
  }

  async getOne(id: number, userid: number) {
    const task = await this.taskRepository.findOne({
      where: { user: { id: userid }, id },
      relations: ['status', 'priority'],
    });
    if (!task) throw new BadRequestException('Task not found');
    return task;
  }

  async update(id: number, user: number, data: UpdateTaskDto) {
    const task = await this.taskRepository.findOne({
      where: { user: { id: user }, id },
      relations: ['status', 'priority'],
    });
    if (!task) throw new BadRequestException('Task not found');
    const status = await this.servicesStatus.getOne(data.statusid);
    const prioriry = await this.servicesPriority.getOne(data.priorityid);

    task.status = status;
    task.priority = prioriry;

    this.taskRepository.merge(task, data);
    return await this.taskRepository.save(task);
  }

  async changeTaskStatus(task_id: number, user: any, status_id: number) {
    const task = await this.getOne(task_id, user);
    const status = await this.servicesStatus.getOne(status_id);

    task.status = status;
    await this.taskRepository.save(task);
    return { message: 'Status has been changed' };
  }

  async changeTaskPriority(task_id: number, user: any, priority_id: number) {
    const task = await this.getOne(task_id, user);
    const priority = await this.servicesPriority.getOne(priority_id);

    task.priority = priority;
    await this.taskRepository.save(task);
    return { message: 'Priority has been changed' };
  }

  async delete(id: number, user: any) {
    const task = await this.taskRepository.findOne({
      where: { user: { id: user }, id },
      relations: ['status', 'priority'],
    });
    if (!task) throw new BadRequestException('Task not found');
    await this.taskRepository.delete(task.id);
    return { message: 'Task has been deleted' };
  }
}
