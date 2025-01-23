// src/comment-like/dto/update-comment-like.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt } from 'class-validator';

export class UpdateCommentLikeDto {
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
