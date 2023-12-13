import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  goals: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  priorityId: number;

  @IsNotEmpty()
  @IsString()
  deadline: Date;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  statusId: number;

  @IsString()
  remarks: string;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
