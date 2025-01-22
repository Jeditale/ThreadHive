import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode, InternalServerErrorException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommentLikeService } from './comment-like.service';
import { CreateCommentLikeDto } from './dto/create-comment-like.dto';
import { UpdateCommentLikeDto } from './dto/update-comment-like.dto';

@ApiTags('CommentLikes')
@Controller('comment-likes')
export class CommentLikeController {
  constructor(private readonly commentLikeService: CommentLikeService) {}

  @Post()
  async create(@Body() createCommentLikeDto: CreateCommentLikeDto) {
    try {
      return await this.commentLikeService.create(createCommentLikeDto);
    } catch (error) {
      throw new InternalServerErrorException('An error occurred during comment-like creation');
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.commentLikeService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('An error occurred while fetching comment-likes');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.commentLikeService.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(`An error occurred while fetching the comment-like with ID ${id}`);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCommentLikeDto: UpdateCommentLikeDto) {
    try {
      return await this.commentLikeService.update(id, updateCommentLikeDto);
    } catch (error) {
      throw new InternalServerErrorException('An error occurred during comment-like deletion');
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    try {
      await this.commentLikeService.delete(id);
    } catch (error) {
      throw new InternalServerErrorException('An error occurred during comment-like deletion');
    }
  }
}
