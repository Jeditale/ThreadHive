// src/users/users.module.ts

import { Module } from '@nestjs/common';
import { UserController } from './user.controller';  // Make sure this is correctly imported
import { UserService } from './user.service';      // Make sure this is correctly imported
import { PrismaService } from '../prisma/prisma.service'; // Adjust the path if necessary

@Module({
  controllers: [UserController],     // Add the controller here
  providers: [UserService, PrismaService],  // Add the service and PrismaService here
})
export class UserModule {}
