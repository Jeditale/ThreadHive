import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentCommentService } from './comment-comment.service';
import { CreateCommentCommentDto } from './dto/create-comment-comment.dto';
import { UpdateCommentCommentDto } from './dto/update-comment-comment.dto';

@Controller('comment-comment')
export class CommentCommentController {
  constructor(private readonly commentCommentService: CommentCommentService) {}

  @Post()
  create(@Body() createCommentCommentDto: CreateCommentCommentDto) {
    return this.commentCommentService.create(createCommentCommentDto);
  }

  @Get()
  findAll() {
    return this.commentCommentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentCommentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentCommentDto: UpdateCommentCommentDto) {
    return this.commentCommentService.update(+id, updateCommentCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentCommentService.remove(+id);
  }
}
