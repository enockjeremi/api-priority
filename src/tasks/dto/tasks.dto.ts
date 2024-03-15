import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  priorityid: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  statusid: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  workspacesid: number;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
