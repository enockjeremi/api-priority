import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private userServices: UsersService) {}
  @Get()
  getAll() {
    return this.userServices.getAll();
  }

  @Post()
  create(@Body() data: CreateUserDto) {
    return this.userServices.create(data);
  }

  @Get(':user_id')
  getOne(@Param('user_id') id: number) {
    return this.userServices.getOne(id);
  }

  @Put(':user_id')
  update(@Body() data: UpdateUserDto, @Param('user_id') id: number) {
    return this.userServices.update(id, data);
  }

  @Delete(':user_id')
  delete(@Param('user_id') id: number) {
    return this.userServices.delete(id);
  }
}
