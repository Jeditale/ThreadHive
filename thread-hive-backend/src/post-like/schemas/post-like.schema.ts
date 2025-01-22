import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Post } from 'src/post/schemas/post.schema';
import { User } from 'src/user/schemas/user.schema';

export type PostLikeDocument = PostLike & Document;

@Schema({ timestamps: true })
export class PostLike {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Post', required: true })
    postId: Post; // Foreign key to Post
  
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    userId: User; // Foreign key to User
  
  @Prop({ default: false })
  upVote: boolean;

  @Prop({ default: false })
  downVote: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const PostLikeSchema = SchemaFactory.createForClass(PostLike);
