import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post, PostSchema } from './schemas/post.schema';
import { UserModule } from '../user/user.module'; 

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
    UserModule,  // Ensure UserModule is imported for resolving the userId reference
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
