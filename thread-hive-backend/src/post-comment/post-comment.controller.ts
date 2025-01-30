// src/post-comment/post-comment.controller.ts
import { Controller, Post, Body, Put, Param, Get, Delete, UseGuards } from '@nestjs/common';
import { PostCommentService } from './post-comment.service';
import { CreatePostCommentDto } from './dto/create-post-comment.dto';
import { UpdatePostCommentDto } from './dto/update-post-comment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('post-comments')
@Controller('post-comments')
export class PostCommentController {
  constructor(private readonly postCommentService: PostCommentService) {}

  // Create a new Post Comment
  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createPostCommentDto: CreatePostCommentDto) {
    return this.postCommentService.create(createPostCommentDto);
  }

  // Update a Post Comment by id
  @Put(':id')
  @ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body() updatePostCommentDto: UpdatePostCommentDto,
  ) {
    return this.postCommentService.update(+id, updatePostCommentDto);
  }

  // // Get all Post Comments for a specific post
  // @Get('post/:postId')
  // getAll(@Param('postId') postId: string) {
  //   return this.postCommentService.getAll(+postId);
  // }

  // Get a Post Comment by id
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.postCommentService.getById(+id);
  }
  @Get('all/:postId')
  async getAllCommentsByPostId(@Param('postId',) postId: number) {
    const postComments = await this.postCommentService.getAllCommentsByPostId(+postId);
    return { postComments };  // Return all post comment records
  }
    // Get count of comments for a specific post
    @Get('count/:postId')
    async countComments(@Param('postId') postId: number) {
      const count = await this.postCommentService.countCommentsByPostId(postId);
      return { count };  // Return the count of comments for the specified post
    }
  

  // Delete a Post Comment by id
  @Delete(':id')
  @ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
  delete(@Param('id') id: string) {
    return this.postCommentService.delete(+id);
  }
}
