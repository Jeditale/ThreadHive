// src/users/dto/create-user.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsBoolean, IsDateString, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'User username', example: 'john_doe' })
  @IsString()
  usrname: string;

  @ApiProperty({ description: 'User first name', example: 'John' })
  @IsString()
  fname: string;

  @ApiProperty({ description: 'User last name', example: 'Doe' })
  @IsString()
  lname: string;

  @ApiProperty({ description: 'User profile picture URL', required: false, nullable: true })
  @IsOptional()
  @IsString()
  profilePicture?: string | null;

  @ApiProperty({ description: 'User email address', example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password', example: 'securePassword123' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'User birthdate', example: '1990-01-01T00:00:00.000Z' })
  @IsDateString()
  bdate: string;

  @ApiProperty({ description: 'User gender', example: 'Male' })
  @IsString()
  sex: string;

  @ApiProperty({ description: 'User role (Admin or regular user)', example: true })
  @IsBoolean()
  isAdmin: boolean;
}
