import User from '../schema/user.js';
import { crudRepository } from './crudRepository.js';

const userRepo = crudRepository(User);

export const getUserByEmail = async (email) => {
  return userRepo.getByAnyField({ email });
};

export const getUserByName = async (name) => {
  return userRepo.getByAnyField({ name });
};

export const getUserById = async (id) => {
  return userRepo.getById(id);
};

export const createUser = async (user) => {
  return userRepo.create(user);
};

export const getUsers = async () => {
  return userRepo.getAll();
};

export const deleteUser = async (id) => {
  return userRepo.deleteById(id);
};

export const updateUser = async (id, user) => {
  return userRepo.updateById(id, user);
};
