import { PartialType } from '@nestjs/swagger';
import { CreateNotificationDto } from './create-notification.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {
      @IsOptional()
      @IsString()
      userId?: string;
    
      @IsOptional()
      @IsString()
      type?: string;
    
      @IsOptional()
      @IsString()
      message?: string;
}
