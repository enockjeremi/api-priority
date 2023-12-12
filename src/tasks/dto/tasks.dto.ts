import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  goals: string;

  @IsNotEmpty()
  @IsString()
  priority: string;

  @IsNotEmpty()
  @IsString()
  deadline: Date;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsString()
  remarks: string;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
