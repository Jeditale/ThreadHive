import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true })
export class Notification {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    userId: User; // Foreign key to User

  @Prop({ required: true })
  type: string; // Type of notification (e.g., "info", "warning", etc.)

  @Prop({ required: true })
  message: string; // Notification message

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
