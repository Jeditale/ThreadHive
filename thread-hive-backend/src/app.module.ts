import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CommentCommentModule } from './comment-comment/comment-comment.module';
import { CommentLikeModule } from './comment-like/comment-like.module';
import { NotificationModule } from './notification/notification.module';
import { PostCommentModule } from './post-comment/post-comment.module';
import { PostLikeModule } from './post-like/post-like.module';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, UserModule, PostModule, PostCommentModule, CommentCommentModule, PostLikeModule, CommentLikeModule, NotificationModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
