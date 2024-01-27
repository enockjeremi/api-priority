import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWorkspacesDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}

export class UpdateWorkspacesDto extends PartialType(CreateWorkspacesDto) {}
