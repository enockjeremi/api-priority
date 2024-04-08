import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateWorkspacesDto,
  UpdateWorkspacesDto,
} from '../dto/workspaces.dto';
import { Workspaces } from '../../common/entities/workspaces.entity';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Workspaces)
    private workspacesRepository: Repository<Workspaces>,
  ) {}

  async getAll(id: any) {
    return await this.workspacesRepository.find({
      where: { user: { id } },
      order: { tasks: { createAt: 'DESC' } },
    });
  }

  async create(data: CreateWorkspacesDto, userId: any) {
    const newWorkspaces = this.workspacesRepository.create(data);
    newWorkspaces.user = userId;

    return await this.workspacesRepository.save(newWorkspaces);
  }

  async getOne(id: number, userId: any) {
    const workspaces = await this.workspacesRepository.findOne({
      where: { user: { id: userId }, id },
      order: { createAt: 'desc' },
      relations: {
        tasks: {
          status: true,
          priority: true,
        },
      },
    });
    if (!workspaces) throw new BadRequestException('Workspaces not found');
    return workspaces;
  }

  async update(id: number, data: UpdateWorkspacesDto, userId: any) {
    const workspaces = await this.workspacesRepository.findOne({
      where: { user: { id: userId }, id },
    });
    if (!workspaces) throw new BadRequestException('Workspaces not found');
    this.workspacesRepository.merge(workspaces, data);
    return await this.workspacesRepository.save(workspaces);
  }

  async delete(id: number, userId: any) {
    const workspaces = await this.workspacesRepository.findOne({
      where: { user: { id: userId }, id },
    });
    if (!workspaces) throw new BadRequestException('Workspaces not found');
    await this.workspacesRepository.delete(workspaces.id);
    return { message: 'Workspaces has been deleted' };
  }
}
