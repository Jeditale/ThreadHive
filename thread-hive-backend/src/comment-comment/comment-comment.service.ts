// src/comment-comment/comment-comment.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentCommentDto } from './dto/create-comment-comment.dto';
import { UpdateCommentCommentDto } from './dto/update-comment-comment.dto';

@Injectable()
export class CommentCommentService {
  constructor(private prisma: PrismaService) {}

  // Create a new CommentComment (reply)
  async create(createCommentCommentDto: CreateCommentCommentDto) {
    return this.prisma.commentComment.create({
      data: createCommentCommentDto,
    });
  }

  // Update a CommentComment by id
  async update(id: number, updateCommentCommentDto: UpdateCommentCommentDto) {
    const commentComment = await this.prisma.commentComment.findUnique({
      where: { id },
    });

    if (!commentComment) {
      throw new NotFoundException(`CommentComment with id ${id} not found`);
    }

    return this.prisma.commentComment.update({
      where: { id },
      data: updateCommentCommentDto,
    });
  }

  // Get all CommentComments for a specific comment
  async getAll(commentId: number) {
    return this.prisma.commentComment.findMany({
      where: { commentId },
      include: { user: true }, // Optionally include user details
    });
  }

  // Get a CommentComment by id
  async getById(id: number) {
    const commentComment = await this.prisma.commentComment.findUnique({
      where: { id },
      include: { user: true }, // Optionally include user details
    });

    if (!commentComment) {
      throw new NotFoundException(`CommentComment with id ${id} not found`);
    }

    return commentComment;
  }

  // Delete a CommentComment by id
  async delete(id: number) {
    const commentComment = await this.prisma.commentComment.findUnique({
      where: { id },
    });

    if (!commentComment) {
      throw new NotFoundException(`CommentComment with id ${id} not found`);
    }

    return this.prisma.commentComment.delete({
      where: { id },
    });
  }
}
