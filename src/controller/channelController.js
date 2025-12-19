import { StatusCodes } from 'http-status-codes';
import { getChannelByIdService } from '../service/channelService.js';
import { successResponse } from '../utils/common/responseObject.js';
import {
  internalErrorResponse,
  customErrorResponse
} from '../utils/common/responseObject.js';

export const getChannelController = async (req, res) => {
  try {
    const response = await getChannelByIdService(req.params.channelId, req.id);
    res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Channel fetched is successfully'));
  } catch (error) {
    console.log(error);
    if (error.statusCode) {
      return res.status(error.statusCode).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
