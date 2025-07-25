import mongoose from 'mongoose';
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email already exist'],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please fill the valid email'
      ]
    },
    userName: {
      type: String,
      required: [true, 'User Name is required'],
      unique: [true, 'User Name already exist'],
      match: [
        /^[a-zA-Z0-9]+/,
        'User name must contain only letters and numbers'
      ]
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    avatar: {
      type: String
    }
  },
  { timestamps: true }
);

userSchema.pre('save', function saveUser(next) {
  const user = this;
  const SALT = bcrypt.genSaltSync(9)
  const hashPassword = bcrypt.hashSync(user.password, SALT)
  user.password = hashPassword
  user.avatar = `https://robohash.org/${user.userName}`;
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
