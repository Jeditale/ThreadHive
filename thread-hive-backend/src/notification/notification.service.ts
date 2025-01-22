import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from './schemas/notification.schema';
import { User, UserDocument } from '../user/schemas/user.schema'; // Assuming there's a User model
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>, // Inject User model
  ) {}

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification[]> {
    try {
      const notifications: Notification[] = [];

      // Create a notification for the provided userId
      const userNotification = new this.notificationModel(createNotificationDto);
      const savedUserNotification = await userNotification.save();
      notifications.push(savedUserNotification);

      // Find all users with isAdmin = true
      const adminUsers = await this.userModel.find({ isAdmin: true }).exec();

      // Create notifications for admin users
      for (const admin of adminUsers) {
        const adminNotification = new this.notificationModel({
          ...createNotificationDto,
          userId: admin._id, // Set the notification's userId to the admin's ID
        });
        const savedAdminNotification = await adminNotification.save();
        notifications.push(savedAdminNotification);
      }

      return notifications; // Return all created notifications
    } catch (error) {
      throw new InternalServerErrorException('Error creating notification');
    }
  }

  async findAll(): Promise<Notification[]> {
    try {
      return await this.notificationModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching notifications');
    }
  }

  async findOne(id: string): Promise<Notification> {
    try {
      const notification = await this.notificationModel.findById(id).exec();
      if (!notification) throw new NotFoundException('Notification not found');
      return notification;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching notification by id');
    }
  }

  async update(
    id: string,
    updateNotificationDto: UpdateNotificationDto,
  ): Promise<Notification> {
    try {
      const updatedNotification = await this.notificationModel
        .findByIdAndUpdate(id, updateNotificationDto, { new: true })
        .exec();
      if (!updatedNotification) throw new NotFoundException('Notification not found');
      return updatedNotification;
    } catch (error) {
      throw new InternalServerErrorException('Error updating notification');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const result = await this.notificationModel.findByIdAndDelete(id).exec();
      if (!result) throw new NotFoundException('Notification not found');
    } catch (error) {
      throw new InternalServerErrorException('Error deleting notification');
    }
  }
  async removeAllByUserId(userId: string): Promise<void> {
    try {
      const result = await this.notificationModel.deleteMany({ userId }).exec();
      if (result.deletedCount === 0) {
        throw new NotFoundException('No notifications found for the user');
      }
    } catch (error) {
      throw new InternalServerErrorException('Error deleting notifications for the user');
    }
  }
  
}
