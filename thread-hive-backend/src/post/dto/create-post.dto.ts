import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ description: 'The ID of the user creating the post', example:'UserID' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'The title of the post' ,example:'What a wonderful world'})
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The tags of the post', type: [String], example:'MyfirstPost'})
  @IsArray()
  tags: string[];

  @ApiProperty({ description: 'The details/content of the post', example:'I walk outside with my dogs!'})
  @IsString()
  @IsNotEmpty()
  details: string;

  @ApiProperty({ description: 'The image associated with the post', example:'Base64 Image format'})
  @IsString()
  @IsNotEmpty()
  image: string;
}
