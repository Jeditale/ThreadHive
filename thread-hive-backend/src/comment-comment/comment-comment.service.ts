import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentCommentDto } from './dto/create-comment-comment.dto';
import { UpdateCommentCommentDto } from './dto/update-comment-comment.dto';

@Injectable()
export class CommentCommentService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new CommentComment (reply)
  async create(createCommentCommentDto: CreateCommentCommentDto) {
    try {
      return await this.prisma.commentComment.create({
        data: createCommentCommentDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create comment reply',
        error,
      );
    }
  }

  // Update a CommentComment by id
  async update(id: number, updateCommentCommentDto: UpdateCommentCommentDto) {
    try {
      const commentComment = await this.prisma.commentComment.findUnique({
        where: { id },
      });

      if (!commentComment) {
        throw new NotFoundException(
          `Comment reply with id ${id} not found`,
        );
      }

      return await this.prisma.commentComment.update({
        where: { id },
        data: updateCommentCommentDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to update comment reply with id ${id}`,
        error,
      );
    }
  }

  // Get all CommentComments for a specific comment
  async getAll(commentId: number) {
    try {
      return await this.prisma.commentComment.findMany({
        where: { commentId },
        include: { user: true }, // Optionally include user details
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to fetch replies for comment with id ${commentId}`,
        error,
      );
    }
  }

  // Get a CommentComment by id
  async getById(id: number) {
    try {
      const commentComment = await this.prisma.commentComment.findUnique({
        where: { id },
        include: { user: true }, // Optionally include user details
      });

      if (!commentComment) {
        throw new NotFoundException(
          `Comment reply with id ${id} not found`,
        );
      }

      return commentComment;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to fetch comment reply with id ${id}`,
        error,
      );
    }
  }

  // Delete a CommentComment by id
  async delete(id: number) {
    try {
      const commentComment = await this.prisma.commentComment.findUnique({
        where: { id },
      });

      if (!commentComment) {
        throw new NotFoundException(
          `Comment reply with id ${id} not found`,
        );
      }

      return await this.prisma.commentComment.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete comment reply with id ${id}`,
        error,
      );
    }
  }
}
