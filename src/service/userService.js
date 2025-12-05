import { StatusCodes } from 'http-status-codes';
import userRepository from '../repository/userRepository';
import ClientError from '../utils/errors/clientError';
import ValidationError from '../utils/errors/validationError';
import bcrypt from 'bcrypt';
import { createJWT } from '../utils/common/authUtils';

export const signUpService = async (data) => {
  try {
    const newUser = await userRepository.create(data);
    return newUser;
  } catch (error) {
    console.log('User servide error: ', error);
    if (error.name === 'ValidationError') {
      throw new ValidationError(
        {
          error: error.errors
        },
        error.message
      );
    }
    if (error.name === 'MongoServerError' && error.code === 11000) {
      throw new ValidationError(
        {
          error: ['A user with same email or username already exists']
        },
        'A user with same email or username already exists'
      );
    }
  }
};

export const signInService = async (data) => {
  try {
    const user = await userRepository.getByAnyField(data.email);
    if (!user) {
      throw new ClientError({
        explanation: 'Invalid data sent from the user',
        message: 'No Registered user found with this email',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    const isMatch = bcrypt.compareSync(data.password, user.password);
    if (!isMatch) {
      throw new ClientError({
        explanation: 'Invalid data sent from the user',
        message: 'Invalid password, please try again',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    return {
      username: user.username,
      avatar: user.avatar,
      email: user.email,
      token: createJWT({ id: user._id, email: user.email })
    };
  } catch (error) {
    console.log('User service error: ', error);
    throw error;
  }
};
