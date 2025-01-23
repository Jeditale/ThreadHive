// src/post-like/dto/update-post-like.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdatePostLikeDto {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  upVote?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  downVote?: boolean;
}
