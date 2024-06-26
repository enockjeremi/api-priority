import { PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsOptional()
  @IsString()
  readonly role: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class VerifyPasswordDto {
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
