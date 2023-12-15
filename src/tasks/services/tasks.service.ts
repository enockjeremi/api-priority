import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from '../entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto, UpdateTaskDto } from '../dto/tasks.dto';
import { PriorityService } from '../attributes/services/priority.service';
import { StatusService } from '../attributes/services/status.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks) private taskRepository: Repository<Tasks>,
    private readonly servicesPriority: PriorityService,
    private readonly servicesStatus: StatusService,
  ) {}

  async getAll() {
    return this.taskRepository.find({
      relations: ['status', 'priority'],
    });
  }

  async create(data: CreateTaskDto) {
    const newTask = this.taskRepository.create(data);

    const status = await this.servicesStatus.getOne(data.statusid);
    const prioriry = await this.servicesPriority.getOne(data.priorityid);

    newTask.priority = prioriry;
    newTask.status = status;

    return await this.taskRepository.save(newTask);
  }
  async getOne(id: number) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['status', 'priority'],
    });
    if (!task) throw new BadRequestException('Task not found');
    return task;
  }

  async update(id: number, data: UpdateTaskDto) {
    const task = await this.taskRepository.findOne({
      where: { id },
    });
    if (!task) throw new BadRequestException('Task not found');

    const status = await this.servicesStatus.getOne(data.statusid);
    const prioriry = await this.servicesPriority.getOne(data.priorityid);

    task.status = status;
    task.priority = prioriry;

    this.taskRepository.merge(task, data);
    return await this.taskRepository.save(task);
  }

  async updateTaskStatus(task_id: number, status_id: number) {
    const task = await this.getOne(task_id);
    const status = await this.servicesStatus.getOne(status_id);

    task.status = status;
    await this.taskRepository.save(task);
    return { message: 'Status has been update' };
  }

  async updateTaskPriority(task_id: number, priority_id: number) {
    const task = await this.getOne(task_id);
    const priority = await this.servicesPriority.getOne(priority_id);

    task.priority = priority;
    await this.taskRepository.save(task);
    return { message: 'Priority has been update' };
  }

  async delete(id: number) {
    const task = await this.taskRepository.findOne({
      where: { id },
    });
    if (!task) throw new BadRequestException('Task not found');
    await this.taskRepository.delete(task.id);
    return { message: 'Task has been deleted' };
  }
}
