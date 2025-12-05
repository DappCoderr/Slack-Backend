import { StatusCodes } from 'http-status-codes';
import { signInService, signUpService } from '../service/userService';
import {customErrorResponse, internalServerError, successResponse} from '../utils/common/responseObject';

export const signUp = async (req, res) => {
  try {
    const user = await signUpService(req.body);
    return res
      .status(StatusCodes.CREATED)
      .json(successResponse(user, 'User Created Successfully'));
  } catch (error) {
    console.lor('User controller error: ', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerError(error));
  }
};

export const signIn = async(req, res) => {
  try {
    const response = await signInService(req.body)
    return res.status(StatusCodes.CREATED).json(successResponse(response, "User signed successfully"))
    
  } catch (error) {
    console.log("SignIn error: ", error)
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(internalServerError(error));
  }
}
