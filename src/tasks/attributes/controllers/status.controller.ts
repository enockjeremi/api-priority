import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { StatusService } from '../services/status.service';
import { CreateStatusDto, UpdateStatusDto } from '../dtos/status.dto';

@Controller('status')
export class StatusController {
  constructor(private readonly statusServices: StatusService) {}

  @Get()
  getAll() {
    return this.statusServices.getAll();
  }

  @Post()
  create(@Body() data: CreateStatusDto) {
    return this.statusServices.create(data);
  }

  @Get(':status_id')
  getOne(@Param('status_id') id: number) {
    return this.statusServices.getOne(id);
  }

  @Put(':status_id')
  update(@Body() data: UpdateStatusDto, @Param('status_id') id: number) {
    return this.statusServices.update(id, data);
  }

  @Get(':status_id')
  delete(@Param('status_id') id: number) {
    return this.statusServices.delete(id);
  }
}
