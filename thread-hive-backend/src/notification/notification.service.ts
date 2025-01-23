import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const { userId, ...data } = createNotificationDto;

    // Ensure the user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);

    return this.prisma.notification.create({
      data: {
        userId,
        ...data,
      },
    });
  }

    // Get notifications by userId
    async getNotificationsByUserId(userId: number) {
      return this.prisma.notification.findMany({
        where: {
          userId: userId,
        },
      });
    }

  async findAll(userId?: number) {
    if (userId) {
      return this.prisma.notification.findMany({
        where: { userId },
      });
    }
    return this.prisma.notification.findMany();
  }

  async findOne(id: number) {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) throw new NotFoundException(`Notification with ID ${id} not found`);
    return notification;
  }

  async remove(id: number) {
    const existingNotification = await this.prisma.notification.findUnique({
      where: { id },
    });
    if (!existingNotification) throw new NotFoundException(`Notification with ID ${id} not found`);

    return this.prisma.notification.delete({
      where: { id },
    });
  }

  async removeAllByUserId(userId: number) {
    // Ensure the user exists
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);

    return this.prisma.notification.deleteMany({
      where: { userId },
    });
  }
}
