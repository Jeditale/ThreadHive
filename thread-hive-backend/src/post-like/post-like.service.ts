// src/post-like/post-like.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostLikeDto } from './dto/create-post-like.dto';
import { UpdatePostLikeDto } from './dto/update-post-like.dto';
import { PostLike } from '@prisma/client';

@Injectable()
export class PostLikeService {
  constructor(private prisma: PrismaService) {}

  // Create or Update Post Like
  async createOrUpdate(createPostLikeDto: CreatePostLikeDto) {
    // Check if the like already exists based on postId and userId
    const existingLike = await this.prisma.postLike.findUnique({
      where: {
        postId_userId: {
          postId: createPostLikeDto.postId,
          userId: createPostLikeDto.userId,
        },
      },
    });

    if (existingLike) {
      // If it exists, update the like
      return this.prisma.postLike.update({
        where: {
          id: existingLike.id,
        },
        data: createPostLikeDto,
      });
    }

    // Otherwise, create a new like
    return this.prisma.postLike.create({
      data: createPostLikeDto,
    });
  }

  // Get likes by postId
  async getLikesByPostId(postId: number) {
    return this.prisma.postLike.findMany({
      where: {
        postId: postId,
      },
    });
  }

  // Delete Post Like by ID
  async deleteById(id: number) {
    const postLike = await this.prisma.postLike.findUnique({
      where: { id },
    });

    if (!postLike) {
      throw new NotFoundException(`PostLike with id ${id} not found`);
    }

    return this.prisma.postLike.delete({
      where: { id },
    });
  }
}
