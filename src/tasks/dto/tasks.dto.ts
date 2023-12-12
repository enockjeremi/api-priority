import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

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
  @IsDateString()
  deadline: Date;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  remarks: string;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
