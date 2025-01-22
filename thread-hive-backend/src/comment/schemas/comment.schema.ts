import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Post } from 'src/post/schemas/post.schema';
import { User } from 'src/user/schemas/user.schema';
 // Importing User schema

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Post', required: true })
  postId: Post; // Foreign key to Post

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: User; // Foreign key to User

  @Prop({ required: true })
  comment: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
