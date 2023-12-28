import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStatusDto {
  @IsNotEmpty()
  @IsString()
  status: string;
}

export class UpdateStatusDto extends PartialType(CreateStatusDto) {}
