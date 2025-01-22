import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateCommentLikeDto {
  @ApiProperty({ description: 'Comment ID associated with the like' })
  @IsString()
  readonly commentId: string;

  @ApiProperty({ description: 'User ID who liked or disliked the comment' })
  @IsString()
  readonly userId: string;

  @ApiProperty({ description: 'Indicates if it is an upvote', default: false })
  @IsBoolean()
  readonly upVote: boolean;

  @ApiProperty({ description: 'Indicates if it is a downvote', default: false })
  @IsBoolean()
  readonly downVote: boolean;
}
