// user.schema.ts
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IsNotEmpty, IsString, IsAlphanumeric, MinLength, MaxLength } from 'class-validator';
 
import * as bcrypt from 'bcrypt';

@Schema()
export class User extends Document {
  @Prop()
  id: string;

  @Prop({ type: String, required: true, unique: true })
 
  username: string;

  @Prop({ type: String, required: true })
  password: string;
  
}
export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  });