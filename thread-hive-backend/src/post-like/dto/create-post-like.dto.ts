// src/post-like/dto/create-post-like.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNumber } from 'class-validator';

export class CreatePostLikeDto {
  @ApiProperty()
  @IsInt()
  postId: number;

  @ApiProperty()
  @IsInt()
  userId: number;

  @ApiProperty()
  @IsBoolean()
  upVote: boolean;

}
