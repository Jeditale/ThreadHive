// src/comment-comment/dto/create-comment-comment.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateCommentCommentDto {
  @ApiProperty()
  @IsInt()
  commentId: number;  // Parent commentId (PostComment's id)

  @ApiProperty()
  @IsInt()
  userId: number;

  @ApiProperty()
  @IsString()
  comment: string;
}
