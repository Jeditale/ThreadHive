import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommentLikeDocument = CommentLike & Document;

@Schema({ timestamps: true })
export class CommentLike {
  @Prop({ required: true })
  commentId: string; // Foreign Key (to Comment)

  @Prop({ required: true })
  userId: string; // Foreign Key (to User)

  @Prop({ default: false })
  upVote: boolean;

  @Prop({ default: false })
  downVote: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CommentLikeSchema = SchemaFactory.createForClass(CommentLike);
