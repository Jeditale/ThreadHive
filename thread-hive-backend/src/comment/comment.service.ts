import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    try {
      const comment = new this.commentModel(createCommentDto);
      return await comment.save();
    } catch (error) {
      throw new InternalServerErrorException('Error creating comment');
    }
  }

  async findAll(): Promise<Comment[]> {
    try {
      return await this.commentModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching comment');
    }
  }

  async findOne(id: string): Promise<Comment> {
    try {
      const comment = await this.commentModel.findById(id).exec();
      if (!comment) throw new NotFoundException('Comment not found');
      return comment;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching comment by id');
    }
  }

  async update(id: string, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    try {
      const updatedComment = await this.commentModel
        .findByIdAndUpdate(id, updateCommentDto, { new: true })
        .exec();
      if (!updatedComment) throw new NotFoundException('Comment not found');
      return updatedComment;
    } catch (error) {
      throw new InternalServerErrorException('Error updating comment');
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    try {
      const result = await this.commentModel.findByIdAndDelete(id).exec();
      if (!result) 
        throw new NotFoundException('Comment not found');
      return { message: 'comment deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Error deleting comment');
    }
  }
}
