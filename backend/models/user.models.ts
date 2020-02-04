import {model, Schema} from 'mongoose';
import bcrypt = require('bcryptjs');
import jwt = require('jsonwebtoken');
import { databaseSecret } from '../environment';

interface User {
  id: number;
  username: string;
  password: string;
  tokens: [];
}

// User Schema
export const UserSchema = new Schema({
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
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    // @ts-ignore
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

UserSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({_id: user._id}, databaseSecret);
  user.tokens = user.tokens.concat({token});
  await user.save();
  return token;
};

UserSchema.statics.findByCredentials = async (username: string, password: string) => {
  // Search for a user by username and password.
  const user = await User.findOne({ username} );
  if (!user) {
    throw new Error('Invalid login credentials');
  }
  // @ts-ignore
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error('Invalid login credentials');
  }
  return user;
};

export const User = model('User', UserSchema);
