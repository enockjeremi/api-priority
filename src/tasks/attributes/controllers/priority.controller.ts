import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PriorityService } from '../services/priority.service';
import { CreatePriorityDto, UpdatePriorityDto } from '../dtos/priority.dto';

@Controller('priority')
export class PriorityController {
  constructor(private readonly priorityServices: PriorityService) {}

  @Get()
  getAll() {
    return this.priorityServices.getAll();
  }

  @Post()
  create(@Body() data: CreatePriorityDto) {
    return this.priorityServices.create(data);
  }

  @Get(':priority_id')
  getOne(@Param('priority_id') id: number) {
    return this.priorityServices.getOne(id);
  }

  @Put(':priority_id')
  update(@Body() data: UpdatePriorityDto, @Param('priority_id') id: number) {
    return this.priorityServices.update(id, data);
  }

  @Get(':priority_id')
  delete(@Param('priority_id') id: number) {
    return this.priorityServices.delete(id);
  }
}
