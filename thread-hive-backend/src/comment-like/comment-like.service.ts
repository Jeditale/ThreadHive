import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentLike, CommentLikeDocument } from './schemas/comment-like.schema';
import { CreateCommentLikeDto } from './dto/create-comment-like.dto';
import { UpdateCommentLikeDto } from './dto/update-comment-like.dto';

@Injectable()
export class CommentLikeService {
  constructor(@InjectModel(CommentLike.name) private commentLikeModel: Model<CommentLikeDocument>) {}

  async create(createCommentLikeDto: CreateCommentLikeDto): Promise<CommentLike> {
    try {
      const commentLike = new this.commentLikeModel(createCommentLikeDto);
      return await commentLike.save();
    } catch (error) {
      throw new InternalServerErrorException('Error creating comment-like');
    }
  }

  async findAll(): Promise<CommentLike[]> {
    try {
      return await this.commentLikeModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving comment-like likes');
    }
  }

  async findOne(id: string): Promise<CommentLike> {
    try {
      const commentLike = await this.commentLikeModel.findById(id).exec();
      if (!commentLike) throw new NotFoundException('comment-like not found');
      return commentLike;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching comment-like by id');
    }
  }

  async update(id: string, updateCommentLikeDto: UpdateCommentLikeDto): Promise<CommentLike> {
    try {
      const updatedCommentLike = await this.commentLikeModel
        .findByIdAndUpdate(id, updateCommentLikeDto, { new: true })
        .exec();
      if (!updatedCommentLike) throw new NotFoundException('comment-like not found');
      return updatedCommentLike;
    } catch (error) {
      throw new InternalServerErrorException('Error updating comment-like');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const result = await this.commentLikeModel.findByIdAndDelete(id).exec();
      if (!result) throw new NotFoundException('comment-like not found');
    } catch (error) {
      throw new InternalServerErrorException('Error deleting comment-like');
    }
  }
}
