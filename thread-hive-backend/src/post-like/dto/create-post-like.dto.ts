import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreatePostLikeDto {
  @ApiProperty({ description: 'Post ID associated with the like',example:'PostId' })
  @IsString()
  readonly postId: string;

  @ApiProperty({ description: 'User ID who liked or disliked the post', example:'UserId'})
  @IsString()
  readonly userId: string;

  @ApiProperty({ description: 'Indicates if it is an upvote', default: false })
  @IsBoolean()
  readonly upVote: boolean;

  @ApiProperty({ description: 'Indicates if it is a downvote', default: false })
  @IsBoolean()
  readonly downVote: boolean;
}
