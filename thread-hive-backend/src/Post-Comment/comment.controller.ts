import { Controller, Get, Post, Body, Param, Delete, HttpCode, InternalServerErrorException, NotFoundException, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    try {
      return await this.commentService.create(createCommentDto);
    } catch (error) {
      throw new InternalServerErrorException(`Error creating comment`);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.commentService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('An error occurred while fetching comments');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const comment = await this.commentService.findOne(id);
      if(!comment)
        throw new NotFoundException(`Comment with ID ${id} not found`);
      return comment
    } catch (error) {
      throw new InternalServerErrorException(`An error occurred while fetching the comment with ID ${id}`);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    try {
      return await this.commentService.update(id, updateCommentDto);
    } catch (error) {
      throw new InternalServerErrorException(`An error occurred while updating the comment with ID ${id}`);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    try {
      await this.commentService.delete(id);
    } catch (error) {
      throw new InternalServerErrorException('An error occurred during comment deletion');
    }
  }
}
