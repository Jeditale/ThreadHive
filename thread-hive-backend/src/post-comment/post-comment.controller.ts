// src/post-comment/post-comment.controller.ts
import { Controller, Post, Body, Put, Param, Get, Delete } from '@nestjs/common';
import { PostCommentService } from './post-comment.service';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { UpdatePostCommentDto } from './dto/update-post-comment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('post-comments')
@Controller('post-comments')
export class PostCommentController {
  constructor(private readonly postCommentService: PostCommentService) {}

  // Create a new Post Comment
  @Post()
  create(@Body() createPostCommentDto: CreatePostCommentDto) {
    return this.postCommentService.create(createPostCommentDto);
  }

  // Update a Post Comment by id
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostCommentDto: UpdatePostCommentDto,
  ) {
    return this.postCommentService.update(+id, updatePostCommentDto);
  }

  // Get all Post Comments for a specific post
  @Get('post/:postId')
  getAll(@Param('postId') postId: string) {
    return this.postCommentService.getAll(+postId);
  }

  // Get a Post Comment by id
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.postCommentService.getById(+id);
  }

  // Delete a Post Comment by id
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.postCommentService.delete(+id);
  }
}
