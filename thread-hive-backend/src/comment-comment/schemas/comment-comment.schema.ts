import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class CommentComment extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true })
  commentId: string; // Foreing key to comment

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: string; // Foreing key to user

  @Prop({ type: String, required: true })
  comment: string;
}

export const CommentCommentSchema = SchemaFactory.createForClass(CommentComment);