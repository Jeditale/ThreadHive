// src/comment-like/dto/create-comment-like.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt } from 'class-validator';

export class CreateCommentLikeDto {
  @ApiProperty()
  @IsInt()
  commentId: number;

  @ApiProperty()
  @IsInt()
  userId: number;

  @ApiProperty()
  @IsBoolean()
  upVote: boolean;

  @ApiProperty()
  @IsBoolean()
  downVote: boolean;
}
