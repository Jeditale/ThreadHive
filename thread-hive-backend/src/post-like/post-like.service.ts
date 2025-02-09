import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostLikeDto } from './dto/create-post-like.dto';
import { UpdatePostLikeDto } from './dto/update-post-like.dto';
import { PostLike } from '@prisma/client';

@Injectable()
export class PostLikeService {
  constructor(private prisma: PrismaService) {}

  // Create or Update Post Like
  async createOrUpdate(createPostLikeDto: CreatePostLikeDto) {
    try {
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
    } catch (error) {
      throw new InternalServerErrorException('Failed to create or update post like', error);
    }
  }

  // // Get likes by postId
  // async getLikesByPostId(postId: number) {
  //   try {
  //     return this.prisma.postLike.findMany({
  //       where: {
  //         postId: postId,
  //       },
  //     });
  //   } catch (error) {
  //     throw new InternalServerErrorException('Failed to retrieve likes by postId', error);
  //   }
  // }

  // Count upvotes by postId
  async countUpvotesByPostId(postId: number): Promise<number> {
    try {
      const count = await this.prisma.postLike.count({
        where: {
          postId: postId,  // Filter by postId
          upVote: true,    // Only count upvotes (where upVote is true)
        },
      });
      return count;
    } catch (error) {
      throw new InternalServerErrorException('Failed to count upvotes by postId', error);
    }
  }

  // Get all post likes by postId
  async getAllLikesByPostId(postId: number) {
    try {
      const postLikes = await this.prisma.postLike.findMany({
        where: {
          postId: postId,  // Filter by postId
        },
      });
      return postLikes;  // Return all PostLike records
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve post likes by postId', error);
    }
  }

  // Delete Post Like by ID
  async deleteById(id: number) {
    try {
      const postLike = await this.prisma.postLike.findUnique({
        where: { id },
      });

      if (!postLike) {
        throw new NotFoundException(`PostLike with id ${id} not found`);
      }

      return this.prisma.postLike.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Failed to delete post like', error);
      }
    }
  }
}
