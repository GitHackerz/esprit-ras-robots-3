import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum ChallengeType {
  JUNIOR = 'Junior',
  AUTONOMOUS = 'Autonomous',
  ALL_TERRAIN = 'All Terrain',
  FIGHTER = 'Fighter',
}

export class Member {
  @Prop()
  email?: string;

  @Prop()
  name?: string;

  @Prop()
  phone?: string;
}

@Schema({ timestamps: true })
export class Team extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
    enum: ChallengeType,
  })
  challenge: ChallengeType;

  @Prop({
    required: true,
  })
  establishment: string;

  @Prop({
    required: true,
  })
  club: string;

  @Prop([Member])
  members: Member[];

  @Prop({
    default: 0,
  })
  score: number;

  @Prop({
    default: false,
  })
  isPaid: boolean;

  @Prop({
    default: false,
  })
  isPresent: boolean;

  @Prop({
    default: false,
  })
  hasCoffeeBreak: boolean;

  @Prop()
  paymentDate?: Date;
}

export const TeamSchema = SchemaFactory.createForClass(Team);
