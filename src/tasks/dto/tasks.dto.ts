import { PartialType } from '@nestjs/swagger';
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
  priorityid: number;

  @IsNotEmpty()
  @IsString()
  deadline: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  statusid: number;

  @IsString()
  remarks: string;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
