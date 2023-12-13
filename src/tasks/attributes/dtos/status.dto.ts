import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStatusDto {
  @IsNotEmpty()
  @IsString()
  status: string;
}

export class UpdateStatusDto extends PartialType(CreateStatusDto) {}
