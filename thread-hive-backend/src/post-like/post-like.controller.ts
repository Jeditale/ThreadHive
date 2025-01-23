// src/post-like/post-like.controller.ts
import { Controller, Post, Body, Delete, Param, Get } from '@nestjs/common';
import { PostLikeService } from './post-like.service';
import { CreatePostLikeDto } from './dto/create-post-like.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('post-likes')
@Controller('post-likes')
export class PostLikeController {
  constructor(private readonly postLikeService: PostLikeService) {}

  // Create or Update a Post Like
  @Post()
  createOrUpdate(@Body() createPostLikeDto: CreatePostLikeDto) {
    return this.postLikeService.createOrUpdate(createPostLikeDto);
  }
  
  // Get likes by postId
  @Get('by-post/:postId')
  getLikesByPostId(@Param('postId') postId: number) {
    return this.postLikeService.getLikesByPostId(postId);
  }

  // Delete Post Like by ID
  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.postLikeService.deleteById(+id);
  }
}
