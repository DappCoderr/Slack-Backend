import User from '../schema/user';
import crudRepository from './crudRepository';

export const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

export const getUserByName = async (name) => {
  const user = await User.findOne({ userName: name });
  return user;
};

function userRepository(){
    crudRepository.call(this, User)
}

export default new userRepository()
