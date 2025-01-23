// src/comment-like/comment-like.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentLikeDto } from './dto/create-comment-like.dto';
import { UpdateCommentLikeDto } from './dto/update-comment-like.dto';

@Injectable()
export class CommentLikeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCommentLikeDto: CreateCommentLikeDto) {
    const existingLike = await this.prisma.commentLike.findUnique({
      where: {
        commentId_userId: {
          commentId: createCommentLikeDto.commentId,
          userId: createCommentLikeDto.userId,
        },
      },
    });

    if (existingLike) {
      return this.update(createCommentLikeDto.commentId, createCommentLikeDto.userId, createCommentLikeDto);
    }

    return this.prisma.commentLike.create({
      data: createCommentLikeDto,
    });
  }

  async update(commentId: number, userId: number, updateCommentLikeDto: UpdateCommentLikeDto) {
    return this.prisma.commentLike.update({
      where: {
        commentId_userId: { commentId, userId },
      },
      data: updateCommentLikeDto,
    });
  }

  async findAll() {
    return this.prisma.commentLike.findMany();
  }

  async findOne(id: number) {
    return this.prisma.commentLike.findUnique({
      where: { id },
    });
  }

  async remove(id: number) {
    return this.prisma.commentLike.delete({
      where: { id },
    });
  }
}
