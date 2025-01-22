import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({  description: 'Post ID associated with the comment' })
  @IsString()
  postId: string;

  @ApiProperty({ description: 'User ID who made the comment' })
  @IsString()
  userId: string;

  @ApiProperty({ example:'What A wonderful Post',description: 'Content of the comment' })
  @IsString()
  comment: string;
}
