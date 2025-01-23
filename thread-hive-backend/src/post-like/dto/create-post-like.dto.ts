// src/post-like/dto/create-post-like.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class CreatePostLikeDto {
  @ApiProperty()
  postId: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  @IsBoolean()
  upVote: boolean;

  @ApiProperty()
  @IsBoolean()
  downVote: boolean;
}
