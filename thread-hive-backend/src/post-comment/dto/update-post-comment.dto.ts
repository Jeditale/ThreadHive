// src/post-comment/dto/update-post-comment.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdatePostCommentDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  comment?: string;
}
