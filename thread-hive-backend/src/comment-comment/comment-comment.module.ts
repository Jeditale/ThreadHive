import { Module } from '@nestjs/common';
import { CommentCommentService } from './comment-comment.service';
import { CommentCommentController } from './comment-comment.controller';

@Module({
  controllers: [CommentCommentController],
  providers: [CommentCommentService],
})
export class CommentCommentModule {}
