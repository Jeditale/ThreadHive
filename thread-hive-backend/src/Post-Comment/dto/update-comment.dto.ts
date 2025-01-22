import { PartialType } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
    @IsOptional()
    @IsString()
    postId: string;
  
    @IsOptional()
    @IsString()
    userId: string;
  
    @IsOptional()
    @IsString()
    comment: string;
}
