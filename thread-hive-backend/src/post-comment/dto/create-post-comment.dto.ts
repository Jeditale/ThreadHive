// src/post-comment/dto/create-post-comment.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreatePostCommentDto {
  @ApiProperty()
  @IsInt()
  postId: number;

  @ApiProperty()
  @IsInt()
  userId: number;

  @ApiProperty()
  @IsString()
  comment: string;
}
