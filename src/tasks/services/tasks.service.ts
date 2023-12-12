import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ITasks } from 'src/common/interfaces/tasks.interface';
import { Tasks } from '../entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/tasks.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks) private taskRepository: Repository<Tasks>,
  ) {}

  async getAll(): Promise<ITasks[]> {
    return this.taskRepository.find();
  }

  async create(data: CreateTaskDto): Promise<ITasks> {
    const newTask = this.taskRepository.create(data);
    return await this.taskRepository.save(newTask);
  }
  async getOne(id: number): Promise<ITasks> {
    const task = await this.taskRepository.findOne({
      where: { id },
    });
    if (!task) throw new BadRequestException('Task not found');
    return task;
  }
}
