// src/comment-comment/comment-comment.module.ts
import { Module } from '@nestjs/common';
import { CommentCommentController } from './comment-comment.controller';
import { CommentCommentService } from './comment-comment.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CommentCommentController],
  providers: [CommentCommentService, PrismaService],
})
export class CommentCommentModule {}
