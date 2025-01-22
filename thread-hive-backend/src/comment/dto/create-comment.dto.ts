import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({  description: 'Post ID associated with the comment' })
  @IsString()
  @IsNotEmpty()
  readonly postId: string;

  @ApiProperty({ description: 'User ID who made the comment' })
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @ApiProperty({ example:'What A wonderful Post',description: 'Content of the comment' })
  @IsString()
  @IsNotEmpty()
  readonly comment: string;
}
