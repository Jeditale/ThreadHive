// src/post-comment/post-comment.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { UpdatePostCommentDto } from './dto/update-post-comment.dto';

@Injectable()
export class PostCommentService {
  constructor(private prisma: PrismaService) {}

  // Create a new Post Comment
  async create(createPostCommentDto: CreatePostCommentDto) {
    return this.prisma.postComment.create({
      data: createPostCommentDto,
    });
  }

  // Update a Post Comment by id
  async update(id: number, updatePostCommentDto: UpdatePostCommentDto) {
    const postComment = await this.prisma.postComment.findUnique({
      where: { id },
    });

    if (!postComment) {
      throw new NotFoundException(`PostComment with id ${id} not found`);
    }

    return this.prisma.postComment.update({
      where: { id },
      data: updatePostCommentDto,
    });
  }

  // Get all Post Comments for a specific post
  async getAll(postId: number) {
    return this.prisma.postComment.findMany({
      where: { postId },
      include: { user: true }, // Optionally include user details
    });
  }

  // Get a Post Comment by id
  async getById(id: number) {
    const postComment = await this.prisma.postComment.findUnique({
      where: { id },
      include: { user: true }, // Optionally include user details
    });

    if (!postComment) {
      throw new NotFoundException(`PostComment with id ${id} not found`);
    }

    return postComment;
  }

  // Delete a Post Comment by id
  async delete(id: number) {
    const postComment = await this.prisma.postComment.findUnique({
      where: { id },
    });

    if (!postComment) {
      throw new NotFoundException(`PostComment with id ${id} not found`);
    }

    return this.prisma.postComment.delete({
      where: { id },
    });
  }
}
