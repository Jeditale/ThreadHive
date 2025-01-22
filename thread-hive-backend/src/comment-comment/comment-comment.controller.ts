import { Controller,  Get,  Post,  Body,  Param,  Put,  Delete,  InternalServerErrorException 
} from '@nestjs/common';
import { CommentCommentService } from './comment-comment.service';
import { CreateCommentCommentDto } from './dto/create-comment-comment.dto';
import { UpdateCommentCommentDto } from './dto/update-comment-comment.dto';
import { CommentComment } from './schemas/comment-comment.schema';

@Controller('comment-comments')
export class CommentCommentController {
  constructor(private readonly commentCommentService: CommentCommentService) {}

  @Post()
  async create(@Body() createCommentCommentDto: CreateCommentCommentDto): Promise<CommentComment> {
    try {
      return await this.commentCommentService.create(createCommentCommentDto);
    } catch (error) {
      console.error('Error in create:', error);
      throw new InternalServerErrorException('Failed to create CommentComment');
    }
  }

  @Get()
  async findAll(): Promise<CommentComment[]> {
    try {
      return await this.commentCommentService.findAll();
    } catch (error) {
      console.error('Error in findAll:', error);
      throw new InternalServerErrorException('Failed to retrieve CommentComments');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CommentComment> {
    try {
      return await this.commentCommentService.findOne(id);
    } catch (error) {
      console.error(`Error in findOne with ID ${id}:`, error);
      throw new InternalServerErrorException('Failed to retrieve CommentComment');
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCommentCommentDto: UpdateCommentCommentDto,
  ): Promise<CommentComment> {
    try {
      return await this.commentCommentService.update(id, updateCommentCommentDto);
    } catch (error) {
      console.error(`Error in update with ID ${id}:`, error);
      throw new InternalServerErrorException('Failed to update CommentComment');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    try {
      return await this.commentCommentService.remove(id);
    } catch (error) {
      console.error(`Error in remove with ID ${id}:`, error);
      throw new InternalServerErrorException('Failed to delete CommentComment');
    }
  }
}
