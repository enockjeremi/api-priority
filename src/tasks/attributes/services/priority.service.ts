import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Priority } from '../entities/priority.entity';
import { CreatePriorityDto, UpdatePriorityDto } from '../dtos/priority.dto';

@Injectable()
export class PriorityService {
  constructor(
    @InjectRepository(Priority)
    private priorityRepository: Repository<Priority>,
  ) {}

  async getAll() {
    return this.priorityRepository.find();
  }

  async create(data: CreatePriorityDto) {
    const newPriority = this.priorityRepository.create(data);
    return await this.priorityRepository.save(newPriority);
  }
  async getOne(id: number) {
    const priority = await this.priorityRepository.findOne({
      where: { id },
    });
    if (!priority) throw new BadRequestException('Priority not found');
    return priority;
  }

  async update(id: number, data: UpdatePriorityDto) {
    const priority = await this.priorityRepository.findOne({
      where: { id },
    });
    if (!priority) throw new BadRequestException('Priority not found');
    this.priorityRepository.merge(priority, data);
    return await this.priorityRepository.save(priority);
  }

  async delete(id: number) {
    const priority = await this.priorityRepository.findOne({
      where: { id },
    });
    if (!priority) throw new BadRequestException('Priority not found');
    await this.priorityRepository.delete(priority.id);
    return { message: 'Priority has been deleted' };
  }
}
