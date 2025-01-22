import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  InternalServerErrorException,
} from '@nestjs/common';
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
      throw new InternalServerErrorException('An error occurred during notification update');
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
  @Delete('removeAll/:userId')
@HttpCode(204)
async removeAllByUserId(@Param('userId') userId: string): Promise<void> {
  try {
    await this.notificationService.removeAllByUserId(userId);
  } catch (error) {
    throw new InternalServerErrorException('An error occurred while deleting notifications for the user');
  }
}

}
