import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { WorkspacesService } from '../services/workspaces.service';
import {
  CreateWorkspacesDto,
  UpdateWorkspacesDto,
} from '../dto/workspaces.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserID } from 'src/auth/decorators/user-id.decorator';

@ApiTags('Workspaces')
@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspaceServices: WorkspacesService) {}

  @Get()
  getAll(@UserID() userId: number) {
    return this.workspaceServices.getAll(userId);
  }

  @Post()
  create(@Body() data: CreateWorkspacesDto, @UserID() userId: number) {
    return this.workspaceServices.create(data, userId);
  }

  @Get(':workspaces_id')
  getOne(@Param('workspaces_id') id: number, @UserID() userId: number) {
    return this.workspaceServices.getOne(id, userId);
  }

  @Put(':workspaces_id')
  update(
    @Body() data: UpdateWorkspacesDto,
    @Param('workspaces_id') id: number,
    @UserID() userId: number,
  ) {
    return this.workspaceServices.update(id, data, userId);
  }

  @Delete(':workspaces_id')
  delete(@Param('workspaces_id') id: number, @UserID() userId: number) {
    return this.workspaceServices.delete(id, userId);
  }
}
