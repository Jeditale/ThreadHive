import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { PostLikeModule } from './post-like/post-like.module';
import { CommentLikeModule } from './comment-like/comment-like.module';
import { NotificationModule } from './notification/notification.module';
import { CommentCommentModule } from './comment-comment/comment-comment.module';


@Module({
  imports: [
    ConfigModule.forRoot(), // Initialize ConfigModule
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Make ConfigModule available
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        user: configService.get<string>('MONGODB_USER'),
        pass: configService.get<string>('MONGODB_PASS'),
        dbName: configService.get<string>('MONGODB_DATABASE'),
      }),
      inject: [ConfigService], // Inject ConfigService to use it in useFactory
    }),
  UserModule,
  PostModule,
  CommentModule,
  PostLikeModule,
  CommentLikeModule,
  NotificationModule,
  CommentCommentModule
]
})
export class AppModule {}
