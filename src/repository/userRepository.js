import User from '../schema/user.js';
import { crudRepository } from './crudRepository.js';

const userRepo = crudRepository(User);

export const getUserByEmail = async (email) => {
  return userRepo.findOne({ email });
};

export const getUserByName = async (name) => {
  return userRepo.findOne({ name });
};

export const getUserById = async (id) => {
  return userRepo.findById(id);
};

export const createUser = async (user) => {
  return userRepo.create(user);
};

export const getUsers = async () => {
  return userRepo.find();
};

export const deleteUser = async (id) => {
  return userRepo.deleteById(id);
};

export const updateUser = async (id, user) => {
  return userRepo.updateById(id, user);
};
