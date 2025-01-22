// src/comment-comment/dto/create-comment-comment.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentCommentDto {
    
  @ApiProperty({  description: 'Post ID associated with the comment' })
  @IsNotEmpty()
  readonly commentId: string;

  @ApiProperty({ description: 'User ID who made the comment' })
  @IsNotEmpty()
  readonly userId: string;

  @ApiProperty({ example:'What A wonderful Comment',description: 'Content of the comment' })
  @IsString()
  @IsNotEmpty()
  readonly comment: string;
}
