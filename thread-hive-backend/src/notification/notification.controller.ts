import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode, InternalServerErrorException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    try {
      return await this.notificationService.create(createNotificationDto);
    } catch (error) {
      throw new InternalServerErrorException('An error occurred during notification creation');
    }
  }

  @Post('admin')
  async createAdminNotification(@Body() createNotificationDto: CreateNotificationDto) {
    try {
      // Set userId to the admin's ID
      createNotificationDto.userId = '678dec8b08947e2503f4b1e0';
      return await this.notificationService.create(createNotificationDto);
    } catch (error) {
      throw new InternalServerErrorException('An error occurred during notification creation');
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.notificationService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('An error occurred while fetching notifications');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.notificationService.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(`An error occurred while fetching the notification with ID ${id}`);
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
    try {
      return await this.notificationService.update(id, updateNotificationDto);
    } catch (error) {
      throw new InternalServerErrorException('An error occurred during notification deletion');
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    try {
      await this.notificationService.remove(id);
    } catch (error) {
      throw new InternalServerErrorException('An error occurred during notification deletion');
    }
  }

  @Delete('admin/:id')
  @HttpCode(204)
  async removeAdminNotification(@Param('id') id: string) {
    try {
      await this.notificationService.removeAdminNotification(id);
    } catch (error) {
      throw new InternalServerErrorException('An error occurred during admin notification deletion');
    }
  }

  @Delete('admin/all')
  @HttpCode(204)
  async removeAllAdminNotifications() {
    try {
      await this.notificationService.removeAllAdminNotifications();
    } catch (error) {
      throw new InternalServerErrorException('An error occurred during all admin aotification deletion');
    }
  }
}
