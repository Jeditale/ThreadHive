import { PartialType } from '@nestjs/swagger';
import { CreateCommentCommentDto } from './create-comment-comment.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCommentCommentDto extends PartialType(CreateCommentCommentDto) {
    @IsOptional()
    @IsString()
      readonly commentId: string;
    
    @IsOptional()
    @IsString()
      readonly userId: string;
    
    @IsOptional()
    @IsString()
      readonly comment: string;
}
