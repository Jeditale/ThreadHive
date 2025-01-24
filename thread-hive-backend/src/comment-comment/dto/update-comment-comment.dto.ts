// src/comment-comment/dto/update-comment-comment.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateCommentCommentDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  comment?: string;
}
