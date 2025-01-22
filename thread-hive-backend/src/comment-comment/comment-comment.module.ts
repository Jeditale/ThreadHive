import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentCommentService } from './comment-comment.service';
import { CommentCommentController } from './comment-comment.controller';
import { CommentComment, CommentCommentSchema } from './schemas/comment-comment.schema';
import { CommentModule } from 'src/comment/comment.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CommentComment.name, schema: CommentCommentSchema },
    ]),
    CommentModule,
    UserModule,  
  ],
  controllers: [CommentCommentController],
  providers: [CommentCommentService],
})
export class CommentCommentModule {}