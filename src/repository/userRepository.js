import User from '../schema/user.js';
import { crudRepository } from './crudRepository.js';

const userRepository = {
  ...crudRepository(User),

  signUpUser: async function(data){
    const newUser = new User(data)
    await newUser.save()
    return newUser
  },

  getByEmail: async function (email) {
    const user = await User.findOne({ email });
    return user;
  },

  getByUserName: async function (userName) {
    const user = await User.findOne({ userName }).select('-password');
    return user
  },

  getByToken: async function (token) {
    const user = User.findOne({verificationToken: token})
    return user
  }
};

export default userRepository;
