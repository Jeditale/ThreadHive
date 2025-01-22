import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode, InternalServerErrorException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostLikeService } from './post-like.service';
import { CreatePostLikeDto } from './dto/create-post-like.dto';
import { UpdatePostLikeDto } from './dto/update-post-like.dto';

@ApiTags('PostLikes')
@Controller('post-likes')
export class PostLikeController {
  constructor(private readonly postLikeService: PostLikeService) {}

  @Post()
  async create(@Body() createPostLikeDto: CreatePostLikeDto) {
    try {
      return await this.postLikeService.create(createPostLikeDto);
    } catch (error) {
      throw new InternalServerErrorException('An error occurred during Post-like creation');
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.postLikeService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('An error occurred while fetching Post-like');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.postLikeService.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(`An error occurred while fetching the Post-like with ID ${id}`);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePostLikeDto: UpdatePostLikeDto) {
    try {
      return await this.postLikeService.update(id, updatePostLikeDto);
    } catch (error) {
      throw new InternalServerErrorException(`An error occurred while updating the Post-like with ID ${id}`);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    try {
      await this.postLikeService.remove(id);
    } catch (error) {
      throw new InternalServerErrorException('An error occurred during user deletion');
    }
  }
}
