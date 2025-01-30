// src/users/users.controller.ts

import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
//already had register
  // @Post()
  // createUser(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.createUser(createUserDto);
  // }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(Number(id));
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(Number(id), updateUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(Number(id));
  }
}
