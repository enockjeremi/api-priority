import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePriorityDto {
  @IsNotEmpty()
  @IsString()
  priority: string;
}

export class UpdatePriorityDto extends PartialType(CreatePriorityDto) {}
