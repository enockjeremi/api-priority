import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Status } from '../../../common/entities/status.entity';
import { CreateStatusDto, UpdateStatusDto } from '../dtos/status.dto';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
  ) {}

  async getAll() {
    return this.statusRepository.find();
  }

  async create(data: CreateStatusDto) {
    const newStatus = this.statusRepository.create(data);
    return await this.statusRepository.save(newStatus);
  }
  async getOne(id: number) {
    const status = await this.statusRepository.findOne({
      where: { id },
    });
    if (!status) throw new BadRequestException('Status not found');
    return status;
  }

  async update(id: number, data: UpdateStatusDto) {
    const status = await this.statusRepository.findOne({
      where: { id },
    });
    if (!status) throw new BadRequestException('Status not found');
    this.statusRepository.merge(status, data);
    return await this.statusRepository.save(status);
  }

  async delete(id: number) {
    const status = await this.statusRepository.findOne({
      where: { id },
    });
    if (!status) throw new BadRequestException('Status not found');
    await this.statusRepository.delete(status.id);
    return { message: 'Status has been deleted' };
  }
}
