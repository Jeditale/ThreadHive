import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}
  async create(createPostDto: CreatePostDto): Promise<Post> {
    try {
      const userExists = await this.userModel.findById(createPostDto.userId);
      if (!userExists) 
        throw new NotFoundException('User not found');
      const newPost = new this.postModel(createPostDto);
      return newPost.save();
    } catch (error) {
      throw new InternalServerErrorException('Error creating post');
    }
  }

  async findAll(): Promise<Post[]> {
    try {
      return this.postModel.find().populate('userId', '_id').exec();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching posts');
    }
  }

  async findById(id: string): Promise<Post> {
    try {
      
      const post = await this.postModel.findById(id).populate('userId', '_id').exec();
      if (!post) throw new NotFoundException('Post not found');
      return post;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching post by id');
    }
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    try {
      const updatedPost = await this.postModel
        .findByIdAndUpdate(id, updatePostDto, { new: true })
        .exec();
      if (!updatedPost) throw new NotFoundException('Post not found');
      return updatedPost;
    } catch (error) {
      throw new InternalServerErrorException('Error updating post');
    }
  }

  async delete(id: string): Promise<{ message: string }> {
    try {
      const result = await this.postModel.findByIdAndDelete(id).exec();
      if (!result) 
        throw new NotFoundException('Post not found');
      return { message: 'Post deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Error deleting post');
    }
  }
}
