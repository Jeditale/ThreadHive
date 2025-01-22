import { PartialType } from '@nestjs/swagger';
import { CreateCommentCommentDto } from './create-comment-comment.dto';

export class UpdateCommentCommentDto extends PartialType(CreateCommentCommentDto) {}
