import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    try {
      return await this.postService.create(createPostDto);
    } catch (error) {
      throw new InternalServerErrorException('An error occurred during Post creation');
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.postService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('An error occurred while fetching Posts');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const post = await this.postService.findById(id)
      if(!post)
        throw new NotFoundException(`Post with ID ${id} not found`);
      return  post
    } catch (error) {
      throw new InternalServerErrorException(`An error occurred while fetching the post with ID ${id}`);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    try {
      const updatePost =  await this.postService.update(id, updatePostDto);
      if(!updatePost)
        throw new NotFoundException(`post with ID ${id} not found`);
      return updatePost
    } catch (error) {
      throw new InternalServerErrorException(`An error occurred while updating the post with ID ${id}`);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    try {
      const result =  await this.postService.delete(id); 
      if (!result) 
        throw new NotFoundException(`User with ID ${id} not found`);
      return { message: 'Post deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException('An error occurred during post deletion');
    }
  }
}
