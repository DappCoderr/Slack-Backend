import { StatusCodes } from 'http-status-codes';

import {
  createWorkspaceService,
  getAllWorkspaceWhereUserIsMemberOfService
} from '../service/workspaceService.js';
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

export const getWorkspacesUserIsMemberOfController = async (req, res) => {
  try {
    const response = await getAllWorkspaceWhereUserIsMemberOfService(req.id);
    return res
      .status(StatusCodes.OK)
      .json(successResponse(response, 'Workspace fetched successfully'));
  } catch (error) {
    console.log(
      'Workspace controller error while fetching all workspace: ',
      error
    );
    if (error.StatusCodes) {
      return res.status(error.StatusCodes).json(customErrorResponse(error));
    }

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(internalErrorResponse(error));
  }
};
