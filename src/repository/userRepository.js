import User from '../schema/user.js';
import { crudRepository } from './crudRepository.js';

const userRepository = {
  ...crudRepository(User)
};

export default userRepository;
