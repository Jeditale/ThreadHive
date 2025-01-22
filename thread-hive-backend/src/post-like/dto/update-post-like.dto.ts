import { PartialType } from '@nestjs/swagger';
import { CreatePostLikeDto } from './create-post-like.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdatePostLikeDto extends PartialType(CreatePostLikeDto) {
    
    @IsOptional()
    @IsString()
    readonly postId?: string;

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
