import { PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {


    @IsOptional()
    @IsString()
    title?: string;
  
    @IsOptional()
    @IsArray()
    tags?: string[];
  
    @IsOptional()
    @IsString()
    details?: string;
    
  
    @IsOptional()
    @IsString()
    image?: string;
}
