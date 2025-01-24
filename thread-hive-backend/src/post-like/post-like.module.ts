// src/post-like/post-like.module.ts
import { Module } from '@nestjs/common';
import { PostLikeController } from './post-like.controller';
import { PostLikeService } from './post-like.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PostLikeController],
  providers: [PostLikeService, PrismaService],
})
export class PostLikeModule {}
