// src/post/post.module.ts
import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PrismaService } from '../prisma/prisma.service';  // Ensure the correct path to PrismaService

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService],
})
export class PostModule {}
