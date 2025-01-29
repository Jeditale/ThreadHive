// src/post-comment/post-comment.module.ts
import { Module } from '@nestjs/common';
import { PostCommentController } from './post-comment.controller';
import { PostCommentService } from './post-comment.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PostCommentController],
  providers: [PostCommentService, PrismaService],
})
export class PostCommentModule {}
