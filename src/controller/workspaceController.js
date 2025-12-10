import { StatusCodes } from 'http-status-codes';

import { createWorkspaceService } from '../service/workspaceService.js';
import {
  customErrorResponse,
  internalErrorResponse,
  successResponse
} from '../utils/common/responseObject.js';

export const createWorkspace = async (req, res) => {
  try {
    const response = await createWorkspaceService({
      ...req.body,
      owner: req.id
    });

    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspace successfully created'));
  } catch (error) {
    console.log('Workspace controller error: ', error);
    if (error.StatusCodes) {
      return res.status(error.StatusCodes).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
