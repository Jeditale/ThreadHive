import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { UpdatePostCommentDto } from './dto/update-post-comment.dto';

@Injectable()
export class PostCommentService {
  constructor(private prisma: PrismaService) {}

  // Create a new Post Comment
  async create(createPostCommentDto: CreatePostCommentDto) {
    try {
      return await this.prisma.postComment.create({
        data: createPostCommentDto,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create the post comment', error);
    }
  }

  // Update a Post Comment by id
  async update(id: number, updatePostCommentDto: UpdatePostCommentDto) {
    try {
      const postComment = await this.prisma.postComment.findUnique({
        where: { id },
      });

      if (!postComment) {
        throw new NotFoundException(`PostComment with id ${id} not found`);
      }

      return await this.prisma.postComment.update({
        where: { id },
        data: updatePostCommentDto,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Failed to update the post comment', error);
      }
    }
  }

  // Get all Post Comments for a specific post
  async getAll(postId: number) {
    try {
      const postComments = await this.prisma.postComment.findMany({
        where: { postId },
        include: { user: true }, // Optionally include user details
      });

      if (!postComments || postComments.length === 0) {
        throw new NotFoundException(`No comments found for post with id ${postId}`);
      }

      return postComments;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve comments for the post', error);
    }
  }

  // Get a Post Comment by id
  async getById(id: number) {
    try {
      const postComment = await this.prisma.postComment.findUnique({
        where: { id },
        include: { user: true }, // Optionally include user details
      });

      if (!postComment) {
        throw new NotFoundException(`PostComment with id ${id} not found`);
      }

      return postComment;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve the post comment', error);
    }
  }

  // Get all comments for a specific post (Alternative)
  async getAllCommentsByPostId(postId: number) {
    try {
      const postComments = await this.prisma.postComment.findMany({
        where: {
          postId: postId, // Filter by postId
        },
      });

      if (!postComments || postComments.length === 0) {
        throw new NotFoundException(`No comments found for post with id ${postId}`);
      }

      return postComments;  // Return all PostComment records
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve all comments for the post', error);
    }
  }

  // Delete a Post Comment by id
  async delete(id: number) {
    try {
      const postComment = await this.prisma.postComment.findUnique({
        where: { id },
      });

      if (!postComment) {
        throw new NotFoundException(`PostComment with id ${id} not found`);
      }

      return await this.prisma.postComment.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Failed to delete the post comment', error);
      }
    }
  }
}
