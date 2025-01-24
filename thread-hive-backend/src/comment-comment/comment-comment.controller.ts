// src/comment-comment/comment-comment.controller.ts
import { Controller, Post, Body, Put, Param, Get, Delete, UseGuards } from '@nestjs/common';
import { CommentCommentService } from './comment-comment.service';
import { CreateCommentCommentDto } from './dto/create-comment-comment.dto';
import { UpdateCommentCommentDto } from './dto/update-comment-comment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('comment-comments')
@Controller('comment-comments')
export class CommentCommentController {
  constructor(private readonly commentCommentService: CommentCommentService) {}

  // Create a new CommentComment (reply)
  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createCommentCommentDto: CreateCommentCommentDto) {
    return this.commentCommentService.create(createCommentCommentDto);
  }

  // Update a CommentComment by id
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommentCommentDto: UpdateCommentCommentDto,
  ) {
    return this.commentCommentService.update(+id, updateCommentCommentDto);
  }

  // Get all CommentComments for a specific comment
  @Get('all/:commentId')
  getAll(@Param('commentId') commentId: string) {
    return this.commentCommentService.getAll(+commentId);
  }

  // Get a CommentComment by id
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.commentCommentService.getById(+id);
  }

  // Delete a CommentComment by id
  @Delete(':id')
  @ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
  delete(@Param('id') id: string) {
    return this.commentCommentService.delete(+id);
  }
}
