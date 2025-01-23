// src/users/dto/update-user.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsBoolean, IsDateString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: 'User username', example: 'john_doe', required: false })
  @IsOptional()
  @IsString()
  usrname?: string;

  @ApiProperty({ description: 'User first name', example: 'John', required: false })
  @IsOptional()
  @IsString()
  fname?: string;

  @ApiProperty({ description: 'User last name', example: 'Doe', required: false })
  @IsOptional()
  @IsString()
  lname?: string;

  @ApiProperty({ description: 'User profile picture URL', required: false, nullable: true })
  @IsOptional()
  @IsString()
  profilePicture?: string | null;

  @ApiProperty({ description: 'User email address', example: 'john.doe@example.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'User password', example: 'securePassword123', required: false })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ description: 'User birthdate', example: '1990-01-01T00:00:00.000Z', required: false })
  @IsOptional()
  @IsDateString()
  bdate?: string;

  @ApiProperty({ description: 'User gender', example: 'Male', required: false })
  @IsOptional()
  @IsString()
  sex?: string;

  @ApiProperty({ description: 'User role (Admin or regular user)', example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isAdmin?: boolean;
}
