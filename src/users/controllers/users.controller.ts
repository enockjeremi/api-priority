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
import {
  CreateUserDto,
  UpdateUserDto,
  VerifyPasswordDto,
} from '../dto/users.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.models';
import { Public } from 'src/auth/decorators/public.decorator';
import { UserID } from 'src/auth/decorators/user-id.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userServices: UsersService) {}

  @Roles(Role.ADMIN)
  @Get()
  getAll() {
    return this.userServices.getAll();
  }

  @Public()
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

  @Post('compare-password')
  verify(@UserID() userId: number, @Body() data: VerifyPasswordDto) {
    return this.userServices.verifyPassword(userId, data);
  }

  @Roles(Role.ADMIN)
  @Delete(':user_id')
  delete(@Param('user_id') id: number) {
    return this.userServices.delete(id);
  }
}
