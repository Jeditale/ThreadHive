import { Module } from '@nestjs/common';
import { CommentLikeService } from './comment-like.service';
import { CommentLikeController } from './comment-like.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {CommentLike, CommentLikeSchema } from './schemas/comment-like.schema';


@Module({
  imports:[
    MongooseModule.forFeature([{
      name:CommentLike.name , schema:CommentLikeSchema
    }])
  ],
  controllers: [CommentLikeController],
  providers: [CommentLikeService],
})
export class CommentLikeModule {}
