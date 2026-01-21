/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserRole {
  ADMIN = 'Admin',
  EMPLOYEE = 'Employee',
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: UserRole, default: UserRole.EMPLOYEE })
  role: UserRole;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  designation: string; // Travel Consultant, Manager

  @Prop()
  joiningDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
