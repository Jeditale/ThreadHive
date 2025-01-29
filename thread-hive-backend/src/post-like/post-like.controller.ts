// src/post-like/post-like.controller.ts
import { Controller, Post, Body, Delete, Param, Get, UseGuards } from '@nestjs/common';
import { PostLikeService } from './post-like.service';
import { CreatePostLikeDto } from './dto/create-post-like.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('post-likes')
@Controller('post-likes')
export class PostLikeController {
  constructor(private readonly postLikeService: PostLikeService) {}

  // Create or Update a Post Like
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  createOrUpdate(@Body() createPostLikeDto: CreatePostLikeDto) {
    return this.postLikeService.createOrUpdate(createPostLikeDto);
  }
  
  // // Get likes by postId
  // @Get('by-post/:postId')
  // getLikesByPostId(@Param('postId') postId: number) {
  //   return this.postLikeService.getLikesByPostId(postId);
  // }
  // Get all post likes by postId
  @Get('all/:postId')
  async getAllLikesByPostId(@Param('postId', ) postId: number) {
    const postLikes = await this.postLikeService.getAllLikesByPostId(+postId);
    return { postLikes };
  }
    // count of upvotes by postId
    @Get('count/:postId')
    async getUpvoteCountByPostId(@Param('postId') postId: string) {
      const postIdNumber = Number(postId);  // Convert postId to a number
      const count = await this.postLikeService.countUpvotesByPostId(postIdNumber);
      return { upvoteCount: count };  // Return the count of upvotes
    }

  // Delete Post Like by ID
  @ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.postLikeService.deleteById(+id);
  }
}
