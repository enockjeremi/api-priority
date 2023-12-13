import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePriorityDto {
  @IsNotEmpty()
  @IsString()
  priority: string;
}

export class UpdatePriorityDto extends PartialType(CreatePriorityDto) {}
