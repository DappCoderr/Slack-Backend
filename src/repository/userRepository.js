import User from '../schema/user';
import crudRepository from './crudRepository';

const userRepository = {
  ...crudRepository(User),

  getByEmail: async function (email) {
    const user = await User.findOne({ email });
    return user;
  },

  getByName: async function (name) {
    const user = await User.findOne({ name }).select('-password'); //exclude password
    return user;
  }
};

export default userRepository;
