import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly SALT_ROUNDS = 10;
  constructor(private readonly prisma: PrismaService) {}

  // // Create a new user
  // async createUser(createUserDto: CreateUserDto) {
  //   try {
  //     return await this.prisma.user.create({
  //       data: createUserDto,
  //     });
  //   } catch (error) {
  //     throw new InternalServerErrorException('Failed to create user', error);
  //   }
  // }

  // Get all users
  async getAllUsers() {
    try {
      return await this.prisma.user.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch users', error);
    }
  }

  // Get a user by ID
  async getUserById(id: number) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Re-throw the NotFoundException if it occurs
      }
      throw new InternalServerErrorException('Failed to fetch user', error);
    }
  }

  // Update a user by ID
  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
  
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
  
      // Check if password is included in the update DTO
      if (updateUserDto.password) {
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, this.SALT_ROUNDS);
      }
  
      return await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (error) {
      console.error("Error during post update:", error);  // Log the full error
      if (error instanceof NotFoundException) {
        throw error; // Re-throw the NotFoundException if it occurs
      }
      throw new InternalServerErrorException('Failed to update post', error);
    }
  }

  // Delete a user by ID
  async deleteUser(id: number) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Re-throw the NotFoundException if it occurs
      }
      throw new InternalServerErrorException('Failed to delete user', error);
    }
  }
}
