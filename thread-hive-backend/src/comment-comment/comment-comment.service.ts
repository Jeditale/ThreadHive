import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentCommentDto } from './dto/create-comment-comment.dto';
import { UpdateCommentCommentDto } from './dto/update-comment-comment.dto';
import { CommentComment } from './schemas/comment-comment.schema';

@Injectable()
export class CommentCommentService {
  constructor(
    @InjectModel(CommentComment.name)
    private readonly commentCommentModel: Model<CommentComment>,
  ) {}

  async create(createCommentCommentDto: CreateCommentCommentDto): Promise<CommentComment> {
    try {
      const newCommentComment = new this.commentCommentModel(createCommentCommentDto);
      return await newCommentComment.save();
    } catch (error) {
      console.error('Error creating CommentComment:', error);
      throw new InternalServerErrorException('Failed to create CommentComment');
    }
  }

  async findAll(): Promise<CommentComment[]> {
    try {
      return await this.commentCommentModel
        .find()
        .populate('commentId', '_id') // Populate the `commentId`
        .populate('userId', '_id fname lname') // Populate user details
        .exec();
    } catch (error) {
      console.error('Error finding all CommentComments:', error);
      throw new InternalServerErrorException('Failed to retrieve CommentComments');
    }
  }

  async findOne(id: string): Promise<CommentComment> {
    try {
      const commentComment = await this.commentCommentModel
        .findById(id)
        .populate('commentId', '_id')
        .populate('userId', '_id fname lname')
        .exec();
      if (!commentComment) {
        throw new NotFoundException(`CommentComment with ID ${id} not found`);
      }
      return commentComment;
    } catch (error) {
      console.error(`Error finding CommentComment with ID ${id}:`, error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to retrieve CommentComment');
    }
  }

  async update(id: string, updateCommentCommentDto: UpdateCommentCommentDto): Promise<CommentComment> {
    try {
      const updatedCommentComment = await this.commentCommentModel
        .findByIdAndUpdate(id, updateCommentCommentDto, { new: true })
        .exec();
      if (!updatedCommentComment) {
        throw new NotFoundException(`CommentComment with ID ${id} not found`);
      }
      return updatedCommentComment;
    } catch (error) {
      console.error(`Error updating CommentComment with ID ${id}:`, error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update CommentComment');
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const result = await this.commentCommentModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException(`CommentComment with ID ${id} not found`);
      }
      return { message: `CommentComment with ID ${id} deleted successfully` };
    } catch (error) {
      console.error(`Error removing CommentComment with ID ${id}:`, error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete CommentComment');
    }
  }
}
