import { Module } from '@nestjs/common';
import { PostLikeService } from './post-like.service';
import { PostLikeController } from './post-like.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostLike, PostLikeSchema } from './schemas/post-like.schema';
import { PostModule } from 'src/post/post.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[
  MongooseModule.forFeature([{name: PostLike.name,schema:PostLikeSchema}]),
        PostModule,  
        UserModule, 
  ],
  controllers: [PostLikeController],
  providers: [PostLikeService],
})
export class PostLikeModule {}
