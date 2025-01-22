import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Create a new user
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      throw new InternalServerErrorException('An error occurred during user creation');
    }
  }

  // Get all users
  @Get()
  async findAll(): Promise<User[]> {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('An error occurred while fetching users');
    }
  }

  // Get user by ID
  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    try {
      const user = await this.userService.findById(id);
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(`An error occurred while fetching the user with ID ${id}`);
    }
  }

  // Update user by ID
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const updatedUser = await this.userService.update(id, updateUserDto);
      if (!updatedUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return updatedUser;
    } catch (error) {
      throw new InternalServerErrorException('An error occurred during user deletion');
    }
  }

  // Delete user by ID
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    try {
      const result = await this.userService.delete(id);
      if (!result) 
        throw new NotFoundException(`User with ID ${id} not found`);
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException('An error occurred during user deletion');
    }
  }
}
