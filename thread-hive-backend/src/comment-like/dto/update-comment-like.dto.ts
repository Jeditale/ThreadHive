import { PartialType } from '@nestjs/swagger';
import { CreateCommentLikeDto } from './create-comment-like.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateCommentLikeDto extends PartialType(CreateCommentLikeDto) {
@IsOptional()
  @IsString()
  readonly commentId?: string;

@IsOptional()
  @IsString()
  readonly userId?: string;

@IsOptional()
  @IsBoolean()
  readonly upVote?: boolean;

@IsOptional()
  @IsBoolean()
  readonly downVote?: boolean;
}
