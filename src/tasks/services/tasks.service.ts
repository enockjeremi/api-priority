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
    const all = await this.taskRepository.find({
      where: { user: { id } },
      order: { createAt: 'DESC' },
      relations: ['status', 'priority', 'workspaces'],
    });
    const create = await this.taskRepository.find({
      where: { user: { id } },
      take: 3,
      order: { createAt: 'DESC' },
      relations: ['status', 'priority', 'workspaces'],
    });
    const update = await this.taskRepository.find({
      where: { user: { id } },
      take: 3,
      order: { updateAt: 'DESC' },
      relations: ['status', 'priority', 'workspaces'],
    });
    const filter = await this.taskRepository.find({
      where: { user: { id } },
      order: { updateAt: 'DESC' },
      relations: ['status', 'priority', 'workspaces'],
    });
    return { all, create, update, filter };
  }

  async getAllByStatus(id: number, workspaces_id: number) {
    const order = 'asc';
    const status_complete = await this.taskRepository.find({
      where: {
        user: { id },
        workspaces: { id: workspaces_id },
        status: { id: 1 },
      },
      order: { priority: { id: order }, updateAt: 'ASC' },
      relations: ['status', 'priority', 'workspaces'],
    });

    const status_process = await this.taskRepository.find({
      where: {
        user: { id },
        workspaces: { id: workspaces_id },
        status: { id: 2 },
      },
      order: { priority: { id: order }, updateAt: 'DESC' },
      relations: ['status', 'priority', 'workspaces'],
    });

    const status_pending = await this.taskRepository.find({
      where: {
        user: { id },
        workspaces: { id: workspaces_id },
        status: { id: 3 },
      },
      order: { priority: { id: order }, updateAt: 'ASC' },
      relations: ['status', 'priority', 'workspaces'],
    });

    const status_pause = await this.taskRepository.find({
      where: {
        user: { id },
        workspaces: { id: workspaces_id },
        status: { id: 4 },
      },
      order: { priority: { id: order }, updateAt: 'ASC' },
      relations: ['status', 'priority', 'workspaces'],
    });
    return { status_complete, status_process, status_pending, status_pause };
  }
  async getSatusAndPriorityList() {
    const status = await this.servicesStatus.getAll();
    const priority = await this.servicesPriority.getAll();
    return { status, priority };
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
