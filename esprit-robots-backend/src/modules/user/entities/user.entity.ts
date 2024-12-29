import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum ROLE {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Schema()
export class User extends Document {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    required: true,
  })
  phone: string;

  @Prop({
    default: ROLE.USER,
  })
  role: ROLE;

  @Prop({
    required: false,
  })
  otpCode?: string;

  @Prop()
  codeExpires?: Date;

  @Prop({
    default: false,
  })
  isVerified: boolean;

  @Prop({
    default: false,
  })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
