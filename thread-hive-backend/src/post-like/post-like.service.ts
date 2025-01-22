import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostLike, PostLikeDocument } from './schemas/post-like.schema';
import { CreatePostLikeDto } from './dto/create-post-like.dto';
import { UpdatePostLikeDto } from './dto/update-post-like.dto';

@Injectable()
export class PostLikeService {
  constructor(@InjectModel(PostLike.name) private postLikeModel: Model<PostLikeDocument>) {}

  async create(createPostLikeDto: CreatePostLikeDto): Promise<PostLike> {
    try {
      const postLike = new this.postLikeModel(createPostLikeDto);
      return await postLike.save();
    } catch (error) {
      throw new InternalServerErrorException('Error creating post like');
    }
  }

  async findAll(): Promise<PostLike[]> {
    try {
      return await this.postLikeModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving post likes');
    }
  }

  async findOne(id: string): Promise<PostLike> {
    try {
      const postLike = await this.postLikeModel.findById(id).exec();
      if (!postLike) throw new NotFoundException('PostLike not found');
      return postLike;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updatePostLikeDto: UpdatePostLikeDto): Promise<PostLike> {
    try {
      const updatedPostLike = await this.postLikeModel
        .findByIdAndUpdate(id, updatePostLikeDto, { new: true })
        .exec();
      if (!updatedPostLike) throw new NotFoundException('PostLike not found');
      return updatedPostLike;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const result = await this.postLikeModel.findByIdAndDelete(id).exec();
      if (!result) throw new NotFoundException('PostLike not found');
    } catch (error) {
      throw error;
    }
  }
}
