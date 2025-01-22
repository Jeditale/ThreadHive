import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty({ description: 'User ID who will receive the notification' })
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Type of notification (e.g., info, warning)' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'Notification message' })
  @IsString()
  message: string;
}
