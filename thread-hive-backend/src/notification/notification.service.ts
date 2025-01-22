import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationDocument } from './schemas/notification.schema';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>,
  ) {}

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    try {
      const notification = new this.notificationModel(createNotificationDto);
      return await notification.save();
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

  async removeAdminNotification(id: string): Promise<void> {
    try {
      const result = await this.notificationModel
        .findOneAndDelete({ _id: id, userId: '678dec8b08947e2503f4b1e0' })
        .exec();
      if (!result) throw new NotFoundException('Admin notification not found');
    } catch (error) {
      throw new InternalServerErrorException('Error deleting admin notification');
    }
  }

  async removeAllAdminNotifications(): Promise<void> {
    try {
      const result = await this.notificationModel
        .deleteMany({ userId: '678dec8b08947e2503f4b1e0' })
        .exec();
      if (result.deletedCount === 0)
        throw new NotFoundException('No admin notifications found to delete');
    } catch (error) {
      throw new InternalServerErrorException('Error deleting all admin notification');
    }
  }
}
