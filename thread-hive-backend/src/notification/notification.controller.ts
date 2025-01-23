import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  // Get notifications by userId
  @Get('by-user/:userId')
  getNotificationsByUserId(@Param('userId') userId: number) {
    return this.notificationService.getNotificationsByUserId(userId);
  }

  @Get()
  findAll() {
    return this.notificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.notificationService.findOne(+id);
  }



  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.notificationService.remove(+id);
  }

  @Delete('user/:userId')
  removeAllByUserId(@Param('userId') userId: number) {
    return this.notificationService.removeAllByUserId(+userId);
  }
}
