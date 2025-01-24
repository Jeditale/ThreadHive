import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentLikeDto } from './dto/create-comment-like.dto';
import { UpdateCommentLikeDto } from './dto/update-comment-like.dto';

@Injectable()
export class CommentLikeService {
  constructor(private readonly prisma: PrismaService) {}

  // Create or update a comment like
  async create(createCommentLikeDto: CreateCommentLikeDto) {
    try {
      // Check if the like already exists based on commentId and userId
      const existingLike = await this.prisma.commentLike.findUnique({
        where: {
          commentId_userId: {
            commentId: createCommentLikeDto.commentId,
            userId: createCommentLikeDto.userId,
          },
        },
      });

      if (existingLike) {
        // If it exists, update the like
        return this.update(createCommentLikeDto.commentId, createCommentLikeDto.userId, createCommentLikeDto);
      }

      // Otherwise, create a new like
      return this.prisma.commentLike.create({
        data: createCommentLikeDto,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create or update comment like', error);
    }
  }

  // Update a comment like
  async update(commentId: number, userId: number, updateCommentLikeDto: UpdateCommentLikeDto) {
    try {
      return await this.prisma.commentLike.update({
        where: {
          commentId_userId: { commentId, userId },
        },
        data: updateCommentLikeDto,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to update comment like', error);
    }
  }

  // // Get all comment likes
  // async findAll() {
  //   try {
  //     return await this.prisma.commentLike.findMany();
  //   } catch (error) {
  //     throw new InternalServerErrorException('Failed to fetch comment likes', error);
  //   }
  // }

  // // Get a comment like by id
  // async findOne(id: number) {
  //   try {
  //     return await this.prisma.commentLike.findUnique({
  //       where: { id },
  //     });
  //   } catch (error) {
  //     throw new InternalServerErrorException('Failed to fetch comment like', error);
  //   }
  // }

  // Count upvotes by commentId
  async countUpvotesByCommentId(commentId: number): Promise<number> {
    try {
      const count = await this.prisma.commentLike.count({
        where: {
          commentId: commentId,  // Filter by commentId
          upVote: true,           // Only count upvotes (where upVote is true)
        },
      });
      return count;
    } catch (error) {
      throw new InternalServerErrorException('Failed to count upvotes by commentId', error);
    }
  }

  // Get all comment likes by commentId
  async getAllLikesByCommentId(commentId: number) {
    try {
      const commentLikes = await this.prisma.commentLike.findMany({
        where: {
          commentId: commentId,  // Filter by commentId
        },
      });
      return commentLikes;  // Return all CommentLike records
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch comment likes', error);
    }
  }

  // Delete a comment like by id
  async remove(id: number) {
    try {
      return await this.prisma.commentLike.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete comment like', error);
    }
  }
}
