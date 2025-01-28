import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  // Create a new post
  async create(createPostDto: CreatePostDto) {
    try {
      return await this.prisma.post.create({
        data: createPostDto,
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create post', error);
    }
  }

  // Update a post by id
  async update(id: number, updatePostDto: UpdatePostDto) {
    try {
      const post = await this.prisma.post.findUnique({ where: { id } });

      if (!post) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }

      return await this.prisma.post.update({
        where: { id },
        data: updatePostDto,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Re-throw the NotFoundException
      }
      throw new InternalServerErrorException('Failed to update post', error);
    }
  }

    // Get all posts by userId
    async findAllByUserId(userId: number) {
      try {
        return await this.prisma.post.findMany({
          where: { userId },  // Assuming the post has a userId field
        });
      } catch (error) {
        throw new InternalServerErrorException('Failed to fetch posts by user', error);
      }
    }

  // Get all posts
  async findAll() {
    try {
      return await this.prisma.post.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch posts', error);
    }
  }

  // Get a post by id
  async findOne(id: number) {
    try {
      const post = await this.prisma.post.findUnique({
        where: { id },
      });

      if (!post) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }

      return post;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Re-throw the NotFoundException
      }
      throw new InternalServerErrorException('Failed to fetch post', error);
    }
  }

  // Delete a post by id
  async remove(id: number) {
    try {
      const post = await this.prisma.post.findUnique({ where: { id } });

      if (!post) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }

      return await this.prisma.post.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Re-throw the NotFoundException
      }
      throw new InternalServerErrorException('Failed to delete post', error);
    }
  }
}
