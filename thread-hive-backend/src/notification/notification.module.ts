
import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import {Notification, NotificationSchema } from './schemas/notification.schema';

@Module({
   imports: [
      MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }]),
      UserModule,  
    ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
