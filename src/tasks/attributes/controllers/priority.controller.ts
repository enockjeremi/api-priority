import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PriorityService } from '../services/priority.service';
import { CreatePriorityDto, UpdatePriorityDto } from '../dtos/priority.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.models';

@UseGuards(RolesGuard)
@Controller('priority')
export class PriorityController {
  constructor(private readonly priorityServices: PriorityService) {}

  @Get()
  getAll() {
    return this.priorityServices.getAll();
  }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() data: CreatePriorityDto) {
    return this.priorityServices.create(data);
  }

  @Get(':priority_id')
  getOne(@Param('priority_id') id: number) {
    return this.priorityServices.getOne(id);
  }

  @Roles(Role.ADMIN)
  @Put(':priority_id')
  update(@Body() data: UpdatePriorityDto, @Param('priority_id') id: number) {
    return this.priorityServices.update(id, data);
  }

  @Roles(Role.ADMIN)
  @Delete(':priority_id')
  delete(@Param('priority_id') id: number) {
    return this.priorityServices.delete(id);
  }
}
