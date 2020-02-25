import {model, Schema} from 'mongoose';
import { autoIncrement } from 'mongoose-plugin-autoinc';

export interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  isAuthor: boolean;
  img: {imageURL: string, data: Buffer, contentType: String};
  tokens: [];
}

// User Schema
export const UserSchema = new Schema<UserModel>({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  isAuthor: {
    type: Boolean
  },
  img: {
    imageURL: String,
    data: Buffer,
    contentType: String
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});
UserSchema.plugin(autoIncrement, {model: 'User', startAt: 1});

export const User = model('User', UserSchema);
