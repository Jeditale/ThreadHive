import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty({
    description: 'The user ID associated with the notification',
    example: 1,
  })
  userId: number;

  @ApiProperty({
    description: 'The type of notification (e.g., "info", "warning", "error")',
    example: 'info',
  })
  type: string;

  @ApiProperty({
    description: 'The content or message of the notification',
    example: 'Your post has been liked!',
  })
  message: string;
}
