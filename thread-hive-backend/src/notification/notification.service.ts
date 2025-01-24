import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new notification
  async create(createNotificationDto: CreateNotificationDto) {
    const { userId, ...data } = createNotificationDto;

    try {
      // Ensure the user exists
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      return await this.prisma.notification.create({
        data: {
          userId,
          ...data,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to create notification', error);
    }
  }

  // Get notifications by userId
  async getNotificationsByUserId(userId: number) {
    try {
      const notifications = await this.prisma.notification.findMany({
        where: {
          userId: userId,
        },
      });

      if (!notifications || notifications.length === 0) {
        throw new NotFoundException(`No notifications found for user with ID ${userId}`);
      }

      return notifications;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve notifications', error);
    }
  }

  // Get all notifications, optionally filtered by userId
  async findAll(userId?: number) {
    try {
      if (userId) {
        const notifications = await this.prisma.notification.findMany({
          where: { userId },
        });

        if (!notifications || notifications.length === 0) {
          throw new NotFoundException(`No notifications found for user with ID ${userId}`);
        }

        return notifications;
      }

      return await this.prisma.notification.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve all notifications', error);
    }
  }

  // Get a single notification by its ID
  async findOne(id: number) {
    try {
      const notification = await this.prisma.notification.findUnique({
        where: { id },
      });

      if (!notification) {
        throw new NotFoundException(`Notification with ID ${id} not found`);
      }

      return notification;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve the notification', error);
    }
  }

  // Remove a notification by its ID
  async remove(id: number) {
    try {
      const existingNotification = await this.prisma.notification.findUnique({
        where: { id },
      });

      if (!existingNotification) {
        throw new NotFoundException(`Notification with ID ${id} not found`);
      }

      return await this.prisma.notification.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to remove the notification', error);
    }
  }

  // Remove all notifications for a specific user
  async removeAllByUserId(userId: number) {
    try {
      // Ensure the user exists
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      return await this.prisma.notification.deleteMany({
        where: { userId },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Failed to remove notifications for user', error);
      }
    }
  }
}
