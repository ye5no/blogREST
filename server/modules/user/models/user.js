import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import uuid from 'uuid/v4';
import uniqueValidator from 'mongoose-unique-validator';

mongoose.plugin(uniqueValidator);

const UserSchema = new Schema({
  email: {
    type: String,
    unique: 'User with email "{VALUE}" already exist',
    lowercase: true,
    required: 'Email is required',
    trim: true,
  },
  hash: {
    type: String,
    unique: 'Hash mast be unique',
  },
  password: {
    type: String,
    required: 'Password is required',
    trim: true,
  },
  admin: Boolean,
}, {
  timestamps: true,
});

UserSchema.statics.createFields = ['email', 'password', 'admin'];

UserSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }
  if (!this.hash) this.hash = uuid();
  next();
});

UserSchema.methods.comparePasswords = function(password) {
    return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('user', UserSchema);
