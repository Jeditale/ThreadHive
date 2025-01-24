import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { CommentLikeService } from './comment-like.service';
import { CreateCommentLikeDto } from './dto/create-comment-like.dto';
import { UpdateCommentLikeDto } from './dto/update-comment-like.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('comment-like')
export class CommentLikeController {
  constructor(private readonly commentLikeService: CommentLikeService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createCommentLikeDto: CreateCommentLikeDto) {
    return this.commentLikeService.create(createCommentLikeDto);
  }

  // @Get()
  // findAll() {
  //   return this.commentLikeService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.commentLikeService.findOne(+id);
  // }

  @Get('all/:commentId')
  async getAllLikesByCommentId(@Param('commentId') commentId: string) {
    const commentIdNumber = Number(commentId);  // Convert commentId to a number
    const commentLikes = await this.commentLikeService.getAllLikesByCommentId(commentIdNumber);
    return { commentLikes };  // Return all comment like records
  }

    // count of upvotes by commentId
    @Get('count/:commentId')
    async getUpvoteCountByCommentId(@Param('commentId') commentId: string) {
      const count = await this.commentLikeService.countUpvotesByCommentId(Number(commentId));
      return { upvoteCount: count };  // Return the count of upvotes
    }

  // @Put(':commentId/:userId')
  // async update(
  //   @Param('commentId') commentId: number, 
  //   @Param('userId') userId: number,
  //   @Body() updateCommentLikeDto: UpdateCommentLikeDto,
  // ) {
  //   return this.commentLikeService.update(commentId, userId, updateCommentLikeDto);
  // }

  @Delete(':id')
  @ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.commentLikeService.remove(+id);
  }
}
